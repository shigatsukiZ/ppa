<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const toggles = ref({
  onlineStatus: true,
  showLocation: false,
  allowSearch: true,
  anonymousBrowse: false,
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-bold text-[#5D4037]">隐私设置</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">隐私选项</h3>
          <div class="space-y-1">
            <div v-for="(_, key) in toggles" :key="key"
              class="flex items-center justify-between py-2.5 px-1 border-b border-[#F5F5F5] last:border-0">
              <div>
                <span class="text-sm font-bold text-[#5D4037]">{{ { onlineStatus: '在线状态', showLocation: '显示位置', allowSearch: '允许被搜索', anonymousBrowse: '匿名浏览' }[key] }}</span>
                <p class="text-[10px] text-gray-400">{{ { onlineStatus: '其他用户可以看到你的在线状态', showLocation: '在动态中显示位置信息', allowSearch: '允许其他用户通过昵称找到你', anonymousBrowse: '浏览他人主页时匿名显示' }[key] }}</p>
              </div>
              <button class="w-11 h-6 rounded-full transition-colors relative shrink-0" :class="toggles[key] ? 'bg-[#FF85A2]' : 'bg-gray-200'" @click="toggles[key] = !toggles[key]">
                <div class="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" :class="toggles[key] ? 'translate-x-[22px]' : 'translate-x-0.5'"></div>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">数据与授权</h3>
          <div class="space-y-1">
            <div class="flex items-center justify-between py-2.5 px-1 cursor-pointer">
              <span class="text-sm font-bold text-[#5D4037]">清除浏览记录</span>
              <iconify-icon class="text-gray-300" icon="solar:alt-arrow-right-linear"></iconify-icon>
            </div>
            <div class="flex items-center justify-between py-2.5 px-1 cursor-pointer">
              <span class="text-sm font-bold text-[#5D4037]">导出我的数据</span>
              <iconify-icon class="text-gray-300" icon="solar:alt-arrow-right-linear"></iconify-icon>
            </div>
            <div class="flex items-center justify-between py-2.5 px-1 cursor-pointer">
              <span class="text-sm font-bold text-red-400">注销账号</span>
              <iconify-icon class="text-gray-300" icon="solar:alt-arrow-right-linear"></iconify-icon>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
