<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="handleRegister" class="max-w-md mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input v-model="form.username" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Gender</label>
        <select v-model="form.gender" class="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Age</label>
        <input v-model.number="form.age" type="number" class="w-full p-2 border rounded" />
      </div>
      <button type="submit" class="bg-blue-600 text-white p-2 rounded">Register</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const form = ref({ username: '', email: '', password: '', gender: '', age: null });
    const error = ref('');

    const handleRegister = async () => {
      try {
        await authStore.register(form.value);
        router.push('/');
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed';
      }
    };

    return { form, error, handleRegister };
  }
};
</script>