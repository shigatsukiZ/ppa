<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut } from '../../stores/auth.js'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    products.value = await apiGet('/api/merchant/products')
  } catch (e) {
    console.error('获取商品列表失败', e)
  } finally {
    loading.value = false
  }
})

const toggleStatus = async (p) => {
  const newStatus = p.status === '上架' ? '下架' : '上架'
  try {
    await apiPut(`/api/merchant/products/${p.id}`, { status: newStatus })
    p.status = newStatus
  } catch (e) {
    console.error('更新商品状态失败', e)
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-black text-[#5D4037]">商品管理</h1>
      <button class="px-4 py-2 rounded-xl bg-[#FF85A2] text-white text-xs font-bold hover:opacity-90 transition-opacity">添加商品</button>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">商品</th>
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">价格</th>
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">库存</th>
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">销量</th>
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
            <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img :src="p.img" class="w-10 h-10 rounded-lg object-cover"/>
                <span class="text-xs font-bold text-[#5D4037]">{{ p.name }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-xs font-bold text-[#FF85A2]">¥{{ p.price }}</td>
            <td class="px-4 py-3 text-xs" :class="p.stock === 0 ? 'text-red-500' : 'text-gray-500'">{{ p.stock === 0 ? '缺货' : p.stock }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ p.sales }}</td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="p.status === '上架' ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'">{{ p.status }}</span>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button class="text-[10px] text-gray-400 hover:text-[#5D4037] transition-colors">编辑</button>
                <button class="text-[10px] transition-colors" :class="p.status === '上架' ? 'text-orange-400 hover:text-orange-600' : 'text-green-400 hover:text-green-600'" @click="toggleStatus(p)">{{ p.status === '上架' ? '下架' : '上架' }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
