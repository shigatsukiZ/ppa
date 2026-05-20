<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const unreadCount = ref(3)

const isActive = (path) => route.path === path

const items = [
  { path: '/home', label: '首页', icon: 'home-smile-linear', activeIcon: 'home-smile-bold' },
  { path: '/social', label: '发现', icon: 'users-group-rounded-linear', activeIcon: 'users-group-rounded-bold' },
  { path: '/notifications', label: '通知', icon: 'bell-linear', activeIcon: 'bell-bold', badge: true },
  { path: '/mall', label: '商城', icon: 'bag-heart-linear', activeIcon: 'bag-heart-bold' },
]

const navigate = (item) => {
  if (route.path !== item.path) router.push(item.path)
}
</script>

<template>
  <nav class="absolute bottom-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-lg border-t border-[#F0F0F0] flex items-center justify-around z-10">
    <div
      v-for="item in items"
      :key="item.path"
      class="flex flex-col items-center gap-0.5 w-12 cursor-pointer"
      :class="isActive(item.path) ? 'text-[#FF85A2]' : 'text-gray-300'"
      @click="navigate(item)"
    >
      <div class="relative">
        <iconify-icon
          class="text-2xl"
          :icon="`solar:${isActive(item.path) ? item.activeIcon : item.icon}`"
        ></iconify-icon>
        <span
          v-if="item.badge && unreadCount > 0"
          class="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 flex items-center justify-center bg-[#FF3B30] text-white text-[9px] font-bold rounded-full leading-none"
        >{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </div>
      <span class="text-[9px]" :class="isActive(item.path) ? 'font-bold' : ''">{{ item.label }}</span>
    </div>
  </nav>
</template>
