<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const navHidden = ref(false)
let lastScrollTop = 0

const onMainScroll = (e) => {
  const st = e.target.scrollTop
  if (st < lastScrollTop) navHidden.value = false
  else if (st > lastScrollTop && st > 10) navHidden.value = true
  lastScrollTop = st
}

const showClearModal = ref(false)
const clearDone = ref(false)

const settingsList = [
  { icon: 'solar:shield-user-bold', iconBg: '#E6E6FA', label: '账号安全', desc: '绑定手机号 · 登录设备管理', route: '/setting' },
  { icon: 'solar:user-id-bold', iconBg: '#FFD1DC', label: '个人信息', desc: '查看/编辑个人资料', route: '/profile-edit' },
  { icon: 'solar:bell-bold', iconBg: '#FFF3E0', label: '消息通知', desc: '通知偏好设置', route: '/notification-settings' },
  { icon: 'solar:lock-bold', iconBg: '#E8F5E9', label: '隐私设置', desc: '账号隐私与安全', route: '/privacy-settings' },
  { icon: 'solar:chat-round-line-bold', iconBg: '#E3F2FD', label: '帮助与反馈', desc: '常见问题 · 联系客服', route: '/help-feedback' },
]

const confirmClear = () => {
  localStorage.clear()
  showClearModal.value = false
  clearDone.value = true
  setTimeout(() => { clearDone.value = false }, 1800)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">设置</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3" @scroll="onMainScroll">
        <div class="flex items-center gap-3 p-4 rounded-[28px] bg-white creamy-shadow mb-2 cursor-pointer" @click="router.push('/user')">
          <img class="w-14 h-14 rounded-full object-cover border-2 border-[#FFD1DC]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg" alt="avatar"/>
          <div class="flex-1 min-w-0">
            <h2 class="text-base font-black text-[#5D4037]">元宝麻麻</h2>
            <p class="text-[10px] text-gray-400">查看个人主页</p>
          </div>
          <iconify-icon class="text-gray-300 text-lg" icon="solar:alt-arrow-right-linear"></iconify-icon>
        </div>

        <div class="bg-white rounded-[28px] p-3 creamy-shadow">
          <div v-for="(item, idx) in settingsList" :key="idx"
            class="flex items-center gap-3 px-2 py-3 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors"
            :class="idx < settingsList.length - 1 ? 'border-b border-[#F5F5F5]' : ''"
            @click="item.route && router.push(item.route)">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :style="{ background: item.iconBg }">
              <iconify-icon class="text-base" style="color:#5D4037" :icon="item.icon"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <span class="block text-sm font-bold text-[#5D4037]">{{ item.label }}</span>
              <span class="block text-[10px] text-gray-400">{{ item.desc }}</span>
            </div>
            <iconify-icon class="text-gray-300 shrink-0" icon="solar:alt-arrow-right-linear"></iconify-icon>
          </div>
        </div>

        <button class="w-full bg-white rounded-[28px] p-4 creamy-shadow flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors" @click="showClearModal = true">
          <div class="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
            <iconify-icon class="text-base text-gray-500" icon="solar:trash-bin-minimalistic-bold"></iconify-icon>
          </div>
          <span class="flex-1 text-sm font-bold text-[#5D4037] text-left">清除缓存</span>
          <iconify-icon class="text-gray-300 shrink-0" icon="solar:alt-arrow-right-linear"></iconify-icon>
        </button>

        <button class="w-full bg-white rounded-[28px] p-4 creamy-shadow text-sm font-bold text-red-400 hover:bg-red-50 transition-colors" @click="router.push('/auth')">
          退出登录
        </button>
      </main>

      <Transition name="fade">
        <div v-if="showClearModal" class="overlay z-50" @click="showClearModal = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showClearModal" class="absolute inset-0 z-50 flex items-center justify-center px-6" @click.stop>
          <div class="bg-white rounded-[28px] p-6 w-full shadow-2xl" @click.stop>
            <h3 class="text-base font-black text-[#5D4037] mb-2">清除缓存</h3>
            <p class="text-xs text-gray-400 mb-4">确定要清除所有本地缓存数据吗？此操作不可撤销。</p>
            <div class="flex gap-3">
              <button class="flex-1 py-2.5 rounded-full border border-gray-200 text-sm text-gray-400 font-bold" @click="showClearModal = false">取消</button>
              <button class="flex-1 py-2.5 rounded-full bg-[#FF85A2] text-white text-sm font-bold" @click="confirmClear">确认清除</button>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="clearDone" class="absolute inset-0 z-50 flex items-center justify-center bg-black/20">
          <div class="bg-white rounded-[28px] px-8 py-6 shadow-2xl flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-lg">✓</div>
            <span class="text-sm font-bold text-[#5D4037]">已清除</span>
          </div>
        </div>
      </Transition>

      <BottomNav :hidden="navHidden" />
    </div>
  </div>
</template>
