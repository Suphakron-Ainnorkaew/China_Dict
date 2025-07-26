import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
  token: localStorage.getItem('token') || null,
  user: (() => {
    const userData = localStorage.getItem('user');
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      localStorage.removeItem('user'); // ลบข้อมูลที่เสียหาย
      return null;
    }
    })()
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isProUser: (state) => state.user?.role === 'pro'
  },
  actions: {
    async login(credentials) {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
      console.log('Response:', response.data);
      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
      return response.data;
    },
    async register(userData) {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, userData);
      this.token = response.data.token;
      this.user = response.data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    async changePassword(data) {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/change-password`,
        data,
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
});