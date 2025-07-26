<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

    <!-- ส่วนแสดงรายชื่อสมาชิก -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Members</h2>
      <div v-if="!usersEndpointAvailable" class="text-gray-500">
        User list feature is not yet implemented
      </div>
      <div v-else-if="users.length === 0" class="text-gray-500">No members found</div>
      <table v-else class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">ID</th>
            <th class="border p-2">Username</th>
            <th class="border p-2">Email</th>
            <th class="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="border p-2">{{ user.id }}</td>
            <td class="border p-2">{{ user.username }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ส่วนจัดการคำศัพท์ -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Chinese Vocabulary</h2>
      <div class="mb-4 flex items-center gap-4">
        <input
          v-model="searchQuery"
          @input="searchWords"
          placeholder="Search by Chinese, Pinyin, or Thai meaning..."
          class="w-full max-w-md p-2 border rounded"
        />
        <button
          @click="openAddModal"
          class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add New Word
        </button>
      </div>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Chinese</th>
            <th class="border p-2">Pinyin</th>
            <th class="border p-2">Thai Pronunciation</th>
            <th class="border p-2">Thai Meaning</th>
            <th class="border p-2">Part of Speech</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="word in words" :key="word._id">
            <td class="border p-2">{{ word.chinese }}</td>
            <td class="border p-2">{{ word.pinyin }}</td>
            <td class="border p-2">{{ word.thai_pronunciation }}</td>
            <td class="border p-2">{{ word.thai_meaning }}</td>
            <td class="border p-2">{{ word.part_of_speech }}</td>
            <td class="border p-2">
              <button
                @click="openEditModal(word)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="deleteWord(word._id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-4 flex justify-center gap-2">
        <button
          @click="fetchWords(page - 1)"
          :disabled="page === 1"
          class="bg-gray-300 p-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span class="p-2">Page {{ page }} of {{ totalPages }}</span>
        <button
          @click="fetchWords(page + 1)"
          :disabled="page === totalPages"
          class="bg-gray-300 p-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal สำหรับเพิ่ม/แก้ไขคำ -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">
          {{ isEditing ? 'Edit Word' : 'Add New Word' }}
        </h3>
        <form @submit.prevent="saveWord">
          <div class="mb-4">
            <label class="block text-gray-700">Chinese</label>
            <input
              v-model="form.chinese"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Pinyin</label>
            <input
              v-model="form.pinyin"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Thai Pronunciation</label>
            <input
              v-model="form.thai_pronunciation"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Thai Meaning</label>
            <input
              v-model="form.thai_meaning"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Part of Speech</label>
            <input
              v-model="form.part_of_speech"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Example Usage (comma-separated)</label>
            <textarea
              v-model="form.example_usage"
              class="w-full p-2 border rounded"
              placeholder="e.g. Example 1, Example 2"
            ></textarea>
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    <p v-if="success" class="text-green-500 mt-4">{{ success }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store';
import axios from 'axios';

export default {
  setup() {
    const authStore = useAuthStore();
    const users = ref([]);
    const words = ref([]);
    const page = ref(1);
    const limit = ref(20);
    const total = ref(0);
    const searchQuery = ref('');
    const showModal = ref(false);
    const isEditing = ref(false);
    const error = ref('');
    const success = ref('');
    const usersEndpointAvailable = ref(false); // ควบคุมการแสดงส่วนสมาชิก
    const form = ref({
      _id: '',
      chinese: '',
      pinyin: '',
      thai_pronunciation: '',
      thai_meaning: '',
      part_of_speech: '',
      example_usage: ''
    });

    const totalPages = computed(() => Math.ceil(total.value / limit.value));

    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', `${import.meta.env.VITE_API_URL}/users`);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        users.value = response.data;
        usersEndpointAvailable.value = true;
      } catch (err) {
        console.error('Fetch users error:', err);
        error.value = err.response?.data?.message || 'Failed to fetch users';
        usersEndpointAvailable.value = false;
      }
    };

    const fetchWords = async (newPage = 1) => {
      try {
        error.value = '';
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`, {
          params: { page: newPage, limit: limit.value }
        });
        words.value = response.data.words;
        total.value = response.data.total;
        page.value = response.data.page;
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch words';
      }
    };

    const searchWords = async () => {
      if (!searchQuery.value) {
        fetchWords();
        return;
      }
      try {
        error.value = '';
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/words/search/${searchQuery.value}`,
          {
            headers: { Authorization: `Bearer ${authStore.token}` }
          }
        );
        words.value = response.data;
        page.value = 1;
        total.value = response.data.length;
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to search words';
      }
    };

    const openAddModal = () => {
      isEditing.value = false;
      form.value = {
        _id: '',
        chinese: '',
        pinyin: '',
        thai_pronunciation: '',
        thai_meaning: '',
        part_of_speech: '',
        example_usage: ''
      };
      showModal.value = true;
    };

    const openEditModal = (word) => {
      isEditing.value = true;
      form.value = {
        _id: word._id,
        chinese: word.chinese,
        pinyin: word.pinyin,
        thai_pronunciation: word.thai_pronunciation,
        thai_meaning: word.thai_meaning,
        part_of_speech: word.part_of_speech,
        example_usage: word.example_usage.join(', ')
      };
      showModal.value = true;
    };

    const saveWord = async () => {
      try {
        error.value = '';
        const wordData = {
          chinese: form.value.chinese,
          pinyin: form.value.pinyin,
          thai_pronunciation: form.value.thai_pronunciation,
          thai_meaning: form.value.thai_meaning,
          part_of_speech: form.value.part_of_speech,
          example_usage: form.value.example_usage
            ? form.value.example_usage.split(',').map((ex) => ex.trim())
            : []
        };

        let response;
        if (isEditing.value) {
          response = await axios.put(
            `${import.meta.env.VITE_API_URL}/words/Editwords/${form.value._id}`,
            wordData,
            { headers: { Authorization: `Bearer ${authStore.token}` } }
          );
          success.value = 'Word updated successfully';
        } else {
          response = await axios.post(
            `${import.meta.env.VITE_API_URL}/words/addwords`,
            wordData,
            { headers: { Authorization: `Bearer ${authStore.token}` } }
          );
          success.value = 'Word added successfully';
        }

        showModal.value = false;
        fetchWords(page.value);
        setTimeout(() => (success.value = ''), 3000);
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to save word';
      }
    };

    const deleteWord = async (id) => {
      if (!confirm('Are you sure you want to delete this word?')) return;
      try {
        error.value = '';
        await axios.delete(`${import.meta.env.VITE_API_URL}/words/Deletewords/${id}`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        success.value = 'Word deleted successfully';
        fetchWords(page.value);
        setTimeout(() => (success.value = ''), 3000);
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to delete word';
      }
    };

    onMounted(() => {
      console.log('Token:', authStore.token);
      console.log('User Role:', authStore.user?.role);
      if (authStore.isAuthenticated && authStore.user?.role === 'admin') {
        fetchUsers();
        fetchWords();
      } else {
        error.value = 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้ (Admin only)';
      }
    });

    return {
      users,
      words,
      page,
      totalPages,
      searchQuery,
      showModal,
      isEditing,
      form,
      error,
      success,
      usersEndpointAvailable,
      fetchWords,
      searchWords,
      openAddModal,
      openEditModal,
      saveWord,
      deleteWord
    };
  }
};
</script>