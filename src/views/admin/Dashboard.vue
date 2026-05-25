<script setup>
import { ref, onMounted } from 'vue'
import { apiGet } from '../../stores/auth.js'

const stats = ref([])
const recentActivity = ref([])

onMounted(async () => {
  try {
    const data = await apiGet('/api/admin/dashboard')
    stats.value = data.stats
    recentActivity.value = data.recentActivity
  } catch (e) {
    console.error('获取仪表盘数据失败', e)
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-xl font-black text-[#5D4037]">平台仪表盘</h1>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.label" class="bg-white rounded-2xl p-5 border border-gray-100">
        <p class="text-xs text-gray-400 mb-1">{{ s.label }}</p>
        <p class="text-2xl font-black text-[#5D4037]">{{ s.value }}</p>
        <p class="text-xs mt-1" :class="s.color">{{ s.change }} 较昨日</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-5 border border-gray-100">
        <h2 class="text-sm font-bold text-[#5D4037] mb-4">平台最新动态</h2>
        <div v-for="a in recentActivity" :key="a.user + a.time" class="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
          <div>
            <p class="text-xs font-bold text-[#5D4037]">{{ a.user }}</p>
            <p class="text-[10px] text-gray-400">{{ a.action }}</p>
          </div>
          <span class="text-[10px] text-gray-300">{{ a.time }}</span>
        </div>
      </div>
      <div class="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col items-center justify-center text-gray-300">
        <iconify-icon class="text-4xl mb-2" icon="solar:graph-up-linear"></iconify-icon>
        <p class="text-sm">趋势图表区域（预留 ECharts 集成）</p>
      </div>
    </div>
  </div>
</template>
