<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 p-4 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div class="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
              <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-indigo-400 mb-2">
              汉语词汇游戏
            </h1>
            <h2 class="text-2xl font-bold text-white/90">Chinese Vocabulary Game</h2>
          </div>
        </div>
        <p class="text-white/80 text-xl font-medium bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 inline-block">
          ทายคำแปลภาษาไทยให้ถูกเพื่อสะสมคะแนน! 🎯
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center mb-8">
        <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-pink-400 mx-auto mb-4"></div>
          <p class="text-white/90 text-lg font-medium">กำลังโหลดคำศัพท์...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center mb-8">
        <div class="bg-red-500/20 backdrop-blur-md p-8 rounded-3xl border border-red-400/30 shadow-2xl max-w-md mx-auto">
          <div class="w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <p class="text-red-300 text-lg font-medium">{{ error }}</p>
        </div>
      </div>

      <!-- Game Over State -->
      <div v-else-if="gameOver" class="text-center mb-8">
        <div class="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl max-w-lg mx-auto">
          <div class="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 class="text-3xl font-bold text-white mb-4">เกมจบแล้ว! 🎉</h3>
          <div class="bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-2xl p-6 mb-6">
            <p class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
              คะแนนของคุณ: {{ score }}
            </p>
          </div>
          <button
            class="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold text-lg rounded-2xl hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            @click="restartGame"
          >
            <span class="relative z-10">🎮 เริ่มเกมใหม่</span>
            <div class="absolute inset-0 bg-gradient-to-r from-pink-400 to-violet-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>

      <!-- No Words Available -->
      <div v-else-if="!currentWord" class="text-center mb-8">
        <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md mx-auto">
          <div class="w-16 h-16 bg-yellow-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p class="text-yellow-300 text-lg font-medium">ไม่สามารถโหลดคำศัพท์ได้</p>
        </div>
      </div>

      <!-- Score Display (during game) -->
      <div v-else class="text-center mb-8">
        <div class="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-lg inline-block">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              คะแนน: {{ score }}
            </span>
          </div>
        </div>
      </div>

      <!-- Word Display -->
      <div v-if="!isLoading && !error && !gameOver && currentWord" class="text-center">
        <div class="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 max-w-2xl mx-auto">
          <!-- Chinese Character -->
          <div class="mb-8">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-violet-500/30 rounded-2xl blur-xl"></div>
              <div class="relative bg-white/20 backdrop-blur-sm p-8 rounded-2xl border border-white/30">
                <h2 class="text-6xl font-black text-white mb-4 drop-shadow-lg">{{ currentWord.chinese }}</h2>
              </div>
            </div>
          </div>

          <!-- Pronunciation Info -->
          <div class="grid md:grid-cols-2 gap-4 mb-8">
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center">
                  <span class="text-blue-400 text-xs font-bold">拼</span>
                </div>
                <span class="text-white/70 font-medium">พินอิน</span>
              </div>
              <p class="text-xl font-bold text-blue-300">{{ currentWord.pinyin }}</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center">
                  <span class="text-emerald-400 text-xs font-bold">ไท</span>
                </div>
                <span class="text-white/70 font-medium">คำอ่านไทย</span>
              </div>
              <p class="text-xl font-bold text-emerald-300">{{ currentWord.thai_pronunciation }}</p>
            </div>
          </div>

          <!-- Answer Options -->
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-white/90 mb-6">เลือกคำแปลที่ถูกต้อง:</h3>
            <div class="grid gap-4">
              <button
                v-for="(option, index) in options"
                :key="option"
                class="group relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transform hover:scale-102 transition-all duration-200 shadow-lg hover:shadow-xl"
                @click="checkAnswer(option)"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-violet-500/0 group-hover:from-pink-500/20 group-hover:to-violet-500/20 rounded-2xl transition-all duration-200"></div>
                <div class="relative flex items-center justify-center gap-3">
                  <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-white/80">
                    {{ String.fromCharCode(65 + index) }}
                  </div>
                  <span class="text-xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-200">
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