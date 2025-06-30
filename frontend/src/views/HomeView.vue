<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <!-- Header Section -->
    <div class="bg-white/70 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
      <div class="container mx-auto px-6 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-xl">中泰</span>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Chinese-Thai Dictionary
              </h1>
              <p class="text-gray-500 text-sm">Discover the beauty of languages</p>
            </div>
          </div>
          
          <!-- Pro Badge -->
          <div v-if="isProUser" class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            <span class="mr-1">⭐</span> Pro User
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- Search Section -->
      <div class="mb-8">
        <div class="relative max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            v-model="searchQuery" 
            @input="searchWords" 
            placeholder="Search Chinese or Thai words..." 
            class="w-full pl-12 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
          />
          
          <!-- Search suggestions/hints -->
          <div class="flex flex-wrap gap-2 mt-4 justify-center">
            <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Try: 你好</span>
            <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">สวัสดี</span>
            <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">谢谢</span>
          </div>
        </div>
      </div>

      <!-- Action Bar -->
      <div class="flex justify-center mb-8">
        <button 
          v-if="isProUser" 
          @click="downloadPdf" 
          class="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
        >
          <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <span>Download PDF</span>
        </button>
      </div>

      <!-- Words Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="(word, index) in words" 
          :key="word._id"
          class="group"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <WordCard 
            :word="word" 
            class="transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="words.length === 0 && !error && searchQuery" class="text-center mt-16">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No words found</h3>
        <p class="text-gray-500">Try adjusting your search terms or browse all words</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center mt-16">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div class="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="max-w-md mx-auto mt-8">
        <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-red-700 font-medium">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-20 bg-gray-50 border-t border-gray-200">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center text-gray-600">
          <p class="mb-2">Made with ❤️ for language learners</p>
          <p class="text-sm">Bridging cultures through words</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
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
        words.value = response.data;
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
    fetchWords();

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
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}
</style>