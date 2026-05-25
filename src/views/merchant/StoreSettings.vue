<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut } from '../../stores/auth.js'

const store = ref({
  name: '', logo: '', desc: '', openTime: '', closeTime: '', shipping: '',
})
const loading = ref(true)
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  try {
    store.value = await apiGet('/api/merchant/settings')
  } catch (e) {
    console.error('获取店铺设置失败', e)
  } finally {
    loading.value = false
  }
})

const save = async () => {
  saving.value = true
  saved.value = false
  try {
    await apiPut('/api/merchant/settings', store.value)
    saved.value = true
    setTimeout(() => saved.value = false, 2000)
  } catch (e) {
    console.error('保存失败', e)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-4 max-w-2xl">
    <h1 class="text-xl font-black text-[#5D4037]">店铺设置</h1>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="bg-white rounded-2xl p-5 border border-gray-100 space-y-4">
      <div>
        <label class="text-xs text-gray-400 font-bold block mb-1">店铺名称</label>
        <input v-model="store.name" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
      </div>
      <div>
        <label class="text-xs text-gray-400 font-bold block mb-1">店铺 Logo</label>
        <div class="flex items-center gap-3">
          <img :src="store.logo" class="w-12 h-12 rounded-xl object-cover"/>
          <button class="text-xs text-[#FF85A2] font-bold">更换图片</button>
        </div>
      </div>
      <div>
        <label class="text-xs text-gray-400 font-bold block mb-1">店铺简介</label>
        <textarea v-model="store.desc" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none resize-none" rows="3"></textarea>
      </div>
      <div class="flex gap-4">
        <div class="flex-1">
          <label class="text-xs text-gray-400 font-bold block mb-1">营业时间</label>
          <input v-model="store.openTime" type="time" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
        </div>
        <div class="flex-1">
          <label class="text-xs text-gray-400 font-bold block mb-1">打烊时间</label>
          <input v-model="store.closeTime" type="time" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
        </div>
      </div>
      <div>
        <label class="text-xs text-gray-400 font-bold block mb-1">运费模板</label>
        <input v-model="store.shipping" class="w-full px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-6 py-2.5 rounded-xl bg-[#FF85A2] text-white text-xs font-bold disabled:opacity-50" :disabled="saving" @click="save">{{ saving ? '保存中...' : '保存设置' }}</button>
        <span v-if="saved" class="text-xs text-green-500 font-bold">已保存</span>
      </div>
    </div>
  </div>
</template>
