<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut } from '../../stores/auth.js'

const users = ref([])
const loading = ref(true)
const searchQ = ref('')

onMounted(async () => {
  try {
    users.value = await apiGet('/api/admin/users')
  } catch (e) {
    console.error('获取用户列表失败', e)
  } finally {
    loading.value = false
  }
})

const toggleBan = async (u) => {
  try {
    const updated = await apiPut(`/api/admin/users/${u.id}/ban`)
    Object.assign(u, updated)
  } catch (e) {
    console.error('操作失败', e)
  }
}

const doSearch = async () => {
  loading.value = true
  try {
    users.value = await apiGet('/api/admin/users' + (searchQ.value ? `?q=${encodeURIComponent(searchQ.value)}` : ''))
  } catch (e) {
    console.error('搜索失败', e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-black text-[#5D4037]">用户管理</h1>
      <div class="flex gap-2">
        <input v-model="searchQ" placeholder="搜索用户名/手机号..." class="w-64 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#5D4037] outline-none" @keyup.enter="doSearch"/>
        <button class="px-4 py-2 rounded-xl bg-[#FF85A2] text-white text-xs font-bold" @click="doSearch">搜索</button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <table class="w-full text-sm">
        <thead><tr class="border-b border-gray-100 bg-gray-50">
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">ID</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">用户</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">手机号</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">帖子</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">粉丝</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">注册时间</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">操作</th>
        </tr></thead>
        <tbody>
          <tr v-for="u in users" :key="u.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-400">{{ u.id }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#5D4037]">{{ u.name }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ u.phone }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ u.posts }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ u.followers }}</td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="u.status === '正常' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'">{{ u.status }}</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-400">{{ u.registerTime }}</td>
            <td class="px-4 py-3">
              <button class="text-[10px] transition-colors" :class="u.status === '正常' ? 'text-red-400 hover:text-red-600' : 'text-green-400 hover:text-green-600'" @click="toggleBan(u)">{{ u.status === '正常' ? '封禁' : '解封' }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
