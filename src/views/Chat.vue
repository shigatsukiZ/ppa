<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const navHidden = ref(false)
const showSidebar = ref(false)
const chatTab = ref('chat')
const filterOpen = ref(false)
const filterText = ref('全部')
const searchQuery = ref('')
const searchMode = ref(false)
const searchInput = ref(null)

const filterOptions = ['全部', '未读', '好友', '群聊']

const defaultChats = [
  {
    id: 1,
    name: '布丁麻麻',
    avatar: 'https://picsum.photos/200?random=4',
    preview: '元宝今天在公园玩的开心吗？',
    time: '刚刚',
    unread: 2,
  },
]

const chats = ref([...defaultChats])

const loadChats = () => {
  const raw = localStorage.getItem('ppa_chats')
  if (raw) {
    const stored = JSON.parse(raw)
    const merged = [...defaultChats]
    for (const s of stored) {
      if (!merged.find(m => m.name === s.name)) {
        merged.push(s)
      }
    }
    chats.value = merged
  }
}

const filteredChats = computed(() => {
  if (!searchQuery.value.trim()) return chats.value
  const q = searchQuery.value.trim().toLowerCase()
  return chats.value.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.preview.toLowerCase().includes(q)
  )
})

const enterSearch = () => {
  searchMode.value = true
  setTimeout(() => searchInput.value?.focus(), 100)
}

const exitSearch = () => {
  searchMode.value = false
  searchQuery.value = ''
}

const openChat = (chat) => {
  router.push(`/chat/${encodeURIComponent(chat.name)}`)
}

const onScroll = (e) => {
  const el = e.target
  const threshold = 20
  if (el.scrollTop > threshold) {
    navHidden.value = true
  } else {
    navHidden.value = false
  }
}

