<script setup>
import { ref, onMounted } from 'vue'

const order = ref({
  name: '', spec: '', qty: 0, price: 0, total: 0, img: ''
})

onMounted(() => {
  const data = sessionStorage.getItem('orderInfo')
  if (data) {
    order.value = JSON.parse(data)
  }
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col">
      <div class="h-10 flex justify-between items-center px-8 text-xs font-medium text-gray-500">
        <span>09:45</span>
        <div class="flex gap-1.5">
          <iconify-icon icon="solar:transmission-bold" rotate="90deg"></iconify-icon>
          <iconify-icon icon="solar:battery-charge-bold"></iconify-icon>
        </div>
      </div>
      <header class="px-6 py-4 flex items-center gap-3 border-b border-[#FFF5F7]">
        <button @click="$router.push('/detail')" class="w-9 h-9 bg-white rounded-full flex items-center justify-center creamy-shadow">
          <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="text-lg font-bold text-[#5D4037]">订单结算</h1>
      </header>
      <main class="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div class="bg-white rounded-2xl p-4 creamy-shadow mb-6">
          <div class="flex gap-3 items-center">
            <img :src="order.img" class="w-20 h-20 rounded-xl object-cover">
            <div class="flex-1">
              <p class="text-sm font-bold text-[#5D4037]">{{ order.name }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ order.spec }}</p>
              <div class="flex justify-between items-center mt-2">
                <p class="text-[#FF85A2] font-bold text-sm">¥<span>{{ order.price }}</span></p>
                <p class="text-xs text-gray-400">x <span>{{ order.qty }}</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl p-4 creamy-shadow mb-6">
          <h3 class="text-sm font-bold text-[#5D4037] mb-3">支付信息</h3>
          <div class="flex justify-between text-xs mb-2">
            <span class="text-gray-400">商品总价</span>
            <span class="text-[#5D4037]">¥<span>{{ order.total }}</span></span>
          </div>
          <div class="flex justify-between text-xs mb-2">
            <span class="text-gray-400">运费</span>
            <span class="text-[#5D4037]">包邮</span>
          </div>
          <div class="flex justify-between text-sm font-bold pt-2 border-t border-[#FFF5F7] mt-2">
            <span class="text-[#5D4037]">实付款</span>
            <span class="text-[#FF85A2]">¥<span>{{ order.total }}</span></span>
          </div>
        </div>
      </main>
      <div class="border-t border-[#FFF5F7] p-4 bg-white">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs text-gray-400">合计</span>
          <span class="text-[#FF85A2] font-bold text-base">¥<span>{{ order.total }}</span></span>
        </div>
        <button @click="alert('支付成功！')" class="w-full bg-[#FF85A2] text-white py-3 rounded-2xl text-sm font-bold shadow-lg shadow-pink-200">
          立即支付
        </button>
      </div>
    </div>
  </div>
</template>
