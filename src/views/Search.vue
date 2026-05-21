<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const showSidebar = ref(false)
const navHidden = ref(false)
const activeTab = ref('推荐')
const searchMode = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)

const recommendItems = ref([
  { title: '夏季宠物降温指南', tag: '健康养护', views: '12.3w' },
  { title: '幼猫到家第一天怎么养', tag: '养宠新手', views: '8.7w' },
  { title: '狗狗社会化训练黄金期', tag: '行为训练', views: '6.5w' },
  { title: '宠物友好咖啡店合集', tag: '探店', views: '5.2w' },
])

const hotPosts = ref([
  { rank: 1, nickname: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', content: '锦城公园今天的落日也太美了🌇 大白跑得很开心！捡到一根超粗的树枝当宝贝叼了一路～', likes: '2.1k', comments: '67', views: '8.2w', heat: '99.8w' },
  { rank: 2, nickname: '元宝麻麻', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg', content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~', likes: '1.2k', comments: '48', views: '5.6w', heat: '87.3w' },
  { rank: 3, nickname: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', content: '给团子做了自制猫饭，鸡胸肉+蛋黄+胡萝卜，吃得吧唧嘴😋 配方在评论区自取~', likes: '856', comments: '23', views: '3.1w', heat: '72.5w' },
  { rank: 4, nickname: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', content: '猫狗双全的快乐谁懂啊！布丁和奶糖今天一起晒太阳，画面太治愈了～', likes: '723', comments: '31', views: '2.8w', heat: '65.1w' },
  { rank: 5, nickname: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', content: '泡芙的布偶猫毛打理秘诀分享！一周吃两次蛋黄，毛量直接翻倍✨', likes: '689', comments: '56', views: '2.1w', heat: '58.6w' },
  { rank: 6, nickname: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', content: '金毛拆家现场实录：好好的沙发被掏了个洞😂 但看这无辜的眼神又舍不得骂', likes: '567', comments: '42', views: '1.9w', heat: '52.3w' },
  { rank: 7, nickname: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', content: '哈士奇的迷惑行为大赏：对着镜子吼了半小时，到底在跟谁吵架？', likes: '498', comments: '38', views: '1.7w', heat: '47.8w' },
  { rank: 8, nickname: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', content: '两只柯基的晨练日常，短腿跑起来真的超级搞笑！力量感十足的摇摆屁屁～', likes: '432', comments: '29', views: '1.5w', heat: '43.2w' },
  { rank: 9, nickname: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', content: '英短蓝猫的冷知识：看起来胖其实都是毛！洗完澡瘦一圈😂 附沐浴教程', likes: '389', comments: '45', views: '1.2w', heat: '39.6w' },
  { rank: 10, nickname: '宠爱严选', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg', content: '春季上新！元气奶油猫窝限时7折，买就送主食罐头2罐，手慢无～', likes: '312', comments: '18', views: '9.8k', heat: '35.1w' },
])

const followUsers = ref([
  { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享', avatar: 'https://picsum.photos/200?random=1' },
  { name: '毛球麻麻', desc: '两只柯基的快乐生活', avatar: 'https://picsum.photos/200?random=2' },
  { name: '可乐麻麻', desc: '金毛控 | 训练教程分享', avatar: 'https://picsum.photos/200?random=3' },
  { name: '布丁麻麻', desc: '猫狗双全的人生赢家', avatar: 'https://picsum.photos/200?random=4' },
  { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享', avatar: 'https://picsum.photos/200?random=1' },
  { name: '毛球麻麻', desc: '两只柯基的快乐生活', avatar: 'https://picsum.photos/200?random=2' },
  { name: '可乐麻麻', desc: '金毛控 | 训练教程分享', avatar: 'https://picsum.photos/200?random=3' },
  { name: '布丁麻麻', desc: '猫狗双全的人生赢家', avatar: 'https://picsum.photos/200?random=4' },
  { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享', avatar: 'https://picsum.photos/200?random=1' },
  { name: '毛球麻麻', desc: '两只柯基的快乐生活', avatar: 'https://picsum.photos/200?random=2' },
  { name: '可乐麻麻', desc: '金毛控 | 训练教程分享', avatar: 'https://picsum.photos/200?random=3' },
  { name: '布丁麻麻', desc: '猫狗双全的人生赢家', avatar: 'https://picsum.photos/200?random=4' },
])

const searchResults = ref(null)
const searching = ref(false)

const enterSearch = () => {
  searchMode.value = true
  setTimeout(() => searchInput.value?.focus(), 100)
}

const exitSearch = () => {
  searchMode.value = false
  searchQuery.value = ''
  searchResults.value = null
}

const doSearch = async () => {
  const q = searchQuery.value.trim()
  if (!q) return
  searching.value = true
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
    const data = await res.json()
    searchResults.value = data
    activeTab.value = '热点'
    searchMode.value = false
  } catch {
    searchResults.value = { posts: [], users: [], products: [], tags: [] }
  } finally {
    searching.value = false
  }
}

const addFollowChat = (user) => {
  const raw = localStorage.getItem('ppa_chats')
  const existing = raw ? JSON.parse(raw) : []
  if (!existing.find(c => c.name === user.name)) {
    const entry = {
      id: Date.now(),
      name: user.name,
      avatar: user.avatar,
      preview: '你们已成为好友，开始聊天吧！',
      time: '刚刚',
      unread: 1,
    }
    existing.unshift(entry)
    localStorage.setItem('ppa_chats', JSON.stringify(existing))
  }
  router.push(`/chat/${encodeURIComponent(user.name)}`)
}

const goProfile = (name) => {
  router.push(`/profile/${encodeURIComponent(name)}`)
}

const clearSearch = () => {
  searchResults.value = null
}

const onMainScroll = (e) => {
  navHidden.value = e.target.scrollTop > 20
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <img class="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" alt="avatar" @click="showSidebar = true"/>
        <div class="flex-1 mx-3">
          <div v-if="!searchMode" class="flex items-center bg-gray-100 rounded-full px-3 h-9 gap-1.5 cursor-pointer" @click="enterSearch">
            <iconify-icon class="text-gray-400 text-sm" icon="solar:magnifer-linear"></iconify-icon>
            <span class="text-xs text-gray-400">搜索</span>
          </div>
          <div v-else class="flex items-center bg-gray-100 rounded-full px-3 h-9 gap-1.5">
            <iconify-icon class="text-gray-400 text-sm shrink-0" icon="solar:magnifer-linear"></iconify-icon>
            <input ref="searchInput" v-model="searchQuery" placeholder="搜索宠物、商品、用户..." class="flex-1 bg-transparent outline-none text-xs text-[#5D4037] placeholder-gray-300 min-w-0" @keyup.enter="doSearch"/>
            <button class="shrink-0 text-[10px] text-gray-400 font-medium px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors" @click="exitSearch">取消</button>
          </div>
        </div>
        <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" @click="router.push('/settings')">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:settings-linear"></iconify-icon>
        </button>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar" @scroll="onMainScroll">
        <template v-if="searchResults">
          <div class="px-4 pt-3 pb-2 border-b border-[#F0F0F0]">
            <button class="text-xs text-[#FF85A2] font-medium px-2 py-1 rounded-lg hover:bg-[#FDF0F3] transition-colors" @click="clearSearch">‹ 返回推荐</button>
          </div>

          <div v-if="searchResults.posts.length" class="px-4 pt-3 pb-2">
            <h3 class="text-xs font-black text-[#5D4037] mb-2">相关帖子</h3>
            <div class="space-y-2">
              <div v-for="p in searchResults.posts" :key="p.id" class="flex items-start gap-2 p-2 rounded-xl bg-gray-50 cursor-pointer" @click="goProfile(p.nickname)">
                <img :src="p.avatar" class="w-8 h-8 rounded-full object-cover shrink-0"/>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-[#5D4037] truncate">{{ p.nickname }}</p>
                  <p class="text-[10px] text-gray-500 truncate">{{ p.content }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="searchResults.users.length" class="px-4 pt-3 pb-2">
            <h3 class="text-xs font-black text-[#5D4037] mb-2">相关用户</h3>
            <div class="space-y-2">
              <div v-for="u in searchResults.users" :key="u.name" class="flex items-center gap-2 p-2 rounded-xl bg-gray-50 cursor-pointer" @click="goProfile(u.name)">
                <img :src="u.avatar" class="w-8 h-8 rounded-full object-cover shrink-0"/>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-[#5D4037] truncate">{{ u.name }}</p>
                  <p class="text-[9px] text-gray-400 truncate">{{ u.desc }}</p>
                </div>
                <button class="shrink-0 px-3 py-1 rounded-full bg-[#FF85A2] text-white text-[9px] font-bold" @click.stop="addFollowChat(u)">关注</button>
              </div>
            </div>
          </div>

          <div v-if="searchResults.products.length" class="px-4 pt-3 pb-2">
            <h3 class="text-xs font-black text-[#5D4037] mb-2">相关商品</h3>
            <div class="space-y-2">
              <div v-for="(p, idx) in searchResults.products" :key="idx" class="flex items-center gap-2 p-2 rounded-xl bg-gray-50">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD1DC] to-[#FF85A2]/30 shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-[#5D4037] truncate">{{ p.name }}</p>
                  <span class="text-[9px] text-[#FF85A2] font-bold">¥{{ p.price }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="searchResults.tags.length" class="px-4 pt-3 pb-4">
            <h3 class="text-xs font-black text-[#5D4037] mb-2">相关标签</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in searchResults.tags" :key="tag" class="px-2.5 py-1 rounded-full bg-[#FDF0F3] text-[10px] text-[#FF85A2] font-medium">{{ tag }}</span>
            </div>
          </div>

          <div v-if="!searchResults.posts.length && !searchResults.users.length && !searchResults.products.length && !searchResults.tags.length" class="flex items-center justify-center h-40 text-xs text-gray-300">
            未找到相关内容
          </div>
        </template>

        <template v-else>
          <div class="flex border-b border-[#F0F0F0] px-4">
            <button v-for="tab in ['推荐', '热点']" :key="tab" class="flex-1 py-3 text-sm font-bold text-center transition-colors relative" :class="activeTab === tab ? 'text-[#FF85A2]' : 'text-gray-400'" @click="activeTab = tab">
              {{ tab }}
              <div v-if="activeTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#FF85A2] rounded-full"></div>
            </button>
          </div>

          <template v-if="activeTab === '推荐'">
            <div class="px-4 pt-4 pb-4 space-y-3">
              <div v-for="(item, idx) in recommendItems" :key="idx" class="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" @click="router.push('/detail')">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD1DC] to-[#FF85A2]/30 flex items-center justify-center text-white shrink-0">
                  <iconify-icon class="text-2xl" icon="solar:magic-stick-3-bold"></iconify-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-[#5D4037] truncate">{{ item.title }}</p>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] text-[#FF85A2] bg-[#FDF0F3] px-1.5 py-0.5 rounded">{{ item.tag }}</span>
                    <span class="text-[10px] text-gray-300">{{ item.views }} 阅读</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mx-4 h-px bg-[#F0F0F0]"></div>

            <div class="px-4 pt-4 pb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-black text-[#5D4037]">推荐关注</h3>
                <button class="text-xs text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">显示更多 ›</button>
              </div>
              <div class="space-y-3">
              <div v-for="(user, idx) in followUsers" :key="idx" class="flex items-center gap-3 cursor-pointer" @click="goProfile(user.name)">
                <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full object-cover"/>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-[#5D4037] truncate">{{ user.name }}</p>
                  <p class="text-[10px] text-gray-400 truncate">{{ user.desc }}</p>
                </div>
                <button class="shrink-0 px-4 py-1.5 rounded-full bg-[#FF85A2] text-white text-[10px] font-bold hover:bg-[#f0738f] transition-colors" @click.stop="addFollowChat(user)">关注</button>
              </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="px-4 pt-4 pb-6">
              <div class="flex items-center gap-2 mb-4">
                <iconify-icon class="text-[#FF85A2] text-lg" icon="solar:fire-bold"></iconify-icon>
                <h3 class="text-sm font-black text-[#5D4037]">站内热帖 TOP 10</h3>
              </div>
              <div class="space-y-2">
                <div v-for="(post, idx) in hotPosts" :key="post.rank" class="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" @click="goProfile(post.nickname)">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-black" :class="post.rank <= 3 ? 'bg-[#FFD1DC] text-[#FF85A2]' : 'bg-gray-200 text-gray-400'">
                    {{ post.rank }}
                  </div>
                  <img :src="post.avatar" class="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"/>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold text-[#5D4037] truncate">{{ post.nickname }}</p>
                    <p class="text-[10px] text-gray-500 truncate mt-0.5">{{ post.content }}</p>
                    <div class="flex items-center gap-3 mt-1.5">
                      <span class="text-[9px] text-gray-300">❤️ {{ post.likes }}</span>
                      <span class="text-[9px] text-gray-300">💬 {{ post.comments }}</span>
                      <span class="text-[9px] text-gray-300">👁️ {{ post.views }}</span>
                      <span class="text-[9px] text-[#FF85A2] font-bold ml-auto">🔥 {{ post.heat }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </main>

      <BottomNav :hidden="navHidden" />
      <Sidebar :show="showSidebar" @close="showSidebar = false" />
    </div>
  </div>
</template>
