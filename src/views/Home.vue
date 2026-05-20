<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import PostCard from '../components/PostCard.vue'

const router = useRouter()

const showUpload = ref(false)
const showSidebar = ref(false)
const activeTab = ref('social')

const posts = ref([
  {
    id: 1,
    nickname: '元宝麻麻',
    username: 'yuanbao_mama',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
    time: '2026.04.28',
    location: '上海·徐汇区',
    content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg',
    likes: '1.2k',
    comments: '48',
    hasBadge: true,
    liked: false,
  },
  {
    id: 2,
    nickname: '豆奶同学',
    username: 'dounai',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
    time: '刚刚',
    location: '杭州·西湖区',
    content: '周末西溪湿地走起，有小伙伴一起吗？',
    image: '',
    likes: '328',
    comments: '12',
    hasBadge: false,
    liked: false,
    isWalkPost: true,
    walkLocation: '西溪湿地南门',
    walkTime: '16:00见',
  },
  {
    id: 3,
    nickname: '团子爸爸',
    username: 'tuanzi_daddy',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg',
    time: '2小时前',
    location: '北京·朝阳区',
    content: '给团子做了自制猫饭，鸡胸肉+蛋黄+胡萝卜，吃得吧唧嘴😋 配方在评论区自取~',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg',
    likes: '856',
    comments: '23',
    hasBadge: false,
    liked: false,
  },
  {
    id: 4,
    nickname: '大白姐姐',
    username: 'baibai_sis',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg',
    time: '昨天',
    location: '成都·锦江区',
    content: '锦城公园今天的落日也太美了🌇 大白跑得很开心！',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg',
    likes: '2.1k',
    comments: '67',
    hasBadge: true,
    liked: true,
  },
])

const switchTab = (tab) => { activeTab.value = tab }
const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }

