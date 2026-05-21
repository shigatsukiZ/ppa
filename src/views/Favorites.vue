<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const favoriteItems = ref([
  { id: 1, name: '天然无谷猫粮 鸡肉配方', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥128.0', tag: '热卖', sales: '2.3k', tagColor: '#FFD1DC', tagTextColor: '#FF85A2' },
  { id: 2, name: '狗狗磨牙棒 大号耐咬', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥39.9', tag: '新品', sales: '1.1k', tagColor: '#E8F5E9', tagTextColor: '#4CAF50' },
  { id: 3, name: '宠物智能饮水机', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥199.0', tag: '爆款', sales: '5.6k', tagColor: '#FFF3E0', tagTextColor: '#FF9800' },
  { id: 4, name: '猫咪逗猫棒 羽毛款', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥19.9', tag: '热卖', sales: '8.2k', tagColor: '#FFD1DC', tagTextColor: '#FF85A2' },
  { id: 5, name: '宠物外出便携包', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥89.0', tag: '新品', sales: '632', tagColor: '#E8F5E9', tagTextColor: '#4CAF50' },
  { id: 6, name: '狗狗衣服 秋冬款', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg', price: '¥59.9', tag: '热卖', sales: '3.4k', tagColor: '#FFD1DC', tagTextColor: '#FF85A2' },
])
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-black text-[#5D4037]">我的收藏</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
        <div class="grid grid-cols-2 gap-3">
          <div v-for="p in favoriteItems" :key="p.id"
            class="bg-white rounded-[20px] p-2.5 creamy-shadow border border-[#FFF5F7] cursor-pointer hover:shadow-lg transition-shadow"
            @click="router.push('/product/' + p.id)">
            <img :src="p.img" class="w-full aspect-square rounded-xl object-cover mb-2"/>
            <h4 class="text-[11px] font-bold text-[#5D4037] truncate">{{ p.name }}</h4>
            <div class="flex items-center gap-1 my-1">
              <span class="text-[8px] px-1.5 py-0.5 rounded font-medium" :style="{ background: p.tagColor, color: p.tagTextColor }">{{ p.tag }}</span>
              <span class="text-[8px] text-gray-300">已售 {{ p.sales }}</span>
            </div>
            <div class="flex justify-between items-center mt-0.5">
              <span class="text-[#FF85A2] font-black text-xs">{{ p.price }}</span>
              <button class="w-6 h-6 rounded-full flex items-center justify-center bg-[#FF85A2] text-white text-xs" @click.stop="router.push('/product/' + p.id)">
                <iconify-icon icon="solar:cart-large-minimalistic-bold"></iconify-icon>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
