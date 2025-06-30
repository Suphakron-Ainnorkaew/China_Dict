<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Change Password</h1>
    <form @submit.prevent="handleChangePassword" class="max-w-md mx-auto">
      <div class="mb-4">
        <label class="block text-gray-700">Old Password</label>
        <input v-model="form.oldPassword" type="password" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">New Password</label>
        <input v-model="form.newPassword" type="password" class="w-full p-2 border rounded" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">OTP</label>
        <input v-model="form.otp" class="w-full p-2 border rounded" required />
        <button type="button" @click="requestOtp" class="mt-2 bg-gray-600 text-white p-2 rounded">Request OTP</button>
      </div>
      <button type="submit" class="bg-blue-600 text-white p-2 rounded">Change Password</button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p v-if="success" class="text-green-500 mt-2">{{ success }}</p>
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
    const form = ref({ oldPassword: '', newPassword: '', otp: '' });
    const error = ref('');
    const success = ref('');

    const requestOtp = async () => {
      try {
        await authStore.requestOtp();
        success.value = 'OTP sent to your email';
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to request OTP';
      }
    };

    const handleChangePassword = async () => {
      try {
        await authStore.changePassword(form.value);
        success.value = 'Password changed successfully';
        error.value = '';
        setTimeout(() => router.push('/'), 2000);
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to change password';
        success.value = '';
      }
    };

    return { form, error, success, requestOtp, handleChangePassword };
  }
};
</script>