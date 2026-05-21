<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orders = ref([])
const activeTab = ref('全部')

const tabs = ['全部', '待付款', '待发货', '待收货', '已完成']

const filteredOrders = ref([])

onMounted(() => {
  const raw = localStorage.getItem('ppa_orders')
  if (raw) {
    const all = JSON.parse(raw).filter(o => o.userId === '元宝麻麻')
    orders.value = all
    filteredOrders.value = all
  }
})

const filterOrders = (tab) => {
  activeTab.value = tab
  if (tab === '全部') filteredOrders.value = orders.value
  else filteredOrders.value = orders.value.filter(o => o.status === tab)
}

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
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-bold text-[#5D4037]">我的订单</h1>
        <div class="w-8"></div>
      </header>

      <div class="shrink-0 flex border-b border-[#F0F0F0] overflow-x-auto custom-scrollbar">
        <button v-for="t in tabs" :key="t"
          class="shrink-0 px-4 py-2.5 text-xs font-bold transition-colors relative"
          :class="activeTab === t ? 'text-[#5D4037]' : 'text-gray-400'"
          @click="filterOrders(t)">
          {{ t }}
          <div v-if="activeTab === t" class="absolute bottom-0 left-2 right-2 h-0.5 bg-[#FF85A2] rounded-full"></div>
        </button>
      </div>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
        <div v-for="o in filteredOrders" :key="o.orderNum"
          class="bg-white rounded-[20px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer hover:shadow-lg transition-shadow"
          @click="router.push('/order-detail/' + o.orderNum)">
          <div class="flex justify-between items-center mb-2">
            <span class="text-[10px] text-gray-400">{{ o.time }}</span>
            <span class="text-[10px] font-bold" :class="statusColor(o.status)">{{ o.status }}</span>
          </div>
          <div class="flex gap-3">
            <img :src="o.img" class="w-16 h-16 rounded-xl object-cover shrink-0"/>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-bold text-[#5D4037] truncate">{{ o.name }}</p>
              <p class="text-[9px] text-gray-400 mt-0.5">{{ o.spec }}</p>
              <div class="flex justify-between items-center mt-1">
                <span class="text-sm font-black text-[#FF85A2]">¥{{ o.price }}</span>
                <span class="text-[9px] text-gray-300">x {{ o.qty }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!filteredOrders.length" class="flex items-center justify-center h-40">
          <span class="text-xs text-gray-200">暂无订单</span>
        </div>
      </main>
    </div>
  </div>
</template>
