<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Sidebar from '../components/Sidebar.vue'
import PostCard from '../components/PostCard.vue'

const router = useRouter()

const showSidebar = ref(false)
const navHidden = ref(false)
const activeTab = ref('social')

const posts = ref([
  {
    id: 1,
    nickname: '元宝麻麻',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
    time: '2026.04.28 · 上海',
    content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg'],
    location: '上海·徐汇区',
    likes: '1.2k',
    comments: '48',
    retweets: '126',
    views: '5.6k',
    favorites: '234',
    hasBadge: true,
    liked: false,
  },
  {
    id: 2,
    nickname: '大白姐姐',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg',
    time: '昨天 · 成都',
    content: '锦城公园今天的落日也太美了🌇 大白跑得很开心！捡到一根超粗的树枝当宝贝叼了一路～',
    images: [
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg',
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg',
    ],
    location: '成都·锦城公园',
    video: '',
    likes: '2.1k',
    comments: '67',
    retweets: '312',
    views: '8.2k',
    favorites: '456',
    hasBadge: true,
    liked: true,
  },
  {
    id: 3,
    nickname: '团子爸爸',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg',
    time: '2小时前 · 北京',
    content: '给团子做了自制猫饭，鸡胸肉+蛋黄+胡萝卜，吃得吧唧嘴😋 配方在评论区自取~',
    images: [
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg',
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg',
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg',
      'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg',
    ],
    likes: '856',
    comments: '23',
    retweets: '89',
    views: '3.1k',
    favorites: '178',
    hasBadge: false,
    liked: false,
  },
  {
    id: 4,
    nickname: '宠爱严选',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg',
    time: '赞助 · 广告',
    content: '换季啦！主子胃口不好？试试这款元气奶油猫窝限定套餐，内含猫窝+罐头+玩具，限时7折！🐱🎉',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg'],
    likes: '458',
    comments: '12',
    retweets: '67',
    views: '12.3k',
    favorites: '89',
    hasBadge: false,
    liked: false,
    isAd: true,
    brandLogo: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg',
    brandName: '宠爱严选',
  },
])

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('ppa_new_posts') || '[]')
  if (stored.length) {
    posts.value.unshift(...stored)
    localStorage.removeItem('ppa_new_posts')
  }
})

const switchTab = (tab) => { activeTab.value = tab }
const openPostEdit = () => { router.push('/post-edit') }

const onMainScroll = (e) => {
  const el = e.target
  const threshold = 20
  navHidden.value = el.scrollTop > threshold
}

const toggleLike = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) {
    p.liked = !p.liked
    p.likes = p.liked ? String(Number(p.likes.replace('k', '000').replace('.', '')) + 1) : String(Number(p.likes.replace('k', '000').replace('.', '')) - 1)
  }
}
const toggleRetweet = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) { p.retweeted = !p.retweeted }
}
const toggleFavorite = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) { p.favorited = !p.favorited }
}
const onComment = (id) => {}
const onShare = (id) => {}
const onMore = (id) => {}
const goProfile = (name) => { router.push(`/profile/${encodeURIComponent(name)}`) }

