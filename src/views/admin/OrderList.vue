<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiGet } from '../../stores/auth.js'

const orders = ref([])
const loading = ref(true)
const activeTab = ref('全部')
const tabs = ['全部', '待付款', '待发货', '待收货', '已完成', '已退款']

onMounted(async () => {
  try {
    orders.value = await apiGet('/api/admin/orders')
  } catch (e) {
    console.error('获取订单列表失败', e)
  } finally {
    loading.value = false
  }
})

const filteredOrders = computed(() => {
  if (activeTab.value === '全部') return orders.value
  return orders.value.filter(o => o.status === activeTab.value)
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-black text-[#5D4037]">全平台订单管理</h1>

    <div class="flex gap-2 border-b border-gray-100 pb-3">
      <button v-for="t in tabs" :key="t"
        class="px-4 py-1.5 rounded-full text-xs font-bold transition-colors"
        :class="activeTab === t ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'"
        @click="activeTab = t">{{ t }}</button>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="border-b border-gray-100 bg-gray-50">
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">订单号</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">用户</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">商家</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">金额</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">商品数</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">时间</th>
        </tr></thead>
        <tbody>
          <tr v-for="o in filteredOrders" :key="o.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-500 font-mono">{{ o.id }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#5D4037]">{{ o.user }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ o.merchant }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#FF85A2]">{{ o.total }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ o.items }}</td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="o.status === '已完成' ? 'bg-green-50 text-green-500' : o.status === '待发货' ? 'bg-orange-50 text-orange-500' : o.status === '待付款' ? 'bg-blue-50 text-blue-500' : o.status === '已退款' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'">{{ o.status }}</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-400">{{ o.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
