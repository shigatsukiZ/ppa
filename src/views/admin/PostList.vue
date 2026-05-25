<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut, apiDelete } from '../../stores/auth.js'

const posts = ref([])
const loading = ref(true)
const filterStatus = ref('')

onMounted(async () => {
  try {
    posts.value = await apiGet('/api/admin/posts')
  } catch (e) {
    console.error('获取帖子列表失败', e)
  } finally {
    loading.value = false
  }
})

const auditPost = async (id, action) => {
  try {
    const updated = await apiPut(`/api/admin/posts/${id}/audit`, { action })
    const idx = posts.value.findIndex(p => p.id === id)
    if (idx !== -1) posts.value[idx] = updated
  } catch (e) {
    console.error('审核失败', e)
  }
}

const deletePost = async (id) => {
  if (!confirm('确定删除此帖子？')) return
  try {
    const result = await apiDelete(`/api/admin/posts/${id}`)
    posts.value = result
  } catch (e) {
    console.error('删除失败', e)
  }
}

const filteredPosts = () => {
  if (!filterStatus.value) return posts.value
  return posts.value.filter(p => p.status === filterStatus.value)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-black text-[#5D4037]">帖子管理</h1>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="!filterStatus ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = ''">全部</button>
        <button class="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors" :class="filterStatus === '已发布' ? 'bg-[#FF85A2] text-white' : 'bg-gray-50 text-gray-400'" @click="filterStatus = '已发布'">已发布</button>
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
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">作者</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">标题</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">点赞</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">举报</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">状态</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">时间</th>
          <th class="text-left px-4 py-3 text-[10px] text-gray-400 font-bold">操作</th>
        </tr></thead>
        <tbody>
          <tr v-for="p in filteredPosts()" :key="p.id" class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
            <td class="px-4 py-3 text-xs text-gray-400">{{ p.id }}</td>
            <td class="px-4 py-3 text-xs font-bold text-[#5D4037]">{{ p.author }}</td>
            <td class="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{{ p.title }}</td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ p.likes }}</td>
            <td class="px-4 py-3">
              <span class="text-xs" :class="p.reportCount > 0 ? 'text-red-500 font-bold' : 'text-gray-400'">{{ p.reportCount }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" :class="p.status === '已发布' ? 'bg-green-50 text-green-500' : p.status === '待审核' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'">{{ p.status }}</span>
            </td>
            <td class="px-4 py-3 text-xs text-gray-400">{{ p.time }}</td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button v-if="p.status === '待审核'" class="text-[10px] px-2 py-1 rounded bg-green-500 text-white font-bold" @click="auditPost(p.id, 'approve')">通过</button>
                <button v-if="p.status === '待审核'" class="text-[10px] px-2 py-1 rounded bg-red-400 text-white font-bold" @click="auditPost(p.id, 'reject')">驳回</button>
                <button class="text-[10px] px-2 py-1 rounded bg-gray-200 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors" @click="deletePost(p.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
