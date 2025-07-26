<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-yellow-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div class="container mx-auto px-6 py-20 relative z-10">
        <div class="text-center mb-16">
          <!-- Logo Animation -->
          <div class="flex justify-center items-center mb-8">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
              <div class="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-white/20 shadow-2xl">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold text-xl">中</span>
                  </div>
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold text-xl">泰</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Headline -->
          <h1 class="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span class="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Chinese
            </span>
            <span class="text-gray-800 mx-4">×</span>
            <span class="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thai
            </span>
          </h1>
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            พจนานุกรมภาษาจีน-ไทย
          </h2>
          
          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            ค้นพบความงามของภาษาจีนและไทย ผ่านพจนานุกรมที่ออกแบบมาเพื่อการเรียนรู้ 
            <span class="font-semibold text-orange-600">มากกว่า 1000 คำศัพท์</span> พร้อมตัวอย่างการใช้งาน
          </p>

          <!-- Search Bar -->
          <div class="relative max-w-2xl mx-auto mb-12">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              v-model="searchQuery" 
              @input="searchWords" 
              placeholder="ค้นหาคำศัพท์จีน-ไทย..." 
              class="w-full pl-16 pr-24 py-6 text-lg border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl placeholder-gray-500"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-6">
              <div>
                <router-link 
                  to="/vocabulary" 
                  class="group bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>搜索</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
              to="/vocabulary" 
              class="group bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <span>เริ่มเรียนรู้</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </router-link>
            
            <router-link 
              to="/game" 
              class="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-gray-200 hover:border-orange-300 flex items-center space-x-2"
            >
              <span>🎮 เล่นเกม</span>
              <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </router-link>
          </div>

          <!-- Pro User Badge -->
          <div v-if="isProUser" class="mt-8 inline-flex bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold shadow-xl">
            <span class="mr-2">⭐</span> Pro User
            <button 
              @click="downloadPdf" 
              class="ml-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors duration-300 flex items-center space-x-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-white/50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ทำไมต้องเลือกเรา?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">ออกแบบมาเพื่อการเรียนรู้ภาษาจีนที่ง่ายและสนุก</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">คำศัพท์ครบถ้วน</h3>
            <p class="text-gray-600 leading-relaxed">มากกว่า 1000 คำศัพท์จีน-ไทย พร้อมพินอินและคำอ่านไทย</p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">เกมการเรียนรู้</h3>
            <p class="text-gray-600 leading-relaxed">เกมทายคำศัพท์ที่สนุกและช่วยให้จำคำศัพท์ได้ง่ายขึ้น</p>
          </div>
          
          <div class="text-center group">
            <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">ปลอดภัยและเชื่อถือได้</h3>
            <p class="text-gray-600 leading-relaxed">ระบบความปลอดภัยที่แข็งแกร่ง ข้อมูลส่วนตัวของคุณปลอดภัย</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Words Section -->
    <div class="container mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          {{ searchQuery ? 'ผลการค้นหา' : 'คำศัพท์แนะนำ' }}
        </h2>
        <p class="text-xl text-gray-600">
          {{ searchQuery ? `ค้นหา: "${searchQuery}"` : 'คำศัพท์ยอดนิยมและที่ใช้บ่อยในชีวิตประจำวัน' }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-orange-200 rounded-full animate-spin"></div>
          <div class="absolute top-0 left-0 w-20 h-20 border-4 border-orange-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="max-w-md mx-auto mb-8">
        <div class="bg-red-50 border-l-4 border-red-400 p-8 rounded-2xl shadow-xl">
          <div class="flex items-center">
            <svg class="w-8 h-8 text-red-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 font-medium text-lg">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Words Grid -->
      <div v-else-if="words.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
        <div 
          v-for="(word, index) in words" 
          :key="word._id"
          class="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Decorative gradient background -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <!-- Floating elements -->
          <div class="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></div>
          
          <div class="relative z-10">
            <!-- Chinese Character -->
            <div class="text-center mb-6">
              <div class="text-5xl font-bold text-gray-800 mb-2 group-hover:scale-110 transition-transform duration-300">
                {{ word.chinese }}
              </div>
              <div v-if="word.pinyin" class="text-gray-500 text-base font-medium">{{ word.pinyin }}</div>
            </div>

            <!-- Thai Translation -->
            <div class="text-center mb-6">
              <div class="text-2xl font-bold text-blue-600 mb-2">
                {{ word.thai }}
              </div>
              <div v-if="word.pronunciation" class="text-gray-600 text-sm">{{ word.pronunciation }}</div>
            </div>

            <!-- Meaning -->
            <div class="text-center">
              <div v-if="word.meaning" class="text-gray-700 font-medium mb-3 text-sm leading-relaxed">{{ word.meaning }}</div>
              <div v-if="word.category" class="text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full inline-block font-medium">
                {{ word.category }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section for More Words -->
      <div v-if="!searchQuery && words.length > 0" class="text-center">
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-16 text-white shadow-2xl relative overflow-hidden">
          <!-- Background decoration -->
          <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400/20 to-red-400/20"></div>
          <div class="relative z-10">
            <h3 class="text-4xl font-bold mb-6">เรียนรู้คำศัพท์เพิ่มเติม</h3>
            <p class="text-orange-100 mb-10 text-xl leading-relaxed">ค้นพบคำศัพท์มากกว่า 10,000 คำพร้อมตัวอย่างการใช้งานและเกมการเรียนรู้</p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <router-link 
                to="/vocabulary" 
                class="group bg-white text-orange-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>เรียกดูคำศัพท์ทั้งหมด</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </router-link>
              <router-link 
                to="/game" 
                class="group bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-white/30 flex items-center justify-center space-x-2"
              >
                <span>🎮 เล่นเกม</span>
                <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="searchQuery" class="text-center py-20">
        <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
          <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-3xl font-bold text-gray-700 mb-6">ไม่พบคำศัพท์</h3>
        <p class="text-gray-500 text-xl mb-8">ลองเปลี่ยนคำค้นหาหรือเรียกดูคำศัพท์ทั้งหมด</p>
        <button 
          @click="searchQuery = ''; searchWords()" 
          class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          ดูคำศัพท์ทั้งหมด
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
      <div class="container mx-auto px-6">
        <div class="text-center">
          <div class="flex justify-center items-center space-x-4 mb-8">
            <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">中泰</span>
            </div>
            <span class="text-3xl font-bold">Chinese-Thai Dictionary</span>
          </div>
          <p class="text-gray-300 text-lg mb-6">เชื่อมโยงวัฒนธรรมผ่านคำศัพท์</p>
          <p class="text-gray-500">Made with ❤️ for language learners</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store';
import WordCard from '../components/WordCard.vue';

export default {
  components: { WordCard },
  setup() {
    const authStore = useAuthStore();
    const words = ref([]);
    const searchQuery = ref('');
    const error = ref('');
    const loading = ref(false);

    const fetchWords = async () => {
      try {
        loading.value = true;
        error.value = '';
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`);
        // เอาแค่ 24 คำแรกสำหรับหน้าแรก
        words.value = response.data.slice(0, 24);
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch words';
      } finally {
        loading.value = false;
      }
    };

    const searchWords = async () => {
      try {
        loading.value = true;
        error.value = '';
        if (!searchQuery.value.trim()) {
          await fetchWords();
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/words/search/${encodeURIComponent(searchQuery.value)}`
        );
        words.value = response.data;
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to search words';
      } finally {
        loading.value = false;
      }
    };

    const downloadPdf = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words/export/pdf`, {
          headers: { Authorization: `Bearer ${authStore.token}` },
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'chinese_thai_dictionary.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        error.value = 'Failed to download PDF';
      } finally {
        loading.value = false;
      }
    };

    // Initialize
    onMounted(() => {
      fetchWords();
    });

    return { 
      words, 
      searchQuery, 
      error, 
      loading,
      searchWords, 
      downloadPdf, 
      isProUser: authStore.isProUser 
    };
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #fb923c, #dc2626);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #ea580c, #b91c1c);
}

/* Hover effects */
.hover\:shadow-3xl:hover {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Enhanced animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>