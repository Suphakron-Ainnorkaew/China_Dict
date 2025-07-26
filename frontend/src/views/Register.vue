<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-30 blur-xl"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-40 blur-lg"></div>
      <div class="absolute bottom-32 left-20 w-40 h-40 bg-yellow-200 rounded-full opacity-20 blur-2xl"></div>
      <div class="absolute bottom-20 right-10 w-28 h-28 bg-red-300 rounded-full opacity-25 blur-xl"></div>
      <div class="absolute top-60 left-1/2 w-36 h-36 bg-purple-300 rounded-full opacity-20 blur-2xl"></div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-4 relative z-10">
      <div class="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-8">
        
        <!-- Language Toggle Buttons -->
        <div class="mb-6">
          <div class="bg-white rounded-2xl p-2 shadow-lg border border-red-100">
            <div class="flex space-x-2">
              <div class="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">中</div>
              <div class="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-lg">泰</div>
            </div>
          </div>
        </div>

        <!-- Title Section -->
        <div class="text-center mb-6">
          <h1 class="text-4xl md:text-5xl font-bold mb-3">
            <span class="text-red-500">Chinese</span> 
            <span class="text-gray-800 mx-4">×</span> 
            <span class="text-purple-600">Thai</span>
          </h1>
          <h2 class="text-2xl text-gray-700 mb-3">สมัครสมาชิก</h2>
          <p class="text-gray-600">
            สร้างบัญชีเพื่อเริ่มเรียนรู้พจนานุกรมจีน-ไทย 
            <span class="text-red-500 font-semibold">มากกว่า 1000 คำศัพท์</span> 
            พร้อมตัวอย่างการใช้งาน
          </p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="w-full max-w-lg">
          <div class="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
            
            <!-- Username Field -->
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2">ชื่อผู้ใช้ / Username</label>
              <input 
                v-model="form.username" 
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                placeholder="กรุณาใส่ชื่อผู้ใช้..."
                required 
              />
            </div>
            
            <!-- Email Field -->
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2">อีเมล / Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                placeholder="example@email.com"
                required 
              />
            </div>
            
            <!-- Password Field -->
            <div class="mb-5">
              <label class="block text-gray-700 font-medium mb-2">รหัสผ่าน / Password</label>
              <input 
                v-model="form.password" 
                type="password" 
                class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                placeholder="กรุณาใส่รหัสผ่าน..."
                required 
              />
            </div>
            
            <!-- Gender and Age Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <!-- Gender Field -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">เพศ / Gender</label>
                <select 
                  v-model="form.gender" 
                  class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg bg-white"
                >
                  <option value="">เลือกเพศ</option>
                  <option value="male">ชาย / Male</option>
                  <option value="female">หญิง / Female</option>
                  <option value="other">อื่นๆ / Other</option>
                </select>
              </div>
              
              <!-- Age Field -->
              <div>
                <label class="block text-gray-700 font-medium mb-2">อายุ / Age</label>
                <input 
                  v-model.number="form.age" 
                  type="number" 
                  class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors duration-200 text-lg" 
                  placeholder="ระบุอายุ..."
                />
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg mb-4"
            >
              สมัครสมาชิก →
            </button>
            
            <!-- Error Message -->
            <p v-if="error" class="text-red-500 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
              {{ error }}
            </p>
            
            <!-- Login Link -->
            <div class="text-center mt-4 pt-4 border-t border-gray-200">
              <p class="text-gray-600">
                มีบัญชีแล้ว? 
                <a href="/login" class="text-red-500 hover:text-red-600 font-medium underline">เข้าสู่ระบบ</a>
              </p>
            </div>
          </div>
        </form>

        <!-- Additional Features -->
        <div class="mt-6 flex flex-col sm:flex-row gap-4">
          <button class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
            เริ่มเรียนรู้ →
          </button>
          <button class="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
            ทัวร์เว็บไซต์ 🎯
          </button>
        </div>

        <!-- Feature Badges -->
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <div class="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-purple-100">
            <svg class="w-4 h-4 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
            <span class="text-purple-600 font-medium text-sm">เล่นเกม ⚡</span>
          </div>
          
          <div class="flex items-center bg-white rounded-full px-4 py-2 shadow-lg border border-red-100">
            <svg class="w-4 h-4 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span class="text-red-600 font-medium text-sm">1000+ คำศัพท์</span>
          </div>
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