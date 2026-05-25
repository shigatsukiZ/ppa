<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../../components/BottomNav.vue'

const router = useRouter()
const navHidden = ref(false)
let lastScrollTop = 0

const onMainScroll = (e) => {
  const st = e.target.scrollTop
  if (st < lastScrollTop) navHidden.value = false
  else if (st > lastScrollTop && st > 10) navHidden.value = true
  lastScrollTop = st
}

const showPhoneModal = ref(false)
const showLogoutModal = ref(false)
const showAddAccount = ref(false)
const newPhone = ref('')
const confirmDelete = ref('')

const changePhone = () => {
  if (newPhone.value.trim()) {
    showPhoneModal.value = false
    newPhone.value = ''
  }
}

const doLogout = () => {
  showLogoutModal.value = false
  router.push('/auth')
}

const doAddAccount = () => {
  showAddAccount.value = false
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="px-6 pt-6 pb-4 flex items-center gap-4">
        <button @click="router.back()" class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100">
          <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="text-xl font-bold text-[#5D4037]">账号安全</h1>
      </header>

      <main class="flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar" @scroll="onMainScroll">
        <div class="bg-white rounded-2xl p-5 creamy-shadow mb-4 cursor-pointer" @click="showPhoneModal = true">
          <div class="flex justify-between items-center">
            <div>
              <span class="block text-sm text-gray-400">绑定手机号</span>
              <span class="mt-1 text-sm font-bold text-[#5D4037]">138****1234</span>
            </div>
            <iconify-icon class="text-gray-300 text-lg" icon="solar:pen-linear"></iconify-icon>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 creamy-shadow mb-6 cursor-pointer" @click="showLogoutModal = true">
          <button class="w-full text-sm font-bold text-red-500">注销账号</button>
        </div>

        <h2 class="text-sm font-bold text-[#5D4037] mb-3">登录设备管理</h2>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center gap-3 mb-2">
          <img src="https://picsum.photos/200/200?random=1" class="w-10 h-10 rounded-full object-cover">
          <div class="flex-1">
            <span class="block text-sm font-bold text-[#5D4037]">元宝麻麻</span>
            <span class="text-xs text-gray-400">138****1234 · 当前设备</span>
          </div>
          <span class="text-[9px] text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded-full">在线</span>
        </div>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center gap-3 mb-4">
          <img src="https://picsum.photos/200/200?random=2" class="w-10 h-10 rounded-full object-cover">
          <div class="flex-1">
            <span class="block text-sm font-bold text-[#5D4037]">饭团爸爸</span>
            <span class="text-xs text-gray-400">139****5678 · 2小时前活跃</span>
          </div>
          <button class="text-[9px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">移除</button>
        </div>

        <div class="bg-white rounded-2xl p-4 creamy-shadow flex items-center justify-between cursor-pointer" @click="showAddAccount = true">
          <span class="text-sm font-bold text-[#5D4037]">新增账号</span>
          <button class="w-8 h-8 rounded-full bg-[#FF85A2] flex items-center justify-center shadow-md shadow-pink-200/40">
            <iconify-icon icon="solar:add-bold" class="text-white"></iconify-icon>
          </button>
        </div>
      </main>

      <Transition name="fade">
        <div v-if="showPhoneModal" class="overlay z-50" @click="showPhoneModal = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showPhoneModal" class="absolute inset-0 z-50 flex items-center justify-center px-6" @click.stop>
          <div class="bg-white rounded-[28px] p-6 w-full shadow-2xl" @click.stop>
            <h3 class="text-base font-black text-[#5D4037] mb-4">修改绑定手机号</h3>
            <input v-model="newPhone" placeholder="输入新手机号" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none mb-4" maxlength="11"/>
            <div class="flex gap-3">
              <button class="flex-1 py-2.5 rounded-full border border-gray-200 text-sm text-gray-400 font-bold" @click="showPhoneModal = false">取消</button>
              <button class="flex-1 py-2.5 rounded-full bg-[#FF85A2] text-white text-sm font-bold" :class="newPhone.trim() ? '' : 'opacity-50'" :disabled="!newPhone.trim()" @click="changePhone">确认修改</button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showLogoutModal" class="overlay z-50" @click="showLogoutModal = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showLogoutModal" class="absolute inset-0 z-50 flex items-center justify-center px-6" @click.stop>
          <div class="bg-white rounded-[28px] p-6 w-full shadow-2xl" @click.stop>
            <h3 class="text-base font-black text-[#5D4037] mb-2">确认注销账号？</h3>
            <p class="text-xs text-gray-400 mb-4">注销后所有数据将被清除，此操作不可撤销。</p>
            <div class="flex gap-3">
              <button class="flex-1 py-2.5 rounded-full border border-gray-200 text-sm text-gray-400 font-bold" @click="showLogoutModal = false">取消</button>
              <button class="flex-1 py-2.5 rounded-full bg-red-500 text-white text-sm font-bold" @click="doLogout">确认注销</button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showAddAccount" class="overlay z-50" @click="showAddAccount = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showAddAccount" class="absolute inset-0 z-50 flex items-center justify-center px-6" @click.stop>
          <div class="bg-white rounded-[28px] p-6 w-full shadow-2xl" @click.stop>
            <h3 class="text-base font-black text-[#5D4037] mb-4">添加新账号</h3>
            <input placeholder="请输入手机号" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none mb-3" maxlength="11"/>
            <input placeholder="请输入验证码" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none mb-4" maxlength="6"/>
            <div class="flex gap-3">
              <button class="flex-1 py-2.5 rounded-full border border-gray-200 text-sm text-gray-400 font-bold" @click="showAddAccount = false">取消</button>
              <button class="flex-1 py-2.5 rounded-full bg-[#FF85A2] text-white text-sm font-bold" @click="doAddAccount">添加</button>
            </div>
          </div>
        </div>
      </Transition>

      <BottomNav :hidden="navHidden" />
    </div>
  </div>
</template>
