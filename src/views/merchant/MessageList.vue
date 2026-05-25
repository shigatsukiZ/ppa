<script setup>
import { ref, onMounted } from 'vue'
import { apiGet, apiPut, apiPost } from '../../stores/auth.js'

const messages = ref([])
const loading = ref(true)
const replyText = ref({})

onMounted(async () => {
  try {
    messages.value = await apiGet('/api/merchant/messages')
  } catch (e) {
    console.error('获取消息失败', e)
  } finally {
    loading.value = false
  }
})

const markRead = async (id) => {
  try {
    await apiPut(`/api/merchant/messages/${id}/read`)
    const m = messages.value.find(m => m.id === id)
    if (m) m.unread = false
  } catch (e) {
    console.error('标记已读失败', e)
  }
}

const sendReply = async (id) => {
  const text = replyText.value[id]
  if (!text?.trim()) return
  try {
    await apiPost(`/api/merchant/messages/${id}/reply`, { reply: text })
    const m = messages.value.find(m => m.id === id)
    if (m) m.reply = text
    replyText.value[id] = ''
  } catch (e) {
    console.error('回复失败', e)
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-black text-[#5D4037]">客户消息</h1>

    <div v-if="loading" class="flex items-center justify-center h-40 text-gray-300">
      <iconify-icon class="text-3xl animate-spin" icon="solar:spinner-bold"></iconify-icon>
    </div>

    <div v-else class="space-y-3">
      <div v-for="m in messages" :key="m.id" class="bg-white rounded-2xl p-4 border border-gray-100"
        :class="m.unread ? 'border-l-4 border-l-[#FF85A2]' : ''" @click="markRead(m.id)">
        <div class="flex items-start gap-3">
          <img :src="m.avatar" class="w-10 h-10 rounded-full object-cover shrink-0"/>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#5D4037]">{{ m.customer }}</span>
              <span v-if="m.unread" class="w-2 h-2 rounded-full bg-[#FF85A2]"></span>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ m.content }}</p>
            <div v-if="m.reply" class="mt-2 bg-gray-50 rounded-xl p-2.5">
              <p class="text-[10px] text-gray-400 font-bold">商家回复：</p>
              <p class="text-xs text-gray-600">{{ m.reply }}</p>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <input v-model="replyText[m.id]" placeholder="输入回复..." class="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 text-xs text-[#5D4037] outline-none" @keyup.enter="sendReply(m.id)"/>
              <button class="text-[10px] px-3 py-1.5 rounded-xl bg-[#FF85A2] text-white font-bold" @click.stop="sendReply(m.id)">回复</button>
            </div>
          </div>
          <span class="text-[10px] text-gray-300 shrink-0">{{ m.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
