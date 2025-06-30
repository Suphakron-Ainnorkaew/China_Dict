<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Chinese-Thai Vocabulary</h1>
        </div>
        <p class="text-gray-600 text-lg">เรียนรู้คำศัพท์จีน-ไทย อย่างสนุกและมีประสิทธิภาพ</p>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-md mx-auto">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="ค้นหาคำศัพท์..."
            class="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            @input="searchWords"
          />
        </div>
      </div>

      <!-- Debug Info -->
      <div v-if="!isLoading" class="text-center mb-4">
        <p class="text-gray-600">จำนวนคำทั้งหมด: {{ filteredData.length }} | จำนวนหน้า: {{ totalPages }} | คำในหน้านี้: {{ currentWords.length }}</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center mb-6">
        <p class="text-gray-600">กำลังโหลดคำศัพท์...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center mb-6">
        <p class="text-red-500">{{ error }}</p>
      </div>

      <!-- Stats -->
      <div v-if="!isLoading && filteredData.length" class="mb-6 text-center">
        <span class="inline-block bg-white px-4 py-2 rounded-full shadow-sm border text-sm text-gray-600">
          แสดง {{ startIndex + 1 }}-{{ Math.min(startIndex + wordsPerPage, filteredData.length) }} จาก {{ filteredData.length }} คำ
        </span>
      </div>

      <!-- Vocabulary Grid -->
      <div v-if="!isLoading && filteredData.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <WordCard v-for="word in currentWords" :key="word._id || word.id" :word="word" />
      </div>

      <!-- No Results -->
      <div v-if="!isLoading && !filteredData.length" class="text-center mb-6">
        <p class="text-gray-600">ไม่พบคำศัพท์ที่ตรงกับการค้นหา</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && !isLoading && filteredData.length" class="flex items-center justify-center space-x-2">
        <button
          :disabled="currentPage === 1"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          @click="handlePageChange(currentPage - 1)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          ก่อนหน้า
        </button>

        <div class="flex space-x-1">
          <button
            v-for="pageNum in displayedPages"
            :key="pageNum"
            class="w-10 h-10 rounded-lg font-medium transition-colors"
            :class="currentPage === pageNum ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'"
            @click="handlePageChange(pageNum)"
          >
            {{ pageNum }}
          </button>
        </div>

        <button
          :disabled="currentPage === totalPages"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          @click="handlePageChange(currentPage + 1)"
        >
          ถัดไป
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store';
import WordCard from '../components/WordCard.vue';

export default {
  components: { WordCard },
  setup() {
    const authStore = useAuthStore();
    const words = ref([]);
    const searchTerm = ref('');
    const currentPage = ref(1);
    const wordsPerPage = ref(20); // ใช้ ref เพื่อให้สามารถเปลี่ยนได้ในอนาคต
    const isLoading = ref(false);
    const error = ref('');

    // Fetch vocabulary data from backend
    const fetchWords = async () => {
      isLoading.value = true;
      error.value = '';
      try {
        console.log('Fetching words with token:', authStore.token);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        words.value = response.data.map(word => ({
          ...word,
          id: word._id // Map _id to id for consistency
        }));
        console.log('Fetched words:', words.value.length);
      } catch (err) {
        error.value = err.response?.data?.message || 'ไม่สามารถดึงคำศัพท์ได้';
        console.error('Fetch words error:', error.value);
      } finally {
        isLoading.value = false;
      }
    };

    // Filter data based on search term
    const filteredData = computed(() => {
      const filtered = words.value.filter(word =>
        (word.chinese || '').toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        (word.thai_meaning || '').toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        (word.pinyin || '').toLowerCase().includes(searchTerm.value.toLowerCase())
      );
      console.log('Filtered words:', filtered.length);
      return filtered;
    });

    // Calculate pagination
    const totalPages = computed(() => {
      const pages = Math.ceil(filteredData.value.length / wordsPerPage.value);
      console.log('Total pages:', pages, 'Filtered words:', filteredData.value.length, 'Words per page:', wordsPerPage.value);
      return pages;
    });

    const startIndex = computed(() => {
      const index = (currentPage.value - 1) * wordsPerPage.value;
      console.log('Current page:', currentPage.value, 'Start index:', index);
      return index;
    });

    const currentWords = computed(() => {
      const sliced = filteredData.value.slice(startIndex.value, startIndex.value + wordsPerPage.value);
      console.log('Current page:', currentPage.value, 'Start index:', startIndex.value, 'Words shown:', sliced.length);
      return sliced;
    });

    // Calculate displayed page numbers
    const displayedPages = computed(() => {
      const pages = [];
      let startPage, endPage;
      if (totalPages.value <= 5) {
        startPage = 1;
        endPage = totalPages.value;
      } else if (currentPage.value <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage.value >= totalPages.value - 2) {
        startPage = totalPages.value - 4;
        endPage = totalPages.value;
      } else {
        startPage = currentPage.value - 2;
        endPage = currentPage.value + 2;
      }
      for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i <= totalPages.value) {
          pages.push(i);
        }
      }
      console.log('Displayed pages:', pages);
      return pages;
    });

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Page changed to:', page);
      }
    };

    const searchWords = () => {
      currentPage.value = 1; // Reset to first page on search
      console.log('Search term:', searchTerm.value);
    };

    // Watch for changes in filteredData to reset page if needed
    watch(filteredData, (newFilteredData) => {
      if (newFilteredData.length <= startIndex.value) {
        currentPage.value = 1;
        console.log('Reset to page 1 due to filtered data change');
      }
    });

    // Handle Vite HMR to ensure reload on file changes
    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        console.log('HMR: VocabularyDisplay.vue reloaded');
      });
    }

    onMounted(() => {
      fetchWords();
    });

    return {
      authStore,
      words,
      searchTerm,
      currentPage,
      wordsPerPage,
      isLoading,
      error,
      filteredData,
      totalPages,
      startIndex,
      currentWords,
      displayedPages,
      handlePageChange,
      searchWords
    };
  }
};
</script>