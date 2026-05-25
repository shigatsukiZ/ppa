<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPost } from '../../stores/auth.js'

const reviews = ref([])
const loading = ref(true)
const replyText = ref({})

onMounted(async () => {
  try {
    reviews.value = await apiGet('/api/merchant/reviews')
  } catch (e) {
    console.error('获取评价失败', e)
  } finally {
    loading.value = false
  }
})

const doReply = async (id) => {
  const text = replyText.value[id]
  if (!text?.trim()) return
  try {
    await apiPost(`/api/merchant/reviews/${id}/reply`, { reply: text })
    const r = reviews.value.find(r => r.id === id)
    if (r) r.reply = text
    replyText.value[id] = ''
  } catch (e) {
    console.error('回复评价失败', e)
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-black text-[#5D4037]">评价管理</h1>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="space-y-3">
      <div v-for="r in reviews" :key="r.id" class="bg-white rounded-2xl p-4 border border-gray-100">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 shrink-0">{{ r.customer[0] }}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#5D4037]">{{ r.customer }}</span>
              <span class="text-[10px] text-gray-300">{{ r.time }}</span>
            </div>
            <p class="text-[10px] text-gray-400 mt-0.5">{{ r.product }}</p>
            <div class="flex gap-0.5 my-1">
              <iconify-icon v-for="s in 5" :key="s" class="text-sm" :class="s <= r.rating ? 'text-yellow-400' : 'text-gray-200'" icon="solar:star-bold"></iconify-icon>
            </div>
            <p class="text-xs text-gray-600">{{ r.content }}</p>
            <div v-if="r.reply" class="mt-2 bg-gray-50 rounded-xl p-2.5">
              <p class="text-[10px] text-gray-400 font-bold">商家回复：</p>
              <p class="text-xs text-gray-600">{{ r.reply }}</p>
            </div>
            <div v-if="!r.reply" class="flex items-center gap-2 mt-2">
              <input v-model="replyText[r.id]" placeholder="回复评价..." class="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 text-xs text-[#5D4037] outline-none" @keyup.enter="doReply(r.id)"/>
              <button class="text-[10px] px-3 py-1.5 rounded-xl bg-[#FF85A2] text-white font-bold" @click="doReply(r.id)">回复</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
