<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userName = route.params.name

const userInfo = computed(() => {
  const all = [
    { name: '元宝麻麻', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg' },
    { name: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg' },
    { name: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg' },
    { name: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1' },
    { name: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2' },
    { name: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3' },
    { name: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4' },
    { name: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5' },
    { name: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6' },
  ]
  return all.find(u => u.name === userName) || { name: userName, avatar: '' }
})

const msgText = ref('')
const messagesEnd = ref(null)
const showEmoji = ref(false)
const emojiList = ['😊', '😂', '🥰', '😍', '🤩', '😘', '😭', '😤', '🤔', '🙄', '😴', '🥺', '😎', '🤗', '🐾', '❤️', '🔥', '✨', '🌟', '💪', '🎉', '👏', '🙌', '🍀']
const chatHistory = ref([
  { id: 1, from: 'them', text: `你好！欢迎来找${userName}聊天～`, time: '14:30' },
  { id: 2, from: 'them', text: '有什么关于宠物的问题可以问我哦 😊', time: '14:30' },
])

onMounted(() => {
  scrollToBottom()
})

const sendMsg = () => {
  const text = msgText.value.trim()
  if (!text) return
  chatHistory.value.push({
    id: Date.now(),
    from: 'me',
    text,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
  })
  msgText.value = ''
  nextTick(scrollToBottom)

  setTimeout(() => {
    chatHistory.value.push({
      id: Date.now() + 1,
      from: 'them',
      text: '收到！我会尽快回复你～ 🐾',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    })
    nextTick(scrollToBottom)
  }, 1000 + Math.random() * 1000)
}

const scrollToBottom = () => {
  messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
}

const insertEmoji = (emoji) => {
  msgText.value += emoji
  showEmoji.value = false
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#EDEDED] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <div class="shrink-0 bg-[#EDEDED]">
        <div class="flex items-center px-4 h-11">
          <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors" @click="router.back()">
            <iconify-icon class="text-gray-500 text-xl" icon="solar:arrow-left-linear"></iconify-icon>
          </button>
          <div class="flex-1 flex items-center justify-center">
            <span class="text-sm font-black text-[#5D4037]">{{ userName }}</span>
          </div>
          <div class="w-8"></div>
        </div>
      </div>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-3 space-y-3 bg-[#EDEDED]">
        <div v-for="msg in chatHistory" :key="msg.id">
          <p class="text-[9px] text-gray-400 text-center mb-2">{{ msg.time }}</p>
          <div class="flex" :class="msg.from === 'me' ? 'justify-end' : 'justify-start'">
            <img v-if="msg.from === 'them'" :src="userInfo.avatar" class="w-9 h-9 rounded-full object-cover shrink-0 self-start mr-2"/>
            <div class="max-w-[220px]">
              <div class="px-3 py-2 text-sm leading-relaxed rounded-[18px]" :class="msg.from === 'me' ? 'bg-[#FF85A2] text-white' : 'bg-white text-[#5D4037]'">
                {{ msg.text }}
              </div>
            </div>
            <div v-if="msg.from === 'me'" class="w-9"></div>
          </div>
        </div>
        <div ref="messagesEnd"></div>
      </main>

      <div class="shrink-0 bg-[#EDEDED] px-3 py-3 border-t border-gray-200/50 relative">
        <div class="flex items-center gap-1 bg-white rounded-[25px] px-4 py-2">
          <button class="shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#FF85A2] transition-colors rounded-full hover:bg-gray-100" @click="showEmoji = !showEmoji">
            <iconify-icon class="text-lg" icon="solar:emoji-funny-square-linear"></iconify-icon>
          </button>
          <input v-model="msgText" placeholder="输入消息..." class="flex-1 outline-none text-sm text-[#5D4037] placeholder-gray-300 rounded-lg" @keyup.enter="sendMsg"/>
          <button class="shrink-0 w-8 h-8 rounded-full bg-[#FF85A2] flex items-center justify-center text-white disabled:opacity-50" :disabled="!msgText.trim()" @click="sendMsg">
            <iconify-icon class="text-base" icon="solar:arrow-up-bold"></iconify-icon>
          </button>
        </div>
        <Transition name="fade">
          <div v-if="showEmoji" class="absolute bottom-full left-3 mb-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-56 z-50 grid grid-cols-6 gap-1" @click.stop>
            <button v-for="emoji in emojiList" :key="emoji" class="w-7 h-7 flex items-center justify-center text-sm hover:bg-gray-100 rounded-lg transition-colors" @click="insertEmoji(emoji)">{{ emoji }}</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
