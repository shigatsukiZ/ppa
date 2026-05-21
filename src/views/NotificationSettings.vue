<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const toggles = ref({
  like: true,
  comment: true,
  follow: true,
  system: true,
  chatSound: false,
  chatVibrate: true,
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-bold text-[#5D4037]">消息通知</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">推送通知</h3>
          <div class="space-y-1">
            <div v-for="(_, key) in toggles" :key="key" v-show="['like', 'comment', 'follow', 'system'].includes(key)"
              class="flex items-center justify-between py-2.5 px-1">
              <div>
                <span class="text-sm font-bold text-[#5D4037]">{{ { like: '赞和收藏', comment: '评论和@', follow: '新关注', system: '系统通知' }[key] }}</span>
              </div>
              <button class="w-11 h-6 rounded-full transition-colors relative" :class="toggles[key] ? 'bg-[#FF85A2]' : 'bg-gray-200'" @click="toggles[key] = !toggles[key]">
                <div class="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" :class="toggles[key] ? 'translate-x-[22px]' : 'translate-x-0.5'"></div>
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">聊天设置</h3>
          <div class="space-y-1">
            <div v-for="(_, key) in toggles" :key="key" v-show="['chatSound', 'chatVibrate'].includes(key)"
              class="flex items-center justify-between py-2.5 px-1">
              <div>
                <span class="text-sm font-bold text-[#5D4037]">{{ { chatSound: '消息提示音', chatVibrate: '消息振动' }[key] }}</span>
              </div>
              <button class="w-11 h-6 rounded-full transition-colors relative" :class="toggles[key] ? 'bg-[#FF85A2]' : 'bg-gray-200'" @click="toggles[key] = !toggles[key]">
                <div class="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" :class="toggles[key] ? 'translate-x-[22px]' : 'translate-x-0.5'"></div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
