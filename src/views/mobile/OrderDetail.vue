<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const order = ref({
  name: '', spec: '', qty: 0, price: 0, total: 0, img: '', orderNum: '', status: '', time: ''
})

onMounted(() => {
  const raw = localStorage.getItem('ppa_orders')
  if (raw) {
    const found = JSON.parse(raw).find(o => o.orderNum === route.params.orderNum)
    if (found) order.value = found
  }
})

const statusColor = (s) => {
  if (s === '待付款') return 'text-orange-500'
  if (s === '待发货') return 'text-blue-500'
  if (s === '待收货') return 'text-[#FF85A2]'
  if (s === '已完成') return 'text-green-500'
  return 'text-gray-400'
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">订单详情</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="flex items-center gap-2 px-4 py-3 border-b border-[#F0F0F0]">
          <span class="text-xs text-gray-400">状态</span>
          <span class="text-xs font-bold" :class="statusColor(order.status)">{{ order.status }}</span>
        </div>

        <div class="px-4 pt-4 pb-2">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">商品信息</h3>
          <div class="flex gap-3 p-3 rounded-2xl bg-[#FAFAFA]">
            <img :src="order.img" class="w-16 h-16 rounded-xl object-cover shrink-0"/>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-[#5D4037] truncate">{{ order.name }}</p>
              <p class="text-[10px] text-gray-400 mt-0.5">{{ order.spec }}</p>
              <div class="flex justify-between items-center mt-1.5">
                <span class="text-sm font-black text-[#FF85A2]">¥{{ order.price }}</span>
                <span class="text-[10px] text-gray-300">x {{ order.qty }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 pt-4 pb-2">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">订单信息</h3>
          <div class="p-3 rounded-2xl bg-[#FAFAFA] space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">订单编号</span>
              <span class="text-[#5D4037]">{{ order.orderNum }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">下单时间</span>
              <span class="text-[#5D4037]">{{ order.time }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">支付方式</span>
              <span class="text-[#5D4037]">{{ order.spec }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">商品总价</span>
              <span class="text-[#5D4037]">¥{{ order.total }}</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-gray-400">运费</span>
              <span class="text-[#5D4037]">包邮</span>
            </div>
            <div class="flex justify-between text-sm font-bold pt-2 border-t border-[#F0F0F0]">
              <span class="text-[#5D4037]">实付款</span>
              <span class="text-[#FF85A2]">¥{{ order.total }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
