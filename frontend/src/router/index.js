
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ChangePassword from '../views/ChangePassword.vue';
import { useAuthStore } from '../store';
import VocabularyDisplay from '../views/VocabularyDisplay.vue';
import ProfileView from '../views/ProfileView.vue';
import GameView from '../views/GameView.vue';
import AdminView from '@/views/AdminView.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { requiresAuth: true }
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: VocabularyDisplay,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }
  
  // If user is authenticated and trying to access login/register, redirect to home
  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    next('/');
    return;
  }

  // Check if route requires admin role
  if (to.meta.requiresAdmin && (!authStore.isAuthenticated || authStore.user.role !== 'admin')) {
    next('/'); // Redirect to home if not admin
    return;
  }
  
  next();
});

export default router;
