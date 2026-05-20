<script setup>
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="px-6 pt-6 pb-4 flex items-center gap-4">
        <button @click="router.push('/home')" class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100">
          <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="text-xl font-bold text-[#5D4037]">账号安全</h1>
      </header>

      <main class="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar">
        <div class="bg-white rounded-2xl p-5 creamy-shadow mb-4">
          <div class="flex justify-between items-center">
            <div>
              <span class="block text-sm text-gray-400">绑定手机号</span>
              <span class="mt-1 text-sm font-bold text-[#5D4037]">138****1234</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 creamy-shadow mb-6">
          <button class="w-full text-sm font-bold text-red-500">注销账号</button>
        </div>

        <h2 class="text-sm font-bold text-[#5D4037] mb-3">登录设备管理</h2>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center gap-3 mb-2">
          <img src="https://picsum.photos/200/200?random=1" class="w-10 h-10 rounded-full object-cover">
          <div class="flex-1">
            <span class="block text-sm font-bold text-[#5D4037]">元宝麻麻</span>
            <span class="text-xs text-gray-400">138****1234</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center gap-3 mb-4">
          <img src="https://picsum.photos/200/200?random=2" class="w-10 h-10 rounded-full object-cover">
          <div class="flex-1">
            <span class="block text-sm font-bold text-[#5D4037]">饭团爸爸</span>
            <span class="text-xs text-gray-400">139****5678</span>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center justify-between">
          <span class="text-sm font-bold text-[#5D4037]">新增账号</span>
          <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <iconify-icon icon="solar:add-bold" class="text-gray-400"></iconify-icon>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  </div>
</template>