const dragScroll = (e) => {
  const el = e.currentTarget
  const startX = e.pageX - el.offsetLeft
  const scrollLeft = el.scrollLeft
  const onMove = (ev) => {
    const x = ev.pageX - el.offsetLeft
    el.scrollLeft = scrollLeft - (x - startX)
  }
  document.addEventListener('pointermove', onMove)
  document.addEventListener('pointerup', () => {
    document.removeEventListener('pointermove', onMove)
  }, { once: true })
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="sticky top-0 z-20 bg-white/80 backdrop-blur-lg">
        <div class="flex items-center px-4 h-11">
          <button class="w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity" @click="showSidebar = true">
            <img class="w-full h-full object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" alt="avatar"/>
          </button>
          <div class="flex-1 flex justify-center">
            <div class="relative">
              <div class="w-8 h-8 bg-gradient-to-b from-[#FFF5F7] to-[#FFFDF9] rounded-full flex items-center justify-center">
                <div class="mascot-float w-7 h-7 bg-[#FFD1DC] rounded-lg flex flex-col items-center justify-center border-2 border-white creamy-shadow">
                  <div class="flex gap-1.5 mb-0.5">
                    <div class="w-1 h-1 bg-[#5D4037] rounded-full animate-bounce"></div>
                    <div class="w-1 h-1 bg-[#5D4037] rounded-full animate-bounce" style="animation-delay:0.1s"></div>
                  </div>
                  <div class="w-2 h-1 border-b border-[#5D4037] rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
          <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" @click="router.push('/setting')">
            <iconify-icon class="text-gray-400 text-lg" icon="solar:settings-linear"></iconify-icon>
          </button>
        </div>
        <div class="flex border-b border-[#F0F0F0] px-4">
          <button class="flex-1 py-2.5 text-sm font-bold text-center transition-colors relative" :class="activeTab === 'social' ? 'text-[#FF85A2]' : 'text-gray-400'" @click="switchTab('social')">
            推荐
            <div v-if="activeTab === 'social'" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#FF85A2] rounded-full"></div>
          </button>
          <button class="flex-1 py-2.5 text-sm font-bold text-center transition-colors relative" :class="activeTab === 'mall' ? 'text-[#FF85A2]' : 'text-gray-400'" @click="switchTab('mall')">
            商城
            <div v-if="activeTab === 'mall'" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#FF85A2] rounded-full"></div>
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar bg-white" @scroll="onMainScroll">
        <div v-show="activeTab === 'social'">
          <div class="flex gap-4 overflow-x-auto custom-scrollbar px-4 py-3 border-b border-[#F0F0F0] snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing" @pointerdown="dragScroll">
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start">
              <div class="w-14 h-14 rounded-full border-2 border-[#FFD1DC] p-0.5 cursor-pointer" @click="openPostEdit">
                <div class="w-full h-full rounded-full bg-[#FFE4E1] flex items-center justify-center">
                  <iconify-icon class="text-[#FF85A2] text-2xl" icon="solar:camera-add-bold"></iconify-icon>
                </div>
              </div>
              <span class="text-[10px] text-gray-400">发布</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start cursor-pointer" @click="router.push('/search')">
              <img alt="Pet Story 1" class="w-14 h-14 rounded-full border-2 border-white ring-1 ring-gray-200 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg"/>
              <span class="text-[10px] text-gray-400">布丁酱</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start cursor-pointer" @click="router.push('/search')">
              <img alt="Pet Story 2" class="w-14 h-14 rounded-full border-2 border-white ring-1 ring-gray-200 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg"/>
              <span class="text-[10px] text-gray-400">可乐</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start cursor-pointer" @click="router.push('/search')">
              <img alt="Pet Story 3" class="w-14 h-14 rounded-full border-2 border-white ring-1 ring-gray-200 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg"/>
              <span class="text-[10px] text-gray-400">团子</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start cursor-pointer" @click="router.push('/search')">
              <img alt="Pet Story 4" class="w-14 h-14 rounded-full border-2 border-white ring-1 ring-gray-200 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg"/>
              <span class="text-[10px] text-gray-400">大白</span>
            </div>
          </div>

          <PostCard
            v-for="post in posts"
            :key="post.id"
            v-bind="post"
            @like="toggleLike"
            @comment="onComment"
            @retweet="toggleRetweet"
            @favorite="toggleFavorite"
            @share="onShare"
            @more="onMore"
            @location-click="(id) => router.push('/location')"
            @avatar-click="goProfile"
          />
        </div>

        <div v-show="activeTab === 'mall'" class="px-4 pt-4 pb-20">
          <div class="relative rounded-[32px] overflow-hidden mb-6">
            <img alt="Mall Banner" class="w-full h-40 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg"/>
            <div class="absolute inset-0 bg-gradient-to-r from-pink-200/40 to-transparent flex flex-col justify-center p-6">
              <span class="text-[10px] bg-white text-[#FF85A2] w-fit px-2 py-0.5 rounded-full mb-2 font-bold italic">2026 春季上新</span>
              <h2 class="text-xl font-black text-white drop-shadow-sm">元气奶油猫窝<br/>限时 7 折</h2>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4 mb-8">
            <div class="flex flex-col items-center gap-2">
              <div class="w-12 h-12 bg-[#FFF9C4] rounded-2xl flex items-center justify-center">
                <iconify-icon class="text-[#D4AF37] text-2xl" icon="solar:bone-bold"></iconify-icon>
              </div>
              <span class="text-[11px] text-gray-500">主粮</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-12 h-12 bg-[#E6E6FA] rounded-2xl flex items-center justify-center">
                <iconify-icon class="text-[#9370DB] text-2xl" icon="solar:refrigerator-bold"></iconify-icon>
              </div>
              <span class="text-[11px] text-gray-500">零食</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-12 h-12 bg-[#C1E1C1] rounded-2xl flex items-center justify-center">
                <iconify-icon class="text-[#556B2F] text-2xl" icon="solar:hospital-bold"></iconify-icon>
              </div>
              <span class="text-[11px] text-gray-500">医疗</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <div class="w-12 h-12 bg-[#FFD1DC] rounded-2xl flex items-center justify-center">
                <iconify-icon class="text-[#C71585] text-2xl" icon="solar:t-shirt-bold"></iconify-icon>
              </div>
              <span class="text-[11px] text-gray-500">服饰</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="router.push('/detail')">
              <img alt="Product" class="w-full aspect-square rounded-2xl object-cover mb-2" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg"/>
              <h4 class="text-xs font-bold text-[#5D4037] truncate">高钙羊乳肉垫冻干</h4>
              <div class="flex items-center gap-1 my-1">
                <span class="text-[9px] bg-[#FDF0F3] text-[#FF85A2] px-1.5 py-0.5 rounded">自营</span>
                <span class="text-[9px] text-gray-300">已售 2k+</span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-[#FF85A2] font-black">¥29.9</span>
                <button class="w-7 h-7 bg-[#FFD1DC] rounded-full flex items-center justify-center text-white">
                  <iconify-icon icon="solar:cart-large-minimalistic-bold"></iconify-icon>
                </button>
              </div>
            </div>
            <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="router.push('/detail')">
              <img alt="Product" class="w-full aspect-square rounded-2xl object-cover mb-2" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg"/>
              <h4 class="text-xs font-bold text-[#5D4037] truncate">元宝定制猫抓板</h4>
              <div class="flex items-center gap-1 my-1">
                <span class="text-[9px] bg-[#EAF2FF] text-[#A7C7E7] px-1.5 py-0.5 rounded">联名</span>
                <span class="text-[9px] text-gray-300">已售 800+</span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-[#FF85A2] font-black">¥88.0</span>
                <button class="w-7 h-7 bg-[#A7C7E7] rounded-full flex items-center justify-center text-white">
                  <iconify-icon icon="solar:cart-large-minimalistic-bold"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav :hidden="navHidden" />

      <Sidebar :show="showSidebar" @close="showSidebar = false" />

    </div>
  </div>
</template>
