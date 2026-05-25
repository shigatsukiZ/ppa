<script setup>
import { ref, onMounted } from 'vue'
import { apiGet } from '../../stores/auth.js'

const data = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    data.value = await apiGet('/api/admin/statistics')
  } catch (e) {
    console.error('获取统计数据失败', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-black text-[#5D4037]">数据统计</h1>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <template v-if="data">
      <div class="grid grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-[#5D4037] mb-4">近 7 日活跃用户</h2>
          <div class="flex items-end gap-2 h-32">
            <div v-for="(v, i) in data.dailyActiveUsers" :key="i" class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full rounded-lg bg-blue-100 transition-all" :style="{ height: (v / Math.max(...data.dailyActiveUsers) * 100) + '%' }">
                <div class="w-full h-full rounded-lg bg-gradient-to-t from-blue-400 to-blue-300" :style="{ height: (v / Math.max(...data.dailyActiveUsers) * 100) + '%' }"></div>
              </div>
              <span class="text-[8px] text-gray-400">{{ data.weekDays[i] }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-[#5D4037] mb-4">近 7 日订单数</h2>
          <div class="flex items-end gap-2 h-32">
            <div v-for="(v, i) in data.dailyOrders" :key="i" class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full rounded-lg transition-all" :style="{ height: (v / Math.max(...data.dailyOrders) * 100) + '%' }">
                <div class="w-full h-full rounded-lg bg-gradient-to-t from-[#FF85A2] to-pink-300" :style="{ height: (v / Math.max(...data.dailyOrders) * 100) + '%' }"></div>
              </div>
              <span class="text-[8px] text-gray-400">{{ data.weekDays[i] }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-[#5D4037] mb-4">近 7 日交易额</h2>
          <div class="flex items-end gap-2 h-32">
            <div v-for="(v, i) in data.dailyRevenue" :key="i" class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full rounded-lg transition-all" :style="{ height: (v / Math.max(...data.dailyRevenue) * 100) + '%' }">
                <div class="w-full h-full rounded-lg bg-gradient-to-t from-green-400 to-green-300" :style="{ height: (v / Math.max(...data.dailyRevenue) * 100) + '%' }"></div>
              </div>
              <span class="text-[8px] text-gray-400">{{ data.weekDays[i] }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-[#5D4037] mb-4">分类分布</h2>
          <div class="space-y-3">
            <div v-for="c in data.categoryDistribution" :key="c.name" class="flex items-center gap-3">
              <span class="text-xs text-gray-500 w-12">{{ c.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-2.5">
                <div class="h-full rounded-full bg-gradient-to-r from-[#FF85A2] to-pink-300" :style="{ width: c.value + '%' }"></div>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">{{ c.value }}%</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-gray-100">
          <h2 class="text-sm font-bold text-[#5D4037] mb-4">设备分布</h2>
          <div class="space-y-3">
            <div v-for="d in data.deviceDistribution" :key="d.name" class="flex items-center gap-3">
              <span class="text-xs text-gray-500 w-16">{{ d.name }}</span>
              <div class="flex-1 bg-gray-100 rounded-full h-2.5">
                <div class="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-300" :style="{ width: d.value + '%' }"></div>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">{{ d.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
