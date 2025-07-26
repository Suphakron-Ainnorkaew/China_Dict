<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="max-w-md mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700">Username</label>
        <input v-model="form.username" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white p-2 rounded">Login</button>
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
    const form = ref({ username: '', password: '' });
    const error = ref('');

    const handleLogin = async () => {
      try {
        const data =  await authStore.login(form.value);
        if (data.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed';
      }
    };

    return { form, error, handleLogin };
  }
};
</script>