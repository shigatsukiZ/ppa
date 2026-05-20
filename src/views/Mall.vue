<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const showUpload = ref(false)

const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }
const goToDetail = () => { router.push('/detail') }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="px-6 py-4 flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <button class="flex-1 bg-[#FDF0F3] rounded-2xl flex items-center px-4 py-2.5 gap-2 border border-[#FFF5F7]" @click="router.push('/search')">
            <iconify-icon class="text-[#FF85A2]" icon="solar:magnifer-linear"></iconify-icon>
            <span class="bg-transparent text-sm text-gray-500 w-full text-left placeholder-[#FF85A2]/50">寻找宠爱礼包...</span>
          </button>
          <button class="relative">
            <iconify-icon class="text-2xl text-gray-400" icon="solar:cart-large-minimalistic-linear"></iconify-icon>
            <span class="absolute -top-1 -right-1 bg-[#FF85A2] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>
        </div>
        <div class="bg-[#FFF9C4] rounded-xl px-4 py-2 flex items-center gap-2">
          <iconify-icon class="text-[#D4AF37]" icon="solar:star-fall-bold"></iconify-icon>
          <span class="text-[10px] text-[#D4AF37] font-bold">全场满 99 减 20 · 仅剩 14:22:05</span>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
        <div class="flex gap-4 overflow-x-auto custom-scrollbar mb-6">
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-16 h-16 bg-[#FFD1DC] rounded-[24px] flex items-center justify-center creamy-shadow">
              <iconify-icon class="text-white text-3xl" icon="solar:bone-broken-bold"></iconify-icon>
            </div>
            <span class="text-xs font-bold text-[#5D4037]">全犬粮</span>
          </div>
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-16 h-16 bg-[#A7C7E7] rounded-[24px] flex items-center justify-center opacity-60">
              <iconify-icon class="text-white text-3xl" icon="solar:cat-bold"></iconify-icon>
            </div>
            <span class="text-xs text-gray-400">猫咪特辑</span>
          </div>
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-16 h-16 bg-[#C1E1C1] rounded-[24px] flex items-center justify-center opacity-60">
              <iconify-icon class="text-white text-3xl" icon="solar:hand-heart-bold"></iconify-icon>
            </div>
            <span class="text-xs text-gray-400">个护清洁</span>
          </div>
          <div class="flex flex-col items-center gap-2 shrink-0">
            <div class="w-16 h-16 bg-[#E6E6FA] rounded-[24px] flex items-center justify-center opacity-60">
              <iconify-icon class="text-white text-3xl" icon="solar:play-circle-bold"></iconify-icon>
            </div>
            <span class="text-xs text-gray-400">趣玩玩具</span>
          </div>
        </div>

        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-black text-[#5D4037]">本周爆款</h2>
            <span class="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Top Picks</span>
          </div>
          <div class="space-y-4">
            <div class="bg-white rounded-[32px] p-4 flex gap-4 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
              <img alt="Product" class="w-24 h-24 rounded-2xl object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/60d82fb02e44476ba601db671c90129f.jpg"/>
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 class="text-sm font-bold text-[#5D4037]">元宝定制版-多肉猫罐头</h3>
                  <p class="text-[10px] text-gray-400 mt-1">98% 高肉含量 · 无胶无谷</p>
                </div>
                <div class="flex justify-between items-end">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#FF85A2] text-xs font-bold">¥</span>
                    <span class="text-[#FF85A2] text-lg font-black">12.9</span>
                    <span class="text-[10px] text-gray-300 line-through ml-1">¥18.0</span>
                  </div>
                  <button class="bg-[#FF85A2] text-white p-2 rounded-xl">
                    <iconify-icon icon="solar:add-square-bold"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-[32px] p-4 flex gap-4 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
              <img alt="Product" class="w-24 h-24 rounded-2xl object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/60d82fb02e44476ba601db671c90129f.jpg"/>
              <div class="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 class="text-sm font-bold text-[#5D4037]">极简奶油风实木猫爬架</h3>
                  <p class="text-[10px] text-gray-400 mt-1">剑麻耐磨 · 稳固承重</p>
                </div>
                <div class="flex justify-between items-end">
                  <div class="flex items-baseline gap-1">
                    <span class="text-[#FF85A2] text-xs font-bold">¥</span>
                    <span class="text-[#FF85A2] text-lg font-black">299.0</span>
                  </div>
                  <button class="bg-[#FF85A2] text-white p-2 rounded-xl">
                    <iconify-icon icon="solar:add-square-bold"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>

            <h2 class="text-lg font-black text-[#5D4037] mb-4">猜你家主子喜欢</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
                <img alt="Item" class="w-full aspect-square rounded-2xl mb-2 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/d6cd4d8fc5b940fb8a217a1003ac5c03.jpg"/>
                <h4 class="text-[11px] font-bold text-[#5D4037] truncate">萨摩耶专用洗护套装</h4>
                <p class="text-[10px] text-[#FF85A2] font-black mt-1">¥158.0</p>
              </div>
              <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
                <img alt="Item" class="w-full aspect-square rounded-2xl mb-2 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/d6cd4d8fc5b940fb8a217a1003ac5c03.jpg"/>
                <h4 class="text-[11px] font-bold text-[#5D4037] truncate">互动电动逗猫棒</h4>
                <p class="text-[10px] text-[#FF85A2] font-black mt-1">¥45.0</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav @fab-click="fabClick" />

      <Transition name="fade">
        <div v-if="showUpload" class="overlay" @click="hideUpload"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showUpload" class="sheet">
          <div class="flex flex-col items-center gap-2 mb-6">
            <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
            <span class="text-sm font-bold text-[#5D4037]">发布动态</span>
          </div>
          <div class="flex gap-6 justify-center">
            <button class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 bg-[#FF85A2] rounded-[24px] flex items-center justify-center creamy-shadow">
                <iconify-icon class="text-white text-3xl" icon="solar:camera-bold"></iconify-icon>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">拍照</span>
            </button>
            <button class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 bg-[#A7C7E7] rounded-[24px] flex items-center justify-center creamy-shadow">
                <iconify-icon class="text-white text-3xl" icon="solar:gallery-bold"></iconify-icon>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">从相册选择</span>
            </button>
          </div>
          <button class="w-full mt-6 py-3 rounded-2xl bg-[#FDF0F3] text-[#FF85A2] text-sm font-bold" @click="hideUpload">取消</button>
        </div>
      </Transition>
    </div>
  </div>
</template>
