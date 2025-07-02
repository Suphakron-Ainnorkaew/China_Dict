<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-3 mb-4">
          <svg class="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <h1 class="text-4xl font-bold text-gray-800">Chinese Vocabulary Game</h1>
        </div>
        <p class="text-gray-600 text-lg">ทายคำแปลภาษาไทยให้ถูกเพื่อสะสมคะแนน!</p>
      </div>

      <!-- Game State -->
      <div v-if="isLoading" class="text-center mb-6">
        <p class="text-gray-600">กำลังโหลดคำศัพท์...</p>
      </div>
      <div v-else-if="error" class="text-center mb-6">
        <p class="text-red-500">{{ error }}</p>
      </div>
      <div v-else-if="gameOver" class="text-center mb-6">
        <p class="text-red-500 text-2xl font-bold">เกมจบ! คุณได้คะแนน: {{ score }}</p>
        <button
          class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          @click="restartGame"
        >
          เริ่มเกมใหม่
        </button>
      </div>
      <div v-else class="text-center mb-6">
        <p class="text-gray-600 text-lg">คะแนน: {{ score }}</p>
      </div>

      <!-- Word Display -->
      <div v-if="!isLoading && !error && !gameOver" class="text-center mb-8">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">{{ currentWord.chinese }}</h2>
          <p class="text-lg text-gray-600 mb-1">พินอิน: {{ currentWord.pinyin }}</p>
          <p class="text-lg text-gray-600 mb-4">คำอ่านไทย: {{ currentWord.thai_pronunciation }}</p>
          <div class="flex justify-center gap-4">
            <button
              v-for="option in options"
              :key="option"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              @click="checkAnswer(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const words = ref([]);
    const currentWord = ref(null);
    const options = ref([]);
    const score = ref(0);
    const gameOver = ref(false);
    const isLoading = ref(false);
    const error = ref('');

    // Fetch vocabulary data from backend
    const fetchWords = async () => {
      isLoading.value = true;
      error.value = '';
      try {
        console.log('Fetching words from:', import.meta.env.VITE_API_URL + '/words');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/words`);
        words.value = response.data.map(word => ({
          ...word,
          id: word._id // Map _id to id for consistency
        }));
        console.log('Fetched words:', words.value.length);
        selectRandomWord();
      } catch (err) {
        error.value = err.response?.data?.message || 'ไม่สามารถดึงคำศัพท์ได้';
        console.error('Fetch words error:', error.value);
      } finally {
        isLoading.value = false;
      }
    };

    // Select a random word and generate options
    const selectRandomWord = () => {
      if (words.value.length === 0) return;
      const randomIndex = Math.floor(Math.random() * words.value.length);
      currentWord.value = words.value[randomIndex];
      console.log('Selected word:', currentWord.value.chinese);

      // Generate options: correct answer and one random wrong answer
      const correctAnswer = currentWord.value.thai_meaning;
      let wrongAnswer;
      do {
        const wrongIndex = Math.floor(Math.random() * words.value.length);
        wrongAnswer = words.value[wrongIndex].thai_meaning;
      } while (wrongAnswer === correctAnswer || !wrongAnswer);
      
      // Shuffle options
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