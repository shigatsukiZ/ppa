<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut } from '../../stores/auth.js'

const merchants = ref([])
const loading = ref(true)
const filterStatus = ref('')

onMounted(async () => {
  try {
    merchants.value = await apiGet('/api/admin/merchants')
  } catch (e) {
    console.error('获取商家列表失败', e)
  } finally {
    loading.value = false
  }
})

const verifyMerchant = async (id) => {
  try {
    const updated = await apiPut(`/api/admin/merchants/${id}/verify`)
    const idx = merchants.value.findIndex(m => m.id === id)
    if (idx !== -1) merchants.value[idx] = updated
  } catch (e) {
    console.error('审核失败', e)
  }
}

const filteredMerchants = () => {
  if (!filterStatus.value) return merchants.value
  return merchants.value.filter(m => m.status === filterStatus.value)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-black text-[#5D4037]">商家管理</h1>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="!filterStatus ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = ''">全部</button>
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="filterStatus === '已入驻' ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = '已入驻'">已入驻</button>
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="filterStatus === '待审核' ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = '待审核'">待审核</button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="border-b border-gray-100 bg-gray-50">
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">ID</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">店铺名称</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">联系方式</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">商品数</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">销售额</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">申请时间</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">操作</th>
        </tr></thead>
        <tbody>
          <tr v-for="m in filteredMerchants()" :key="m.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-400">{{ m.id }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#5D4037]">{{ m.name }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ m.contact }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ m.products }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#FF85A2]">{{ m.sales }}</td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="m.status === '已入驻' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'">{{ m.status }}</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-400">{{ m.applyTime }}</td>
            <td class="px-4 py-3">
              <button v-if="m.status === '待审核'" class="text-[10px] px-3 py-1 rounded-full bg-green-500 text-white font-bold hover:bg-green-600" @click="verifyMerchant(m.id)">通过</button>
              <span v-else class="text-[10px] text-gray-400">已入驻</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
