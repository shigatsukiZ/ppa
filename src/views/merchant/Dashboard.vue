<script setup>
import { ref, onMounted } from 'vue'
import { apiGet } from '../../stores/auth.js'

const stats = ref([])
const recentOrders = ref([])
const topProducts = ref([])

onMounted(async () => {
  try {
    const data = await apiGet('/api/merchant/dashboard')
    stats.value = data.stats
    recentOrders.value = data.recentOrders
    topProducts.value = data.topProducts
  } catch (e) {
    console.error('获取数据概览失败', e)
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-black text-[#5D4037]">数据概览</h1>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.label" class="bg-white rounded-2xl p-5 border border-gray-100">
        <p class="text-xs text-gray-400 mb-1">{{ s.label }}</p>
        <p class="text-2xl font-black text-[#5D4037]">{{ s.value }}</p>
        <p class="text-xs mt-1" :class="s.up ? 'text-green-500' : 'text-red-500'">{{ s.change }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <h2 class="text-sm font-bold text-[#5D4037] mb-4">近期待处理</h2>
        <div v-for="o in recentOrders" :key="o.id" class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
          <div>
            <p class="text-xs font-bold text-[#5D4037]">{{ o.customer }}</p>
            <p class="text-[10px] text-gray-400">{{ o.id }} · {{ o.time }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs font-bold text-[#FF85A2]">{{ o.total }}</p>
            <p class="text-[10px]" :class="o.status === '待发货' ? 'text-orange-500' : o.status === '待付款' ? 'text-blue-500' : 'text-green-500'">{{ o.status }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <h2 class="text-sm font-bold text-[#5D4037] mb-4">热销商品 Top 3</h2>
        <div v-for="(p, i) in topProducts" :key="p.name" class="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
          <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" :class="i === 0 ? 'bg-[#FFD1DC] text-[#FF85A2]' : 'bg-gray-100 text-gray-500'">{{ i + 1 }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-[#5D4037] truncate">{{ p.name }}</p>
            <p class="text-[10px] text-gray-400">已售 {{ p.sales }}</p>
          </div>
          <span class="text-xs font-bold text-[#FF85A2]">{{ p.revenue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
