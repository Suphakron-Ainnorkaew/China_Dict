<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
    <!-- Card Header -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold">{{ word.chinese }}</h3>
      </div>
      <p class="text-indigo-100 text-sm mt-1">{{ word.pinyin }}</p>
    </div>

    <!-- Card Body -->
    <div class="p-4 space-y-3">
      <!-- Thai Meaning -->
      <div class="border-l-4 border-indigo-200 pl-3">
        <p class="text-lg font-semibold text-gray-800">{{ word.thai_meaning }}</p>
        <p class="text-sm font-semibold">({{ word.thai_pronunciation }})</p>
      </div>

      <!-- Grammar Info -->
      <div class="flex flex-wrap gap-2">
        <span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          {{ word.part_of_speech }}
        </span>
        <span v-if="word.category" class="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
          {{ word.category }}
        </span>
      </div>

      <!-- Examples -->
      <div v-if="word.example_usage && word.example_usage.length" class="border-t pt-3">
        <p class="text-sm font-medium text-gray-700 mb-2">ตัวอย่างการใช้:</p>
        <div class="space-y-2">
          <div v-for="example in word.example_usage.slice(0, 2)" :key="example" class="bg-gray-50 p-2 rounded text-xs text-gray-600 leading-relaxed">
            {{ example }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: Object,
      required: true
    }
  }
};
</script>