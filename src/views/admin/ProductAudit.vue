<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut } from '../../stores/auth.js'

const products = ref([])
const loading = ref(true)
const filterStatus = ref('')

onMounted(async () => {
  try {
    const data = await apiGet('/api/admin/products')
    products.value = data.products || data
  } catch (e) {
    console.error('获取商品列表失败', e)
  } finally {
    loading.value = false
  }
})

const auditProduct = async (id, action) => {
  try {
    await apiPut(`/api/admin/products/${id}/audit`, { status: action === 'approve' ? '上架' : '下架' })
    const p = products.value.find(p => p.id === id)
    if (p) p.status = action === 'approve' ? '上架' : '下架'
  } catch (e) {
    console.error('审核失败', e)
  }
}

const filteredProducts = () => {
  if (!filterStatus.value) return products.value
  return products.value.filter(p => p.status === filterStatus.value)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-black text-[#5D4037]">商品审核</h1>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="!filterStatus ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = ''">全部</button>
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="filterStatus === '上架' ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = '上架'">已上架</button>
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="filterStatus === '下架' ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = '下架'">已下架</button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="border-b border-gray-100 bg-gray-50">
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">ID</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">商品</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">价格</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">标签</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">操作</th>
        </tr></thead>
        <tbody>
          <tr v-for="p in filteredProducts()" :key="p.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-400">{{ p.id }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img :src="p.img" class="w-8 h-8 rounded-lg object-cover"/>
                <span class="text-xs font-bold text-[#5D4037]">{{ p.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-xs font-bold text-[#FF85A2]">¥{{ p.price }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ p.tag }}</td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="p.status === '上架' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'">{{ p.status }}</span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button v-if="p.status !== '上架'" class="text-[10px] px-3 py-1 rounded-full bg-green-500 text-white font-bold hover:bg-green-600" @click="auditProduct(p.id, 'approve')">通过</button>
                <button v-if="p.status !== '下架'" class="text-[10px] px-3 py-1 rounded-full bg-red-400 text-white font-bold hover:bg-red-500" @click="auditProduct(p.id, 'reject')">下架</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
