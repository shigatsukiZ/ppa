<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const payMethod = ref('wechat')
const paying = ref(false)
const paid = ref(false)
const orderNum = 'PPA' + Date.now().toString().slice(-8)

const total = computed(() => {
  return sessionStorage.getItem('payTotal') || '388.0'
})

const pay = () => {
  paying.value = true
  setTimeout(() => {
    paying.value = false
    paid.value = true
    sessionStorage.setItem('orderInfo', JSON.stringify({
      name: '元气奶油猫窝限定套餐',
      spec: payMethod.value === 'wechat' ? '微信支付' : '支付宝支付',
      qty: 1,
      price: total.value,
      total: total.value,
      img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg',
      orderNum: orderNum,
    }))
    setTimeout(() => {
      router.push('/order')
    }, 1200)
  }, 1800)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#F8F9FA] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 bg-white border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.push('/home?tab=mall')">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">确认支付</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div class="bg-white rounded-2xl p-5 mb-4 text-center">
          <p class="text-xs text-gray-400 mb-2">支付金额</p>
          <p class="text-3xl font-black text-[#5D4037]">¥<span class="text-4xl">{{ total }}</span></p>
        </div>

        <div class="bg-white rounded-2xl p-5 mb-4">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">支付方式</h3>
          <div class="space-y-2">
            <div class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all" :class="payMethod === 'wechat' ? 'bg-[#E8F5E9] border border-[#4CAF50]' : 'bg-gray-50'" @click="payMethod = 'wechat'">
              <div class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-sm font-bold">微</div>
              <span class="flex-1 text-xs font-bold text-[#5D4037]">微信支付</span>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="payMethod === 'wechat' ? 'bg-[#4CAF50] border-[#4CAF50]' : 'border-gray-300'">
                <iconify-icon v-if="payMethod === 'wechat'" class="text-white text-[10px]" icon="solar:check-bold"></iconify-icon>
              </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all" :class="payMethod === 'alipay' ? 'bg-[#E3F2FD] border border-[#2196F3]' : 'bg-gray-50'" @click="payMethod = 'alipay'">
              <div class="w-8 h-8 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-sm font-bold">支</div>
              <span class="flex-1 text-xs font-bold text-[#5D4037]">支付宝</span>
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center" :class="payMethod === 'alipay' ? 'bg-[#2196F3] border-[#2196F3]' : 'border-gray-300'">
                <iconify-icon v-if="payMethod === 'alipay'" class="text-white text-[10px]" icon="solar:check-bold"></iconify-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4">
          <div class="flex justify-between text-xs mb-2">
            <span class="text-gray-400">订单编号</span>
            <span class="text-[#5D4037]">{{ orderNum }}</span>
          </div>
          <div class="flex justify-between text-xs mb-2">
            <span class="text-gray-400">商品总额</span>
            <span class="text-[#5D4037]">¥{{ total }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-400">运费</span>
            <span class="text-[#5D4037]">包邮</span>
          </div>
        </div>
      </main>

      <div v-if="!paid" class="shrink-0 px-4 py-3 bg-white border-t border-[#F0F0F0]">
        <button class="w-full py-3 text-sm font-bold rounded-full text-white transition-all" :class="paying ? 'bg-gray-400' : 'bg-[#FF85A2] shadow-lg shadow-pink-200/50'" :disabled="paying" @click="pay">
          <span v-if="paying">支付中...</span>
          <span v-else>确认支付 ¥{{ total }}</span>
        </button>
      </div>

      <Transition name="fade">
        <div v-if="paid" class="absolute inset-0 bg-white/90 flex flex-col items-center justify-center gap-4 z-50">
          <div class="w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-3xl animate-bounce">✓</div>
          <p class="text-lg font-black text-[#5D4037]">支付成功</p>
          <p class="text-xs text-gray-400">正在跳转订单页面...</p>
        </div>
      </Transition>
    </div>
  </div>
</template>