const onLike = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) {
    p.liked = !p.liked
    p.likes = p.liked ? String(Number(p.likes.replace('k', '000').replace('.', '')) + 1) : String(Number(p.likes.replace('k', '000').replace('.', '')) - 1)
  }
}
const onComment = (id) => { /* open comment sheet */ }
const onShare = (id) => { /* open share modal */ }
const onJoinWalk = (id) => { router.push('/location') }

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
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl relative border-[8px] border-white flex flex-col pt-10">
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

      <main class="flex-1 overflow-y-auto custom-scrollbar bg-white">
        <div v-show="activeTab === 'social'">
          <div class="flex gap-4 overflow-x-auto custom-scrollbar px-4 py-3 border-b border-[#F0F0F0] snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing" @pointerdown="dragScroll">
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start">
              <div class="w-14 h-14 rounded-full border-2 border-[#FFD1DC] p-0.5 cursor-pointer" @click="fabClick">
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
            @like="onLike"
            @comment="onComment"
            @share="onShare"
            @join-walk="onJoinWalk"
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

      <button
        class="absolute bottom-24 right-5 w-14 h-14 bg-[#FF85A2] rounded-full flex items-center justify-center shadow-lg shadow-pink-200/60 z-50 active:scale-90 transition-transform"
        @click="fabClick"
      >
        <span class="text-white text-3xl font-bold leading-none">+</span>
      </button>
      <BottomNav @fab-click="fabClick" />

      <Transition name="fade">
        <div v-if="showUpload" class="overlay" @click="hideUpload"></div>
      </Transition>
      <Transition name="fade">
        <div v-if="showSidebar" class="overlay z-30" @click="showSidebar = false"></div>
      </Transition>
      <Transition name="slide-right">
        <div v-if="showSidebar" class="absolute left-0 top-0 bottom-0 w-[280px] z-40 bg-white flex flex-col pt-10 shadow-2xl rounded-[32px]" @click.stop>
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div class="px-4 pt-4 pb-3">
              <div class="flex items-center gap-3 mb-3">
                <div class="relative">
                  <img class="w-16 h-16 rounded-[24px] object-cover ring-2 ring-[#FFD1DC]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg" alt="avatar"/>
                  <div class="absolute -bottom-1 -right-1 bg-[#A7C7E7] text-white p-1 rounded-full border-2 border-white">
                    <iconify-icon class="text-[8px]" icon="solar:check-read-bold"></iconify-icon>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h2 class="text-base font-black text-[#5D4037]">元宝麻麻</h2>
                  <p class="text-[9px] text-gray-400 flex items-center gap-1">
                    元仔ID: 20260428 <iconify-icon class="text-[9px]" icon="solar:copy-linear"></iconify-icon>
                  </p>
                </div>
              </div>
              <div class="flex gap-4 text-xs">
                <span class="text-gray-400"><b class="text-[#5D4037]">128</b> 关注</span>
                <span class="text-gray-400"><b class="text-[#5D4037]">3.5k</b> 粉丝</span>
                <span class="text-gray-400"><b class="text-[#5D4037]">892</b> 获赞</span>
              </div>
            </div>

            <div class="px-4 py-3 border-t border-[#F5F5F5]">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-xs font-black text-[#5D4037]">我的宠物档案</h3>
                <button class="text-[#FF85A2] text-[9px] font-bold flex items-center gap-1" @click="showSidebar = false">
                  <iconify-icon icon="solar:add-circle-linear"></iconify-icon>添加
                </button>
              </div>
              <div class="flex gap-3 overflow-x-auto custom-scrollbar">
                <div class="shrink-0 w-32 p-3 rounded-[24px] flex flex-col items-center" style="border:3px solid #FFD1DC;background:#FFF5F7">
                  <img class="w-12 h-12 rounded-full border-2 border-white mb-1 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/9db4ef934a764915b9babc24b74a33e4.jpg" alt="pet"/>
                  <h3 class="text-[11px] font-bold text-[#5D4037]">萨摩耶·元宝</h3>
                  <span class="text-[8px] bg-white text-[#FF85A2] px-2 py-0.5 rounded-full mt-1 font-bold">当前身份</span>
                </div>
                <div class="shrink-0 w-32 p-3 rounded-[24px] flex flex-col items-center bg-white border border-gray-100">
                  <img class="w-12 h-12 rounded-full border-2 border-white mb-1 object-cover opacity-50" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/df08b7ec8be74879831b12017bce837e.jpg" alt="pet"/>
                  <h3 class="text-[11px] font-bold text-gray-400">英短·饭团</h3>
                  <span class="text-[8px] text-gray-300 mt-1">点击切换</span>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 border-t border-[#F5F5F5]">
              <div class="grid grid-cols-2 gap-2">
                <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50" @click="router.push('/order'); showSidebar = false">
                  <div class="w-9 h-9 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white shrink-0">
                    <iconify-icon class="text-lg" icon="solar:wallet-bold"></iconify-icon>
                  </div>
                  <div class="text-left min-w-0">
                    <span class="block text-[11px] font-bold text-[#5D4037]">我的订单</span>
                    <span class="text-[8px] text-gray-400">2个待收货</span>
                  </div>
                </button>
                <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50 cursor-pointer" @click="showSidebar = false">
                  <div class="w-9 h-9 bg-[#A7C7E7] rounded-xl flex items-center justify-center text-white shrink-0">
                    <iconify-icon class="text-lg" icon="solar:star-bold"></iconify-icon>
                  </div>
                  <div class="text-left min-w-0">
                    <span class="block text-[11px] font-bold text-[#5D4037]">我的收藏</span>
                    <span class="text-[8px] text-gray-400">45个宝贝</span>
                  </div>
                </button>
                <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50 cursor-pointer" @click="showSidebar = false">
                  <div class="w-9 h-9 bg-[#C1E1C1] rounded-xl flex items-center justify-center text-white shrink-0">
                    <iconify-icon class="text-lg" icon="solar:chat-round-bold"></iconify-icon>
                  </div>
                  <div class="text-left min-w-0">
                    <span class="block text-[11px] font-bold text-[#5D4037]">消息中心</span>
                    <span class="text-[8px] text-gray-400">99+ 未读</span>
                  </div>
                </button>
                <button class="flex items-center gap-2 bg-white rounded-2xl p-3 border border-gray-50" @click="router.push('/setting'); showSidebar = false">
                  <div class="w-9 h-9 bg-[#E6E6FA] rounded-xl flex items-center justify-center text-white shrink-0">
                    <iconify-icon class="text-lg" icon="solar:shield-user-bold"></iconify-icon>
                  </div>
                  <div class="text-left min-w-0">
                    <span class="block text-[11px] font-bold text-[#5D4037]">账号安全</span>
                    <span class="text-[8px] text-gray-400">已实名认证</span>
                  </div>
                </button>
              </div>
            </div>

            <div class="mx-4 mb-3 p-3 rounded-[24px] bg-[#F0F7FF]/50 border border-[#F0F7FF]">
              <div class="flex items-center gap-1.5 mb-2">
                <iconify-icon class="text-[#A7C7E7] text-sm" icon="solar:magic-stick-3-bold"></iconify-icon>
                <span class="text-[11px] font-black text-[#5D4037]">元宝的专属好物</span>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 bg-white rounded-xl p-2 flex items-center gap-2" @click="router.push('/detail'); showSidebar = false">
                  <img class="w-8 h-8 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg" alt="product"/>
                  <div class="min-w-0">
                    <span class="block text-[9px] font-bold text-[#5D4037] truncate">萨摩耶泪痕清理液</span>
                    <span class="text-[9px] text-[#FF85A2] font-black">¥48.0</span>
                  </div>
                </button>
                <button class="flex-1 bg-white rounded-xl p-2 flex items-center gap-2" @click="router.push('/detail'); showSidebar = false">
                  <img class="w-8 h-8 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg" alt="product"/>
                  <div class="min-w-0">
                    <span class="block text-[9px] font-bold text-[#5D4037] truncate">耐咬大骨头</span>
                    <span class="text-[9px] text-[#FF85A2] font-black">¥19.9</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="px-4 py-3 border-t border-[#F0F0F0]">
            <button class="w-full py-2.5 rounded-xl bg-[#FDF0F3] text-[#FF85A2] text-sm font-bold" @click="router.push('/auth'); showSidebar = false">
              退出登录
            </button>
          </div>
        </div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showUpload" class="sheet">
        <div class="flex flex-col items-center gap-2 mb-6">
          <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
          <span class="text-sm font-bold text-[#5D4037]">发布动态</span>
        </div>
        <div class="flex gap-6 justify-center">
          <button class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 bg-[#FFD1DC] rounded-[24px] flex items-center justify-center creamy-shadow">
              <iconify-icon class="text-white text-3xl" icon="solar:camera-bold"></iconify-icon>
            </div>
            <span class="text-xs font-bold text-[#5D4037]">拍照</span>
          </button>
          <button class="flex flex-col items-center gap-2">
            <div class="w-16 h-16 bg-[#A7C7E7] rounded-[24px] flex items-center justify-center creamy-shadow">
              <iconify-icon class="text-white text-3xl" icon="solar:gallery-bold"></iconify-icon>
            </div>
            <span class="text-xs font-bold text-[#5D4037]">从相册选择</span>
          </button>
        </div>
        <button class="w-full mt-6 py-3 rounded-2xl bg-[#FDF0F3] text-[#FF85A2] text-sm font-bold" @click="hideUpload">取消</button>
      </div></Transition>
    </div>
  </div>
</template>
