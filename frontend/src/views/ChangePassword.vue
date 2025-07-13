<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">เปลี่ยนรหัสผ่าน</h1>
        <p class="text-gray-600">กรุณากรอกข้อมูลเพื่อเปลี่ยนรหัสผ่านของคุณ</p>
      </div>

      <!-- Form Card -->
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form @submit.prevent="handleChangePassword" class="p-8">
            <!-- Current Password -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่านปัจจุบัน
              </label>
              <div class="relative">
                <input 
                  v-model="form.oldPassword" 
                  :type="showOldPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  :class="{ 'border-red-500': errors.oldPassword }"
                  placeholder="กรอกรหัสผ่านปัจจุบัน"
                  required 
                />
                <button 
                  type="button"
                  @click="showOldPassword = !showOldPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg v-if="showOldPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.oldPassword" class="text-red-500 text-sm mt-1">{{ errors.oldPassword }}</p>
            </div>

            <!-- New Password -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่านใหม่
              </label>
              <div class="relative">
                <input 
                  v-model="form.newPassword" 
                  :type="showNewPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  :class="{ 'border-red-500': errors.newPassword }"
                  placeholder="กรอกรหัสผ่านใหม่"
                  required 
                />
                <button 
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
              
              <!-- Password Strength Indicator -->
              <div v-if="form.newPassword" class="mt-3">
                <div class="flex items-center space-x-2 mb-2">
                  <span class="text-xs text-gray-600">ความแข็งแกร่งของรหัสผ่าน:</span>
                  <span class="text-xs font-medium" :class="passwordStrength.color">{{ passwordStrength.text }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="passwordStrength.bgColor"
                    :style="{ width: passwordStrength.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="mb-8">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                ยืนยันรหัสผ่านใหม่
              </label>
              <div class="relative">
                <input 
                  v-model="form.confirmPassword" 
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  :class="{ 'border-red-500': errors.confirmPassword, 'border-green-500': form.confirmPassword && !errors.confirmPassword && form.newPassword === form.confirmPassword }"
                  placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
                  required 
                />
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
              <p v-else-if="form.confirmPassword && form.newPassword === form.confirmPassword" class="text-green-500 text-sm mt-1">
                ✓ รหัสผ่านตรงกัน
              </p>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isLoading || !isFormValid"
              class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังเปลี่ยนรหัสผ่าน...
              </div>
              <span v-else>เปลี่ยนรหัสผ่าน</span>
            </button>

            <!-- Back Button -->
            <router-link 
              to="/profile" 
              class="block text-center mt-4 text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              ← กลับไปหน้าโปรไฟล์
            </router-link>
          </form>
        </div>

        <!-- Success/Error Messages -->
        <transition name="slide-fade">
          <div v-if="success" class="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <p class="text-green-800 font-medium">{{ success }}</p>
            </div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="error" class="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-red-800 font-medium">{{ error }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../store';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    
    // Form data
    const form = ref({ 
      oldPassword: '', 
      newPassword: '', 
      confirmPassword: '' 
    });
    
    // UI states
    const showOldPassword = ref(false);
    const showNewPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const error = ref('');
    const success = ref('');
    
    // Validation errors
    const errors = ref({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    // Password strength calculation
    const passwordStrength = computed(() => {
      const password = form.value.newPassword;
      if (!password) return { text: '', percentage: 0, color: '', bgColor: '' };
      
      let score = 0;
      let feedback = [];
      
      // Length check
      if (password.length >= 8) score += 25;
      if (password.length >= 12) score += 25;
      
      // Character variety checks
      if (/[a-z]/.test(password)) score += 20;
      if (/[A-Z]/.test(password)) score += 20;
      if (/[0-9]/.test(password)) score += 20;
      if (/[^A-Za-z0-9]/.test(password)) score += 20;
      
      // Determine strength level
      if (score >= 80) {
        return { 
          text: 'แข็งแกร่งมาก', 
          percentage: 100, 
          color: 'text-green-600', 
          bgColor: 'bg-green-500' 
        };
      } else if (score >= 60) {
        return { 
          text: 'แข็งแกร่ง', 
          percentage: 75, 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-500' 
        };
      } else if (score >= 40) {
        return { 
          text: 'ปานกลาง', 
          percentage: 50, 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-500' 
        };
      } else {
        return { 
          text: 'อ่อนแอ', 
          percentage: 25, 
          color: 'text-red-600', 
          bgColor: 'bg-red-500' 
        };
      }
    });

    // Form validation
    const isFormValid = computed(() => {
      return form.value.oldPassword && 
             form.value.newPassword && 
             form.value.confirmPassword && 
             form.value.newPassword === form.value.confirmPassword &&
             form.value.newPassword.length >= 6 &&
             Object.values(errors.value).every(error => !error);
    });

    // Watch for validation
    watch(() => form.value, (newForm) => {
      // Clear previous errors
      errors.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      };

      // Validate old password
      if (newForm.oldPassword && newForm.oldPassword.length < 1) {
        errors.value.oldPassword = 'กรุณากรอกรหัสผ่านปัจจุบัน';
      }

      // Validate new password
      if (newForm.newPassword) {
        if (newForm.newPassword.length < 6) {
          errors.value.newPassword = 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร';
        } else if (newForm.newPassword === newForm.oldPassword) {
          errors.value.newPassword = 'รหัสผ่านใหม่ต้องไม่เหมือนกับรหัสผ่านปัจจุบัน';
        }
      }

      // Validate confirm password
      if (newForm.confirmPassword && newForm.newPassword !== newForm.confirmPassword) {
        errors.value.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
      }
    }, { deep: true });

    const handleChangePassword = async () => {
      if (!isFormValid.value) return;
      
      isLoading.value = true;
      error.value = '';
      success.value = '';

      try {
        await authStore.changePassword({
          oldPassword: form.value.oldPassword,
          newPassword: form.value.newPassword
        });
        
        success.value = 'เปลี่ยนรหัสผ่านสำเร็จแล้ว!';
        
        // Clear form
        form.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
        showOldPassword.value = false;
        showNewPassword.value = false;
        showConfirmPassword.value = false;
        
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
        
      } catch (err) {
        error.value = err.response?.data?.message || 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน';
      } finally {
        isLoading.value = false;
      }
    };

    return { 
      form, 
      errors,
      showOldPassword,
      showNewPassword, 
      showConfirmPassword,
      isLoading,
      error, 
      success, 
      passwordStrength,
      isFormValid,
      handleChangePassword 
    };
  }
};
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>