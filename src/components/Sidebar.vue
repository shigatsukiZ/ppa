<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="overlay z-30" @click="close"></div>
  </Transition>
  <Transition name="slide-right">
    <div v-if="show" class="absolute left-0 top-0 bottom-0 w-[280px] z-40 bg-white flex flex-col pt-10 shadow-2xl rounded-[32px]" @click.stop>
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 pt-4 pb-3">
          <div class="flex items-center gap-3 mb-3">
            <div class="relative">
              <img class="w-16 h-16 rounded-full object-cover ring-2 ring-[#FFD1DC] cursor-pointer" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg" alt="avatar" @click="router.push('/profile/元宝麻麻'); close"/>
              <div class="absolute -bottom-1 -right-1 bg-[#A7C7E7] text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                <iconify-icon class="text-[8px]" icon="solar:check-read-bold"></iconify-icon>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-base font-black text-[#5D4037] cursor-pointer" @click="router.push('/profile/元宝麻麻'); close">元宝麻麻</h2>
              <p class="text-[9px] text-gray-400 flex items-center gap-1">
                元仔ID: 20260428 <iconify-icon class="text-[9px] cursor-pointer" icon="solar:copy-linear" @click="close"></iconify-icon>
              </p>
            </div>
          </div>
          <div class="flex gap-4 text-xs">
            <span class="text-gray-400"><b class="text-[#5D4037]">128</b> 关注</span>
            <span class="text-gray-400"><b class="text-[#5D4037]">3.5k</b> 粉丝</span>
            <span class="text-gray-400"><b class="text-[#5D4037]">892</b> 获赞</span>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-[#F5F5F5]">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xs font-black text-[#5D4037]">我的宠物档案</h3>
            <button class="text-[#FF85A2] text-[9px] font-bold flex items-center gap-1" @click="router.push('/post-edit'); close">
              <iconify-icon icon="solar:add-circle-linear"></iconify-icon>添加
            </button>
          </div>
          <div class="flex gap-3 overflow-x-auto custom-scrollbar">
            <div class="shrink-0 w-32 p-3 rounded-[24px] flex flex-col items-center cursor-pointer transition-opacity hover:opacity-90" style="border:3px solid #FFD1DC;background:#FFF5F7" @click="close">
              <img class="w-12 h-12 rounded-full border-2 border-white mb-1 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/9db4ef934a764915b9babc24b74a33e4.jpg" alt="pet"/>
              <h3 class="text-[11px] font-bold text-[#5D4037]">萨摩耶·元宝</h3>
              <span class="text-[8px] bg-white text-[#FF85A2] px-2 py-0.5 rounded-full mt-1 font-bold">当前身份</span>
            </div>
            <div class="shrink-0 w-32 p-3 rounded-[24px] flex flex-col items-center bg-white border border-gray-100 cursor-pointer transition-opacity hover:opacity-80" @click="close">
              <img class="w-12 h-12 rounded-full border-2 border-white mb-1 object-cover opacity-50" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/df08b7ec8be74879831b12017bce837e.jpg" alt="pet"/>
              <h3 class="text-[11px] font-bold text-gray-400">英短·饭团</h3>
              <span class="text-[8px] text-[#FF85A2] mt-1 font-bold">点击切换</span>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-[#F5F5F5]">
          <div class="grid grid-cols-2 gap-2">
            <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50" @click="router.push('/order'); close">
              <div class="w-9 h-9 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white shrink-0">
                <iconify-icon class="text-lg" icon="solar:wallet-bold"></iconify-icon>
              </div>
              <div class="text-left min-w-0">
                <span class="block text-[11px] font-bold text-[#5D4037]">我的订单</span>
                <span class="text-[8px] text-gray-400">2个待收货</span>
              </div>
            </button>
            <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50 cursor-pointer" @click="close">
              <div class="w-9 h-9 bg-[#A7C7E7] rounded-xl flex items-center justify-center text-white shrink-0">
                <iconify-icon class="text-lg" icon="solar:star-bold"></iconify-icon>
              </div>
              <div class="text-left min-w-0">
                <span class="block text-[11px] font-bold text-[#5D4037]">我的收藏</span>
                <span class="text-[8px] text-gray-400">45个宝贝</span>
              </div>
            </button>
            <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50 cursor-pointer" @click="close">
              <div class="w-9 h-9 bg-[#C1E1C1] rounded-xl flex items-center justify-center text-white shrink-0">
                <iconify-icon class="text-lg" icon="solar:chat-round-bold"></iconify-icon>
              </div>
              <div class="text-left min-w-0">
                <span class="block text-[11px] font-bold text-[#5D4037]">消息中心</span>
                <span class="text-[8px] text-gray-400">99+ 未读</span>
              </div>
            </button>
            <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50" @click="router.push('/setting'); close">
              <div class="w-9 h-9 bg-[#E6E6FA] rounded-xl flex items-center justify-center text-white shrink-0">
                <iconify-icon class="text-lg" icon="solar:shield-user-bold"></iconify-icon>
              </div>
              <div class="text-left min-w-0">
                <span class="block text-[11px] font-bold text-[#5D4037]">账号安全</span>
                <span class="text-[8px] text-gray-400">已实名认证</span>
              </div>
            </button>
          </div>
        </div>

        <div class="mx-4 mb-3 p-3 rounded-[24px] bg-[#F0F7FF]/50 border border-[#F0F7FF]">
          <div class="flex items-center gap-1.5 mb-2">
            <iconify-icon class="text-[#A7C7E7] text-sm" icon="solar:magic-stick-3-bold"></iconify-icon>
            <span class="text-[11px] font-black text-[#5D4037]">元宝的专属好物</span>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 bg-white rounded-xl p-2 flex items-center gap-2" @click="router.push('/detail'); close">
              <img class="w-8 h-8 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg" alt="product"/>
              <div class="min-w-0">
                <span class="block text-[9px] font-bold text-[#5D4037] truncate">萨摩耶泪痕清理液</span>
                <span class="text-[9px] text-[#FF85A2] font-black">¥48.0</span>
              </div>
            </button>
            <button class="flex-1 bg-white rounded-xl p-2 flex items-center gap-2" @click="router.push('/detail'); close">
              <img class="w-8 h-8 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg" alt="product"/>
              <div class="min-w-0">
                <span class="block text-[9px] font-bold text-[#5D4037] truncate">耐咬大骨头</span>
                <span class="text-[9px] text-[#FF85A2] font-black">¥19.9</span>
              </div>
            </button>
          </div>
        </div>

        <div class="px-4 py-3 border-t border-[#F0F0F0]">
          <button class="w-full py-2.5 rounded-xl bg-[#FDF0F3] text-[#FF85A2] text-sm font-bold" @click="router.push('/auth'); close">
            退出登录
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
