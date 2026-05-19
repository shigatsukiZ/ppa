<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const agreed = ref(false)
const phone = ref('')
const code = ref('')

const loginWithApp = (type) => {
  const name = type === 'wechat' ? '微信' : 'QQ'
  alert(`正在拉起${name} App 进行授权登录...`)
}

const showAgreeModal = ref(false)
const showEmptyModal = ref(false)
const emptyMsg = ref('')

const goHome = () => {
  if (!phone.value.trim()) { emptyMsg.value = '请输入手机号'; showEmptyModal.value = true; return }
  if (!code.value.trim()) { emptyMsg.value = '请输入验证码'; showEmptyModal.value = true; return }
  if (!agreed.value) { showAgreeModal.value = true; return }
  router.push('/home')
}

const handleAgree = () => {
  if (!phone.value.trim()) { emptyMsg.value = '请输入手机号'; showEmptyModal.value = true; showAgreeModal.value = false; return }
  if (!code.value.trim()) { emptyMsg.value = '请输入验证码'; showEmptyModal.value = true; showAgreeModal.value = false; return }
  agreed.value = true
  showAgreeModal.value = false
  router.push('/home')
}

const handleCancel = () => {
  showAgreeModal.value = false
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col items-center px-10 pt-20">
      <div class="relative mb-8">
        <div class="w-48 h-48 bg-gradient-to-b from-[#FFF5F7] to-[#FFFDF9] rounded-full flex items-center justify-center">
          <div class="mascot-float">
            <div class="w-32 h-32 bg-[#FFD1DC] rounded-[40px] flex flex-col items-center justify-center border-4 border-white creamy-shadow">
              <div class="flex gap-4 mb-2">
                <div class="w-3 h-3 bg-[#5D4037] rounded-full animate-bounce"></div>
                <div class="w-3 h-3 bg-[#5D4037] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              </div>
              <div class="w-6 h-3 border-b-4 border-[#5D4037] rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
        <iconify-icon class="absolute top-4 right-0 text-[#FF85A2] text-2xl rotate-12" icon="solar:heart-bold"></iconify-icon>
        <iconify-icon class="absolute bottom-4 left-0 text-[#FFF9C4] text-3xl -rotate-12" icon="solar:star-bold"></iconify-icon>
      </div>
      <h1 class="text-3xl font-black text-[#5D4037] mb-2">元仔宠爱</h1>
      <p class="text-sm text-gray-400 mb-12">遇见全世界最可爱的毛孩子</p>
      <div class="w-full space-y-4">
        <div class="bg-white rounded-[24px] px-6 h-[56px] creamy-shadow border border-[#FFF5F7] flex items-center gap-3">
          <iconify-icon class="text-gray-300 text-xl" icon="solar:smartphone-linear"></iconify-icon>
          <input class="flex-1 outline-none text-sm text-[#5D4037] placeholder-gray-300" placeholder="手机号" type="text" v-model="phone"/>
        </div>
        <div class="bg-white rounded-[24px] px-6 h-[56px] creamy-shadow border border-[#FFF5F7] grid grid-cols-[auto,2fr,1fr] items-center gap-3">
          <iconify-icon class="text-gray-300 text-xl" icon="solar:lock-password-linear"></iconify-icon>
          <input class="w-full outline-none text-sm text-[#5D4037] placeholder-gray-300" placeholder="验证码" type="password" v-model="code"/>
          <button class="text-[#FF85A2] text-xs font-bold whitespace-nowrap text-center bg-[#FFF5F7] rounded-xl py-2 px-2 border border-[#FFD1DC] hover:bg-[#FFE8EE] transition-colors">获取验证码</button>
        </div>
      </div>
      <button class="w-full bg-[#FF85A2] text-white py-4 rounded-[24px] font-black text-lg mt-10 shadow-lg shadow-pink-100 hover:scale-105 transition-transform" @click="goHome">
        立即开启
      </button>
      <div class="mt-auto pb-12 w-full">
        <div class="flex justify-center gap-8 mb-6">
          <button class="w-12 h-12 rounded-full bg-white creamy-shadow border border-[#FFF5F7] flex items-center justify-center" title="微信登录" @click="loginWithApp('wechat')">
            <iconify-icon class="text-[#07C160] text-2xl" icon="ri:wechat-fill"></iconify-icon>
          </button>
          <button class="w-12 h-12 rounded-full bg-white creamy-shadow border border-[#FFF5F7] flex items-center justify-center" title="QQ 登录" @click="loginWithApp('qq')">
            <iconify-icon class="text-[#12B7F5] text-2xl" icon="ri:qq-fill"></iconify-icon>
          </button>
        </div>
        <div class="flex items-center gap-2 justify-center px-6">
          <div
            class="w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors"
            :class="agreed ? 'bg-[#FF85A2] border-[#FF85A2]' : 'bg-gray-100 border-gray-200'"
            @click="agreed = !agreed"
          >
            <iconify-icon v-if="agreed" class="text-white text-xs" icon="solar:check-bold"></iconify-icon>
          </div>
          <p class="text-[10px] text-gray-300">
            登录即代表同意 <a class="text-gray-400 underline font-bold" href="#">用户协议</a> 与 <a class="text-gray-400 underline font-bold" href="#">隐私政策</a>
          </p>
        </div>
      </div>
      </div>

    <div
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity"
      :class="showEmptyModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      @click.self="showEmptyModal = false"
    >
      <div class="bg-white rounded-2xl w-72 p-6 text-center shadow-xl">
        <div class="w-12 h-12 rounded-full bg-[#FFF5F7] flex items-center justify-center mx-auto mb-4">
          <iconify-icon class="text-[#FF85A2] text-2xl" icon="solar:info-circle-bold"></iconify-icon>
        </div>
        <p class="text-sm text-gray-600 mb-6">{{ emptyMsg }}</p>
        <button
          class="w-full py-3 rounded-xl bg-[#FF85A2] text-white text-sm font-bold shadow-lg shadow-pink-100"
          @click="showEmptyModal = false"
        >确定</button>
      </div>
    </div>

    <div
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity"
      :class="showAgreeModal ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      @click.self="handleCancel"
    >
      <div class="bg-white rounded-2xl w-72 p-6 text-center shadow-xl">
        <div class="w-12 h-12 rounded-full bg-[#FFF5F7] flex items-center justify-center mx-auto mb-4">
          <iconify-icon class="text-[#FF85A2] text-2xl" icon="solar:info-circle-bold"></iconify-icon>
        </div>
        <p class="text-sm text-gray-600 mb-6">
          请先阅读并同意<a class="text-[#FF85A2] font-bold" href="#">用户协议</a>与<a class="text-[#FF85A2] font-bold" href="#">隐私政策</a>
        </p>
        <div class="flex gap-3">
          <button
            class="flex-1 py-3 rounded-xl bg-gray-100 text-gray-500 text-sm font-bold"
            @click="handleCancel"
          >取消</button>
          <button
            class="flex-1 py-3 rounded-xl bg-[#FF85A2] text-white text-sm font-bold shadow-lg shadow-pink-100"
            @click="handleAgree"
          >同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.mascot-float { animation: floating 3s ease-in-out infinite; }
@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
</style>
