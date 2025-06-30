<template>
  <div class="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">
    <h2 class="text-2xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
      <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      โปรไฟล์ผู้ใช้
    </h2>
    <div v-if="user" class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
          {{ user.username.charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="text-lg font-semibold text-gray-800">{{ user.username }}</div>
          <div class="text-sm text-gray-500">{{ user.email }}</div>
        </div>
      </div>
      <div class="border-t pt-4 space-y-2">
        <div class="text-gray-700"><span class="font-medium">ชื่อผู้ใช้:</span> {{ user.username }}</div>
        <div class="text-gray-700"><span class="font-medium">อีเมล:</span> {{ user.email }}</div>
        <div class="text-gray-700"><span class="font-medium">เพศ:</span> {{ user.gender || '-' }}</div>
        <div class="text-gray-700"><span class="font-medium">อายุ:</span> {{ user.age ?? '-' }}</div>
        <div class="text-gray-700"><span class="font-medium">สถานะ:</span> {{ user.role === 'pro' ? 'Pro' : 'ทั่วไป' }}</div>
        <div class="text-gray-700"><span class="font-medium">วันที่สมัคร:</span> {{ formatDate(user.created_at) }}</div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">ไม่พบข้อมูลผู้ใช้</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useAuthStore } from '../store';

export default {
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const formatDate = (dateStr) => {
      if (!dateStr) return '-';
      // Handle both Date object and ISO string
      try {
        const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
      } catch {
        return '-';
      }
    };
    return { user, formatDate };
  }
};
</script>

<style scoped>
</style>
