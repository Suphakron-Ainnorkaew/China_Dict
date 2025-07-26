<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-30 blur-xl"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
      <div class="absolute bottom-32 left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 bg-red-300 rounded-full opacity-25 blur-xl"></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-4 relative z-10">
      <div class="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        
        <!-- Language Toggle Buttons -->
        <div class="mb-8">
          <div class="bg-white rounded-2xl p-2 shadow-lg border border-red-100">
            <div class="flex space-x-2">
              <div class="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">中</div>
              <div class="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">泰</div>
            </div>
          </div>
        </div>

        <!-- Title Section -->
        <div class="text-center mb-8">
          <h1 class="text-5xl font-bold mb-4">
            <span class="text-red-500">Chinese</span> 
            <span class="text-gray-800 mx-4">x</span> 
            <span class="text-purple-600">Thai</span>
          </h1>
          <h2 class="text-2xl text-gray-700 mb-4">เข้าสู่ระบบ</h2>
          <p class="text-gray-600">
            เข้าสู่ระบบเพื่อใช้งานพจนานุกรมจีน-ไทย 
            <span class="text-red-500 font-semibold">มากกว่า 1000 คำศัพท์</span> 
            พร้อมตัวอย่างการใช้งาน
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="w-full max-w-md">
          <div class="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">ชื่อผู้ใช้ / Username</label>
              <input 
                v-model="form.username" 
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                placeholder="กรุณาใส่ชื่อผู้ใช้..."
                required 
              />
            </div>
            
            <div class="mb-6">
              <label class="block text-gray-700 font-medium mb-2">รหัสผ่าน / Password</label>
              <input 
                v-model="form.password" 
                type="password" 
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                placeholder="กรุณาใส่รหัสผ่าน..."
                required 
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
            >
              เข้าสู่ระบบ →
            </button>
            
            <p v-if="error" class="text-red-500 mt-4 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
              {{ error }}
            </p>
          </div>
        </form>

        <!-- Additional Options -->
        <div class="mt-6">
          <button class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
            เริ่มเรียนรู้ →
          </button>
        </div>

        <!-- Feature Badge -->
        <div class="mt-8 flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-purple-100">
          <svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
          </svg>
          <span class="text-purple-600 font-medium">เล่นเกม ⚡</span>
        </div>
      </div>
    </div>
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
        const data = await authStore.login(form.value);
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