<template>
  <nav class="bg-red-600 shadow-lg border-b-4 border-yellow-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <router-link 
          to="/" 
          class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity duration-300 flex-shrink-0"
        >
          <div class="bg-yellow-400 p-1.5 sm:p-2 rounded-lg shadow-md">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 fill-red-600" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="hidden xs:block sm:block">
            <h1 class="text-lg sm:text-xl font-bold tracking-wide text-white">中泰词典</h1>
            <p class="text-xs text-yellow-200 -mt-1 hidden sm:block">Chinese-Thai Dictionary</p>
          </div>
          <!-- Mobile only title -->
          <div class="block xs:hidden">
            <h1 class="text-base font-bold text-white">中泰词典</h1>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6 desktop-menu">
          <!-- Debug: Test div to ensure rendering -->
          
          <!-- หน้าหลัก -->
          <router-link 
            to="/" 
            class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
            :class="$route.path === '/' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
          >
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            หน้าหลัก
          </router-link>

          <!-- คำศัพท์ -->
          <router-link 
            to="/vocabulary" 
            class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
            :class="$route.path === '/vocabulary' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
          >
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01-1-1V5a1 1 0 011-1h3zM6 7v10h8V7H6z"/>
            </svg>
            คำศัพท์
          </router-link>

          <!-- โปรไฟล์ (เมื่อ login แล้ว) -->
          <router-link 
            v-if="isAuthenticated" 
            to="/profile" 
            class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
            :class="$route.path === '/profile' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
          >
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
            โปรไฟล์
          </router-link>

          <router-link 
            to="/game" 
            class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
            :class="$route.path === '/game' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
          >
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01-1-1V5a1 1 0 011-1h3zM6 7v10h8V7H6z"/>
            </svg>
            เกมทายคำศัพท์
          </router-link>

          <!-- เปลี่ยนรหัสผ่าน -->
          <router-link 
            v-if="isAuthenticated" 
            to="/change-password" 
            class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
            :class="$route.path === '/change-password' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
          >
            <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            เปลี่ยนรหัสผ่าน
          </router-link>

          <!-- User Menu (เมื่อ login แล้ว) -->
          <div v-if="isAuthenticated" class="relative" ref="userMenu">
            <button 
              @click="toggleUserMenu"
              class="flex items-center space-x-2 bg-red-700 hover:bg-red-800 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 fill-red-600" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <svg class="w-4 h-4 fill-white transition-transform duration-200" :class="{ 'rotate-180': showUserMenu }" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-show="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
            >
              <button 
                @click="logout"
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-3 fill-current" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>

          <!-- Auth Links (เมื่อยังไม่ได้ login) -->
          <div v-else class="flex items-center space-x-4">
            <router-link 
              to="/login" 
              class="flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-red-700"
              :class="$route.path === '/login' ? 'bg-red-800 text-yellow-300 shadow-lg' : 'text-white hover:text-yellow-200'"
            >
              เข้าสู่ระบบ
            </router-link>
            <router-link 
              to="/register" 
              class="bg-yellow-400 hover:bg-yellow-500 text-red-800 font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              สมัครสมาชิก
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden focus:outline-none p-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6 stroke-white" fill="none" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="showMobileMenu"
        class="md:hidden bg-red-700 rounded-lg mt-2 shadow-lg border-t border-red-500 overflow-hidden mobile-menu"
      >
        <div class="px-3 sm:px-4 py-3 space-y-2">
          <!-- หน้าหลัก -->
          <router-link 
            to="/" 
            @click="closeMobileMenu"
            class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
            :class="$route.path === '/' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
          >
            <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span>หน้าหลัก</span>
          </router-link>

          <!-- คำศัพท์ -->
          <router-link 
            to="/vocabulary" 
            @click="closeMobileMenu"
            class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
            :class="$route.path === '/vocabulary' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
          >
            <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01-1-1V5a1 1 0 011-1h3zM6 7v10h8V7H6z"/>
            </svg>
            <span>คำศัพท์</span>
          </router-link>

          <router-link 
            to="/game" 
            @click="closeMobileMenu"
            class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
            :class="$route.path === '/game' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
          >
            <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 01-1-1V5a1 1 0 011-1h3zM6 7v10h8V7H6z"/>
            </svg>
            <span>เกมทายคำศัพท์คำศัพท์</span>
          </router-link>

          <!-- โปรไฟล์ (เมื่อ login แล้ว) -->
          <router-link 
            v-if="isAuthenticated" 
            to="/profile" 
            @click="closeMobileMenu"
            class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
            :class="$route.path === '/profile' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
          >
            <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
            <span>โปรไฟล์</span>
          </router-link>

          <!-- เปลี่ยนรหัสผ่าน (เมื่อ login แล้ว) -->
          <router-link 
            v-if="isAuthenticated" 
            to="/change-password" 
            @click="closeMobileMenu"
            class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
            :class="$route.path === '/change-password' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
          >
            <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
            <span>เปลี่ยนรหัสผ่าน</span>
          </router-link>

          <!-- Logout (เมื่อ login แล้ว) -->
          <div v-if="isAuthenticated" class="border-t border-red-500 pt-3 mt-3">
            <button 
              @click="logout"
              class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center w-full text-white hover:text-yellow-200 hover:bg-red-800 text-sm sm:text-base"
            >
              <svg class="w-4 h-4 mr-3 fill-current flex-shrink-0" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
              </svg>
              <span>ออกจากระบบ</span>
            </button>
          </div>

          <!-- Auth Links (เมื่อยังไม่ login) -->
          <div v-else class="space-y-2 border-t border-red-500 pt-3 mt-3">
            <router-link 
              to="/login" 
              @click="closeMobileMenu"
              class="block px-3 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center text-sm sm:text-base"
              :class="$route.path === '/login' ? 'bg-red-800 text-yellow-300' : 'text-white hover:text-yellow-200 hover:bg-red-800'"
            >
              <span>เข้าสู่ระบบ</span>
            </router-link>
            <router-link 
              to="/register" 
              @click="closeMobileMenu"
              class="block bg-yellow-400 hover:bg-yellow-500 text-red-800 font-medium px-4 py-3 rounded-lg transition-colors duration-200 text-center text-sm sm:text-base"
            >
              สมัครสมาชิก
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../store'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const showMobileMenu = ref(false)
    const showUserMenu = ref(false)
    const userMenu = ref(null)

    // Debug logs
    console.log('isAuthenticated:', authStore.isAuthenticated)
    console.log('Navbar Initialized')

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
      console.log('Mobile Menu Toggled:', showMobileMenu.value)
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
      console.log('Mobile Menu Closed')
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
      console.log('User Menu Toggled:', showUserMenu.value)
    }

    const logout = async () => {
      authStore.logout()
      showUserMenu.value = false
      showMobileMenu.value = false
      console.log('Logged Out')
      // Navigate to login page
      await router.push('/login')
    }

    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (userMenu.value && !userMenu.value.contains(event.target)) {
        showUserMenu.value = false
        console.log('User Menu Closed (Click Outside)')
      }
    }

    // Close menus when route changes
    const handleRouteChange = () => {
      showMobileMenu.value = false
      showUserMenu.value = false
      console.log('Menus Closed (Route Change)')
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
      window.addEventListener('popstate', handleRouteChange)
      console.log('Navbar Mounted')
      // Debug screen size
      console.log('Window Width:', window.innerWidth)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('popstate', handleRouteChange)
      console.log('Navbar Unmounted')
    })

    return {
      isAuthenticated: authStore.isAuthenticated,
      showMobileMenu,
      showUserMenu,
      userMenu,
      toggleMobileMenu,
      closeMobileMenu,
      toggleUserMenu,
      logout
    }
  }
}
</script>

<style scoped>
/* Custom breakpoint for very small screens */
@media (min-width: 475px) {
  .xs\:block {
    display: block;
  }
  .xs\:hidden {
    display: none;
  }
}

/* Force desktop menu visibility */
@media (min-width: 768px) {
  .desktop-menu {
    display: flex !important;
  }
}

/* Force mobile menu visibility */
@media (max-width: 767.98px) {
  .mobile-menu {
    display: block !important;
  }
}
</style>