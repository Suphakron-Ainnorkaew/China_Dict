<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-yellow-500/5"></div>
      <div class="container mx-auto px-6 py-16 relative">
        <div class="text-center mb-12">
          <div class="inline-flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <span class="text-white font-bold text-2xl">中泰</span>
            </div>
            <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span class="text-white font-bold text-2xl">ไทย</span>
            </div>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-4">
            <span class="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Chinese
            </span>
            <span class="text-gray-800 mx-2">×</span>
            <span class="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thai
            </span>
          </h1>
          
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            ค้นพบความงามของภาษาจีนและไทย ผ่านพจนานุกรมที่ออกแบบมาเพื่อการเรียนรู้
          </p>

          <!-- Search Bar -->
          <div class="relative max-w-2xl mx-auto mb-8">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input 
              v-model="searchQuery" 
              @input="searchWords" 
              placeholder="ค้นหาคำศัพท์จีน-ไทย..." 
              class="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl placeholder-gray-500"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-6">
              <div class="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                搜索
              </div>
            </div>
          </div>

          <!-- Pro User Badge -->
          <div v-if="isProUser" class="inline-flex bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg mb-8">
            <span class="mr-2">⭐</span> Pro User
            <button 
              @click="downloadPdf" 
              class="ml-4 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full transition-colors duration-300 flex items-center space-x-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-sm">PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Words Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          {{ searchQuery ? 'ผลการค้นหา' : 'คำศัพท์แนะนำ' }}
        </h2>
        <p class="text-gray-600">
          {{ searchQuery ? `ค้นหา: "${searchQuery}"` : 'คำศัพท์ยอดนิยมและที่ใช้บ่อย' }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-16">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-orange-200 rounded-full animate-spin"></div>
          <div class="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="max-w-md mx-auto mb-8">
        <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-2xl shadow-lg">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 font-medium">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Words Grid -->
      <div v-else-if="words.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        <div 
          v-for="(word, index) in words" 
          :key="word._id"
          class="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Decorative gradient background -->
          <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div class="relative z-10">
            <!-- Chinese Character -->
            <div class="text-center mb-4">
              <div class="text-4xl font-bold text-gray-800 mb-1 group-hover:scale-110 transition-transform duration-300">
                {{ word.chinese }}
              </div>
              <div v-if="word.pinyin" class="text-gray-500 text-sm">{{ word.pinyin }}</div>
            </div>

            <!-- Thai Translation -->
            <div class="text-center mb-4">
              <div class="text-xl font-semibold text-blue-600 mb-1">
                {{ word.thai }}
              </div>
              <div v-if="word.pronunciation" class="text-gray-600 text-sm">{{ word.pronunciation }}</div>
            </div>

            <!-- Meaning -->
            <div class="text-center">
              <div v-if="word.meaning" class="text-gray-700 font-medium mb-2 text-sm">{{ word.meaning }}</div>
              <div v-if="word.category" class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                {{ word.category }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section for More Words -->
      <div v-if="!searchQuery && words.length > 0" class="text-center">
        <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white shadow-2xl">
          <h3 class="text-3xl font-bold mb-4">เรียนรู้คำศัพท์เพิ่มเติม</h3>
          <p class="text-orange-100 mb-8 text-lg">ค้นพบคำศัพท์มากกว่า 10,000 คำพร้อมตัวอย่างการใช้งาน</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
            to="/vocabulary" 
            class="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            :class="$route.path === '/' ? '' : 'text-white hover:text-yellow-200'"
          >
            เรียกดูคำศัพท์ทั้งหมด
          </router-link>
            <router-link 
            to="/vocabulary" 
            class="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            :class="$route.path === '/' ? '' : 'text-white hover:text-yellow-200'"
          >
            หมวดคำศัพท์
          </router-link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="searchQuery" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-700 mb-4">ไม่พบคำศัพท์</h3>
        <p class="text-gray-500 text-lg">ลองเปลี่ยนคำค้นหาหรือเรียกดูคำศัพท์ทั้งหมด</p>
        <button 
          @click="searchQuery = ''; searchWords()" 
          class="mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          ดูคำศัพท์ทั้งหมด
        </button>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="text-center">
          <div class="flex justify-center items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold">中泰</span>
            </div>
            <span class="text-2xl font-bold">Chinese-Thai Dictionary</span>
          </div>
          <p class="text-gray-400 mb-6">เชื่อมโยงวัฒนธรรมผ่านคำศัพท์</p>
          <p class="text-gray-500 text-sm">Made with ❤️ for language learners</p>
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
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
          `${import.meta.env.VITE_API_URL}/words/search/${encodeURIComponent(searchQuery.value)}`,
          { headers: { Authorization: `Bearer ${authStore.token}` } }
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
</style>