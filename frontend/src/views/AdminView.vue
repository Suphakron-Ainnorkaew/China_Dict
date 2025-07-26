<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-30 blur-xl"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
      <div class="absolute bottom-32 left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 bg-red-300 rounded-full opacity-25 blur-xl"></div>
      <div class="absolute top-1/2 left-1/3 w-36 h-36 bg-purple-300 rounded-full opacity-15 blur-2xl"></div>
    </div>

    <!-- Header -->
    <header class="bg-red-600 shadow-lg relative z-10">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="bg-yellow-400 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 class="text-white text-xl font-bold">中泰词典 - Admin Panel</h1>
          </div>
          <div class="flex items-center space-x-2">
            <div class="bg-white rounded-xl p-1 shadow-lg border border-red-100">
              <div class="flex space-x-1">
                <div class="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold text-sm">中</div>
                <div class="bg-purple-500 text-white px-3 py-2 rounded-lg font-semibold text-sm">泰</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto p-6 relative z-10">
      <!-- Page Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">
          <span class="text-red-500">Admin</span> 
          <span class="text-purple-600">Dashboard</span>
        </h1>
        <p class="text-gray-600">ระบบจัดการพจนานุกรมจีน-ไทย</p>
      </div>

      <!-- Members Section -->
      <div class="mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg class="w-6 h-6 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            รายชื่อสมาชิก / Members
          </h2>
          
          <div v-if="!usersEndpointAvailable" class="text-gray-500 bg-gray-50 p-4 rounded-lg border">
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
            </svg>
            User list feature is not yet implemented
          </div>
          
          <div v-else-if="users.length === 0" class="text-gray-500 bg-gray-50 p-4 rounded-lg border">
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
            </svg>
            No members found
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gradient-to-r from-red-500 to-purple-500 text-white">
                  <th class="p-3 text-left rounded-tl-lg">Username</th>
                  <th class="p-3 text-left">Email</th>
                  <th class="p-3 text-left rounded-tr-lg">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="p-3 font-medium text-gray-800">{{ user.username }}</td>
                  <td class="p-3 text-gray-600">{{ user.email }}</td>
                  <td class="p-3">
                    <span :class="user.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'" 
                          class="px-2 py-1 rounded-full text-xs font-semibold">
                      {{ user.role }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Vocabulary Management Section -->
      <div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg class="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            จัดการคำศัพท์จีน / Chinese Vocabulary
          </h2>
          
          <!-- Search and Add Section -->
          <div class="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div class="flex-1 w-full sm:w-auto">
              <input
                v-model="searchQuery"
                @input="searchWords"
                placeholder="ค้นหาคำศัพท์จีน, พินอิน หรือความหมายไทย..."
                class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200"
              />
            </div>
            <button
              @click="openAddModal"
              class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
              เพิ่มคำใหม่
            </button>
          </div>

          <!-- Vocabulary Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gradient-to-r from-red-500 to-purple-500 text-white">
                  <th class="p-3 text-left rounded-tl-lg">Chinese</th>
                  <th class="p-3 text-left">Pinyin</th>
                  <th class="p-3 text-left">Thai Pronunciation</th>
                  <th class="p-3 text-left">Thai Meaning</th>
                  <th class="p-3 text-left">Part of Speech</th>
                  <th class="p-3 text-left rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="word in words" :key="word._id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td class="p-3 font-bold text-xl text-red-600">{{ word.chinese }}</td>
                  <td class="p-3 text-purple-600 font-medium">{{ word.pinyin }}</td>
                  <td class="p-3 text-gray-700">{{ word.thai_pronunciation }}</td>
                  <td class="p-3 text-gray-800 font-medium">{{ word.thai_meaning }}</td>
                  <td class="p-3">
                    <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {{ word.part_of_speech }}
                    </span>
                  </td>
                  <td class="p-3">
                    <div class="flex gap-2">
                      <button
                        @click="openEditModal(word)"
                        class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-3 py-1 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm font-semibold"
                      >
                        แก้ไข
                      </button>
                      <button
                        @click="deleteWord(word._id)"
                        class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm font-semibold"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-center items-center gap-4">
            <button
              @click="fetchWords(page - 1)"
              :disabled="page === 1"
              class="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              ← ก่อนหน้า
            </button>
            <span class="bg-white px-4 py-2 rounded-lg border-2 border-red-200 font-semibold text-gray-700">
              หน้า {{ page }} จาก {{ totalPages }}
            </span>
            <button
              @click="fetchWords(page + 1)"
              :disabled="page === totalPages"
              class="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 disabled:from-gray-300 disabled:to-gray-300 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              ถัดไป →
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-6 text-center">
              <span v-if="isEditing" class="text-yellow-600">แก้ไขคำศัพท์</span>
              <span v-else class="text-red-600">เพิ่มคำศัพท์ใหม่</span>
            </h3>
            
            <form @submit.prevent="saveWord">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">คำศัพท์จีน / Chinese</label>
                  <input
                    v-model="form.chinese"
                    class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg"
                    required
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">พินอิน / Pinyin</label>
                  <input
                    v-model="form.pinyin"
                    class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">การออกเสียงไทย / Thai Pronunciation</label>
                  <input
                    v-model="form.thai_pronunciation"
                    class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">ความหมายไทย / Thai Meaning</label>
                  <input
                    v-model="form.thai_meaning"
                    class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2">ชนิดของคำ / Part of Speech</label>
                <input
                  v-model="form.part_of_speech"
                  class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200"
                  required
                />
              </div>

              <div class="mb-6">
                <label class="block text-gray-700 font-medium mb-2">ตัวอย่างการใช้ / Example Usage (คั่นด้วยจุลภาค)</label>
                <textarea
                  v-model="form.example_usage"
                  class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 h-24 resize-none"
                  placeholder="e.g. Example 1, Example 2"
                ></textarea>
              </div>

              <div class="flex justify-end gap-3">
                <button
                  type="button"
                  @click="showModal = false"
                  class="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Status Messages -->
      <div v-if="error" class="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-xl shadow-lg z-50 max-w-md">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
          </svg>
          {{ error }}
        </div>
      </div>

      <div v-if="success" class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-xl shadow-lg z-50 max-w-md">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
          </svg>
          {{ success }}
        </div>
      </div>
    </div>
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