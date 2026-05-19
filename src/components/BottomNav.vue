<script setup>
import { useRoute } from 'vue-router'
defineEmits(['fab-click'])
const route = useRoute()
const isActive = (path) => route.path === path
</script>

<template>
  <nav class="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-lg border-t border-[#FFF5F7] px-6 flex justify-between items-center rounded-t-[40px] z-10">
    <router-link to="/home" class="flex flex-col items-center gap-1" :class="isActive('/home') ? 'text-[#FF85A2]' : 'text-gray-300'">
      <iconify-icon class="text-2xl" :icon="isActive('/home') ? 'solar:home-smile-bold' : 'solar:home-smile-linear'"></iconify-icon>
      <span class="text-[10px]" :class="isActive('/home') ? 'font-bold' : ''">首页</span>
    </router-link>
    <router-link to="/social" class="flex flex-col items-center gap-1" :class="isActive('/social') ? 'text-[#A7C7E7]' : 'text-gray-300'">
      <iconify-icon class="text-2xl" :icon="isActive('/social') ? 'solar:users-group-rounded-bold' : 'solar:users-group-rounded-linear'"></iconify-icon>
      <span class="text-[10px]" :class="isActive('/social') ? 'font-bold' : ''">发现</span>
    </router-link>
    <div class="relative -top-6">
      <button class="w-14 h-14 bg-gradient-to-br from-[#FFD1DC] to-[#FF85A2] rounded-full flex items-center justify-center shadow-lg shadow-pink-200 border-4 border-white" @click="$emit('fab-click')">
        <iconify-icon class="text-white text-2xl" icon="solar:add-bold"></iconify-icon>
      </button>
    </div>
    <router-link to="/mall" class="flex flex-col items-center gap-1" :class="isActive('/mall') ? 'text-[#FF85A2]' : 'text-gray-300'">
      <iconify-icon class="text-2xl" :icon="isActive('/mall') ? 'solar:bag-heart-bold' : 'solar:bag-heart-linear'"></iconify-icon>
      <span class="text-[10px]" :class="isActive('/mall') ? 'font-bold' : ''">商城</span>
    </router-link>
    <router-link to="/profile" class="flex flex-col items-center gap-1" :class="isActive('/profile') ? 'text-[#FF85A2]' : 'text-gray-300'">
      <iconify-icon class="text-2xl" :icon="isActive('/profile') ? 'solar:user-circle-bold' : 'solar:user-circle-linear'"></iconify-icon>
      <span class="text-[10px]" :class="isActive('/profile') ? 'font-bold' : ''">我的</span>
    </router-link>
  </nav>
</template>
