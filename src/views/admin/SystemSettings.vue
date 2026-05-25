<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut, apiPost, apiDelete } from '../../stores/auth.js'

const settings = ref({
  siteName: '', announcement: '', userRegister: true, merchantApply: true, auditPost: true,
})
const categories = ref([])
const tags = ref([])
const categoryForm = ref({ name: '', parent: '' })
const tagForm = ref({ name: '' })
const loading = ref(true)
const saved = ref(false)

onMounted(async () => {
  try {
    const [s, c, t] = await Promise.all([
      apiGet('/api/admin/settings'),
      apiGet('/api/admin/categories'),
      apiGet('/api/admin/tags'),
    ])
    settings.value = s
    categories.value = c
    tags.value = t
  } catch (e) {
    console.error('获取系统设置失败', e)
  } finally {
    loading.value = false
  }
})

const saveSettings = async () => {
  try {
    await apiPut('/api/admin/settings', settings.value)
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
  } catch (e) {
    console.error('保存失败', e)
  }
}

const addCategory = async () => {
  if (!categoryForm.value.name) return
  try {
    const result = await apiPost('/api/admin/categories', categoryForm.value)
    categories.value = result
    categoryForm.value = { name: '', parent: '' }
  } catch (e) {
    console.error('添加分类失败', e)
  }
}

const removeCategory = async (name) => {
  try {
    const result = await apiDelete(`/api/admin/categories/${encodeURIComponent(name)}`)
    categories.value = result
  } catch (e) {
    console.error('删除分类失败', e)
  }
}

const addTag = async () => {
  if (!tagForm.value.name) return
  try {
    const result = await apiPost('/api/admin/tags', tagForm.value)
    tags.value = result
    tagForm.value = { name: '' }
  } catch (e) {
    console.error('添加标签失败', e)
  }
}

const removeTag = async (tag) => {
  try {
    const result = await apiDelete(`/api/admin/tags/${encodeURIComponent(tag)}`)
    tags.value = result
  } catch (e) {
    console.error('删除标签失败', e)
  }
}
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <h1 class="text-xl font-black text-[#5D4037]">系统设置</h1>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <template v-else>
      <div class="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
        <h2 class="text-sm font-bold text-[#5D4037]">基本设置</h2>
        <div>
          <label class="text-xs text-gray-400 font-bold block mb-1">站点名称</label>
          <input v-model="settings.siteName" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
        </div>
        <div>
          <label class="text-xs text-gray-400 font-bold block mb-1">系统公告</label>
          <textarea v-model="settings.announcement" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none resize-none" rows="3"></textarea>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-xs font-bold text-[#5D4037]">开放用户注册</span>
          <button class="w-11 h-6 rounded-full transition-colors relative" :class="settings.userRegister ? 'bg-[#FF85A2]' : 'bg-gray-200'" @click="settings.userRegister = !settings.userRegister">
            <div class="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" :class="settings.userRegister ? 'translate-x-[22px]' : 'translate-x-0.5'"></div>
          </button>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-xs font-bold text-[#5D4037]">开放商家入驻</span>
          <button class="w-11 h-6 rounded-full transition-colors relative" :class="settings.merchantApply ? 'bg-[#FF85A2]' : 'bg-gray-200'" @click="settings.merchantApply = !settings.merchantApply">
            <div class="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" :class="settings.merchantApply ? 'translate-x-[22px]' : 'translate-x-0.5'"></div>
          </button>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-6 py-2.5 rounded-xl bg-[#FF85A2] text-white text-xs font-bold" @click="saveSettings">保存设置</button>
          <span v-if="saved" class="text-xs text-green-500 font-bold">已保存</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
        <h2 class="text-sm font-bold text-[#5D4037]">分类管理</h2>
        <div class="flex gap-2">
          <input v-model="categoryForm.name" placeholder="分类名称" class="flex-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none" @keyup.enter="addCategory"/>
          <input v-model="categoryForm.parent" placeholder="所属父类" class="w-32 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
          <button class="px-4 py-2 rounded-xl bg-[#FF85A2] text-white text-xs font-bold" @click="addCategory">添加</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="c in categories" :key="c.name" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-xs text-gray-500">
            {{ c.name }}（{{ c.parent }}）
            <button class="text-gray-300 hover:text-red-500 transition-colors" @click="removeCategory(c.name)">&times;</button>
          </span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
        <h2 class="text-sm font-bold text-[#5D4037]">标签管理</h2>
        <div class="flex gap-2">
          <input v-model="tagForm.name" placeholder="标签名称" class="flex-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none" @keyup.enter="addTag"/>
          <button class="px-4 py-2 rounded-xl bg-[#FF85A2] text-white text-xs font-bold" @click="addTag">添加</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="t in tags" :key="t" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF0F3] text-xs text-[#FF85A2]">
            {{ t }}
            <button class="text-[#FF85A2]/50 hover:text-red-500 transition-colors" @click="removeTag(t)">&times;</button>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
