<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4 relative overflow-hidden">
    <!-- Subtle Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-20 -left-20 w-40 h-40 bg-red-200/30 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-200/30 rounded-full blur-2xl"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="relative">
            <div class="bg-red-600 p-3 rounded-full shadow-lg">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              汉语词汇游戏
            </h1>
            <h2 class="text-sm sm:text-base font-medium text-gray-600">Chinese Vocabulary Game</h2>
          </div>
        </div>
        <p class="text-gray-700 text-sm sm:text-base font-medium bg-white/80 px-4 py-2 rounded-full border border-gray-200 inline-block">
          ทายคำแปลภาษาไทยให้ถูกเพื่อสะสมคะแนน! 🎯
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center mb-6">
        <div class="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto border border-gray-200">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-600 mx-auto mb-3"></div>
          <p class="text-gray-700 text-base font-medium">กำลังโหลดคำศัพท์...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center mb-6">
        <div class="bg-red-50 p-6 rounded-2xl shadow-lg max-w-sm mx-auto border border-red-200">
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <p class="text-red-700 text-base font-medium">{{ error }}</p>
        </div>
      </div>

      <!-- Game Over State -->
      <div v-else-if="gameOver" class="text-center mb-6">
        <div class="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto border border-gray-200">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">เกมจบแล้ว! 🎉</h3>
          <div class="bg-yellow-50 rounded-xl p-4 mb-4">
            <p class="text-lg font-bold text-yellow-700">
              คะแนนของคุณ: {{ score }}
            </p>
          </div>
          <button
            class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            @click="restartGame"
          >
            🎮 เริ่มเกมใหม่
          </button>
        </div>
      </div>

      <!-- No Words Available -->
      <div v-else-if="!currentWord" class="text-center mb-6">
        <div class="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto border border-gray-200">
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-yellow-700 text-base font-medium">ไม่สามารถโหลดคำศัพท์ได้</p>
        </div>
      </div>

      <!-- Score Display (during game) -->
      <div v-else class="text-center mb-6">
        <div class="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200 inline-block">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-lg font-bold text-green-700">
              คะแนน: {{ score }}
            </span>
          </div>
        </div>
      </div>

      <!-- Word Display -->
      <div v-if="!isLoading && !error && !gameOver && currentWord" class="text-center">
        <div class="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-lg mx-auto">
          <!-- Chinese Character -->
          <div class="mb-6">
            <div class="bg-red-50 p-6 rounded-xl border border-red-200">
              <h2 class="text-4xl sm:text-5xl font-bold text-red-700 mb-2 drop-shadow-sm">{{ currentWord.chinese }}</h2>
            </div>
          </div>

          <!-- Pronunciation Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-blue-100 text-xs font-bold">拼</span>
                </div>
                <span class="text-gray-600 text-sm font-medium">พินอิน</span>
              </div>
              <p class="text-lg font-bold text-blue-700">{{ currentWord.pinyin }}</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg border border-green-200">
              <div class="flex items-center gap-2 mb-1">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span class="text-green-100 text-xs font-bold">ไท</span>
                </div>
                <span class="text-gray-600 text-sm font-medium">คำอ่านไทย</span>
              </div>
              <p class="text-lg font-bold text-green-700">{{ currentWord.thai_pronunciation }}</p>
            </div>
          </div>

          <!-- Answer Options -->
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-gray-800 mb-4">เลือกคำแปลที่ถูกต้อง:</h3>
            <div class="space-y-3">
              <button
                v-for="(option, index) in options"
                :key="option"
                class="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md text-left"
                @click="checkAnswer(option)"
              >
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <span class="text-base font-semibold text-gray-800">
                    {{ option }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store';

export default {
  setup() {
    const authStore = useAuthStore();
    const words = ref([]);
    const currentWord = ref(null);
    const options = ref([]);
    const score = ref(0);
    const gameOver = ref(false);
    const isLoading = ref(false);
    const error = ref('');

    // Fetch vocabulary data from backend
    const fetchWords = async () => {
      if (!authStore.token) {
        error.value = 'กรุณาเข้าสู่ระบบเพื่อเล่นเกม';
        console.error('No token available');
        isLoading.value = false;
        return;
      }
      isLoading.value = true;
      error.value = '';
      try {
        console.log('Fetching words from:', import.meta.env.VITE_API_URL + '/words');
        console.log('Using token:', authStore.token);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        words.value = response.data.map(word => ({
          ...word,
          id: word._id // Map _id to id for consistency
        }));
        console.log('Fetched words:', words.value.length);
        if (words.value.length > 0) {
          selectRandomWord();
        } else {
          error.value = 'ไม่มีคำศัพท์ในฐานข้อมูล';
          console.log('No words found in database');
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'ไม่สามารถดึงคำศัพท์ได้';
        console.error('Fetch words error:', err.response?.data || err.message);
      } finally {
        isLoading.value = false;
      }
    };

    // Select a random word and generate options
    const selectRandomWord = () => {
      if (words.value.length === 0) {
        error.value = 'ไม่มีคำศัพท์ให้เลือก';
        console.log('No words available to select');
        currentWord.value = null;
        options.value = [];
        return;
      }
      const randomIndex = Math.floor(Math.random() * words.value.length);
      currentWord.value = words.value[randomIndex];
      console.log('Selected word:', currentWord.value?.chinese);

      // Generate options: correct answer and one random wrong answer
      const correctAnswer = currentWord.value.thai_meaning;
      let wrongAnswer;
      do {
        const wrongIndex = Math.floor(Math.random() * words.value.length);
        wrongAnswer = words.value[wrongIndex].thai_meaning;
      } while (wrongAnswer === correctAnswer || !wrongAnswer);

      options.value = [correctAnswer, wrongAnswer].sort(() => Math.random() - 0.5);
      console.log('Options:', options.value);
    };

    // Check user's answer
    const checkAnswer = (selectedOption) => {
      if (selectedOption === currentWord.value.thai_meaning) {
        score.value += 1;
        console.log('Correct! New score:', score.value);
        selectRandomWord();
      } else {
        gameOver.value = true;
        console.log('Wrong! Game over. Final score:', score.value);
      }
    };

    // Restart game
    const restartGame = () => {
      score.value = 0;
      gameOver.value = false;
      selectRandomWord();
      console.log('Game restarted');
    };

    onMounted(() => {
      fetchWords();
    });

    return {
      authStore,
      words,
      currentWord,
      options,
      score,
      gameOver,
      isLoading,
      error,
      checkAnswer,
      restartGame
    };
  }
};
</script>