onMounted(loadChats)
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <img class="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" alt="avatar" @click="showSidebar = true"/>
        <div class="flex-1 flex items-center justify-center gap-6">
          <button class="text-base font-black transition-colors relative" :class="chatTab === 'chat' ? 'text-[#5D4037]' : 'text-gray-300'" @click="chatTab = 'chat'">
            聊天
            <div v-if="chatTab === 'chat'" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#FF85A2] rounded-full"></div>
          </button>
          <button class="text-base font-black transition-colors relative" :class="chatTab === 'notif' ? 'text-[#5D4037]' : 'text-gray-300'" @click="chatTab = 'notif'">
            通知
            <div v-if="chatTab === 'notif'" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#FF85A2] rounded-full"></div>
          </button>
        </div>
        <div class="relative shrink-0">
          <button v-if="chatTab === 'chat'" class="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-gray-500 font-medium" @click="filterOpen = !filterOpen">
            {{ filterText }}
            <iconify-icon class="text-[10px] transition-transform" :class="filterOpen ? 'rotate-180' : ''" icon="solar:alt-arrow-down-linear"></iconify-icon>
          </button>
          <Transition name="fade">
            <div v-if="filterOpen" class="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10 min-w-[100px]">
              <button v-for="opt in filterOptions" :key="opt" class="block w-full text-left px-3 py-2 text-xs text-[#5D4037] hover:bg-[#FDF0F3] transition-colors" :class="filterText === opt ? 'font-bold text-[#FF85A2]' : ''" @click="filterText = opt; filterOpen = false">{{ opt }}</button>
            </div>
          </Transition>
          <div v-if="chatTab === 'notif'" class="w-[76px]"></div>
        </div>
      </header>

      <template v-if="chatTab === 'chat'">
        <div class="shrink-0 px-4 py-3">
          <div v-if="!searchMode" class="flex items-center justify-center gap-2 bg-[#FDF0F3] rounded-xl px-4 py-2.5 cursor-pointer" @click="enterSearch">
            <iconify-icon class="text-gray-400 text-base" icon="solar:magnifer-linear"></iconify-icon>
            <span class="text-xs text-gray-400">搜索</span>
          </div>
          <div v-else class="flex items-center gap-2 bg-[#FDF0F3] rounded-xl px-4 py-2">
            <iconify-icon class="text-gray-400 text-base shrink-0" icon="solar:magnifer-linear"></iconify-icon>
            <input ref="searchInput" v-model="searchQuery" placeholder="搜索聊天记录..." class="flex-1 bg-transparent outline-none text-xs text-[#5D4037] placeholder-gray-300 min-w-0" @keyup.enter="exitSearch"/>
            <button class="shrink-0 text-[10px] text-gray-400 font-medium" @click="exitSearch">取消</button>
          </div>
        </div>

        <main class="flex-1 overflow-y-auto custom-scrollbar" @scroll="onScroll">
          <div v-for="chat in filteredChats" :key="chat.id" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer" @click="openChat(chat)">
            <div class="relative shrink-0">
              <img :src="chat.avatar" :alt="chat.name" class="w-12 h-12 rounded-full object-cover"/>
              <span v-if="chat.unread" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[#FF3B30] text-white text-[9px] font-bold rounded-full leading-none border-2 border-white">{{ chat.unread > 99 ? '99+' : chat.unread }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-[#5D4037]">{{ chat.name }}</span>
                <span class="text-[10px] text-gray-400 shrink-0">{{ chat.time }}</span>
              </div>
              <p class="text-xs text-gray-400 truncate mt-0.5">{{ chat.preview }}</p>
            </div>
          </div>

          <div class="h-40 flex items-center justify-center">
            <span class="text-xs text-gray-200">{{ searchQuery.trim() ? '未找到匹配的聊天' : '没有更多消息了' }}</span>
          </div>
        </main>
      </template>

      <template v-else>
        <main class="flex-1 overflow-y-auto custom-scrollbar" @scroll="onScroll">
          <div class="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0]">
            <div class="w-10 h-10 rounded-full bg-[#FFE4E1] flex items-center justify-center shrink-0">
              <iconify-icon class="text-[#FF85A2] text-lg" icon="solar:heart-bold"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#5D4037]">大白姐姐 赞了你的帖子</p>
              <p class="text-[10px] text-gray-400 mt-0.5">2 分钟前</p>
            </div>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0]">
            <div class="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
              <iconify-icon class="text-green-500 text-lg" icon="solar:chat-round-dots-bold"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#5D4037]">团子爸爸 回复了你</p>
              <p class="text-xs text-gray-400 truncate mt-0.5">"好可爱的猫猫！我家团子也爱吃这个～"</p>
              <p class="text-[10px] text-gray-400 mt-0.5">15 分钟前</p>
            </div>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0]">
            <div class="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center shrink-0">
              <iconify-icon class="text-orange-500 text-lg" icon="solar:bell-bold"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#5D4037]">系统通知：你的帖子被推荐</p>
              <p class="text-xs text-gray-400 truncate mt-0.5">"宠物社交达人"有你的内容被推荐到首页</p>
              <p class="text-[10px] text-gray-400 mt-0.5">1 小时前</p>
            </div>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0]">
            <div class="w-10 h-10 rounded-full bg-[#E8EAF6] flex items-center justify-center shrink-0">
              <iconify-icon class="text-indigo-500 text-lg" icon="solar:users-group-rounded-bold"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#5D4037]">泡芙麻麻 关注了你</p>
              <p class="text-[10px] text-gray-400 mt-0.5">昨天</p>
            </div>
          </div>
          <div class="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0F0]">
            <div class="w-10 h-10 rounded-full bg-[#FCE4EC] flex items-center justify-center shrink-0">
              <iconify-icon class="text-pink-500 text-lg" icon="solar:star-bold"></iconify-icon>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[#5D4037]">布丁麻麻 收藏了你的帖子</p>
              <p class="text-[10px] text-gray-400 mt-0.5">昨天</p>
            </div>
          </div>
          <div class="h-12 flex items-center justify-center">
            <span class="text-xs text-gray-200">没有更多通知了</span>
          </div>
        </main>
      </template>

      <BottomNav :hidden="navHidden" />
      <Sidebar :show="showSidebar" @close="showSidebar = false" />
    </div>
  </div>
</template>
