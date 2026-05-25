<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNav from '../../components/BottomNav.vue'
import Sidebar from '../../components/Sidebar.vue'
import PostCard from '../../components/PostCard.vue'

const route = useRoute()
const router = useRouter()

const showSidebar = ref(false)
const navHidden = ref(false)
let lastScrollTop = 0
const activeTab = ref('social')

const posts = ref([
  { id: 1, type: 'post', nickname: '元宝麻麻', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg', time: '2026.04.28 · 上海', content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg'], location: '上海·徐汇区', likes: '1.2k', comments: '48', retweets: '126', views: '5.6k', favorites: '234', hasBadge: true, liked: false },
  { id: 101, type: 'post', nickname: '奶油的麻麻', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg', time: '今天 · 杭州', content: '下午有人一起遛狗吗？西溪湿地南门16:00见～', walk: { title: '下午有人一起遛狗吗？', location: '西溪湿地南门', time: '16:00', owner: '奶油的麻麻', distance: '500m' }, likes: '23', comments: '5', retweets: '8', views: '456', favorites: '12' },
  { id: 2, type: 'post', nickname: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', time: '昨天 · 成都', content: '锦城公园今天的落日也太美了🌇 大白跑得很开心！捡到一根超粗的树枝当宝贝叼了一路～', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg', 'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg'], location: '成都·锦城公园', likes: '2.1k', comments: '67', retweets: '312', views: '8.2k', favorites: '456', hasBadge: true, liked: true },
  { id: 4, type: 'ad', nickname: '宠爱严选', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg', time: '赞助 · 广告', content: '换季啦！主子胃口不好？试试这款元气奶油猫窝限定套餐，内含猫窝+罐头+玩具，限时7折！🐱🎉', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg'], likes: '458', comments: '12', retweets: '67', views: '12.3k', favorites: '89', isAd: true, brandLogo: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg', brandName: '宠爱严选' },
  { id: 3, type: 'post', nickname: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', time: '2小时前 · 北京', content: '给团子做了自制猫饭，鸡胸肉+蛋黄+胡萝卜，吃得吧唧嘴😋 配方在评论区自取~', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg', 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', 'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg'], likes: '856', comments: '23', retweets: '89', views: '3.1k', favorites: '178', liked: false },
  { id: 102, type: 'post', nickname: '柯基·短腿的爸爸', avatar: 'https://picsum.photos/200?random=7', time: '明天 · 北京', content: '周末早晨朝阳公园约跑！家有柯基的看过来～', walk: { title: '周末早晨一起去公园跑步', location: '朝阳公园东门', time: '08:00', owner: '柯基·短腿的爸爸', distance: '1.2km' }, likes: '15', comments: '3', retweets: '6', views: '234', favorites: '8' },
  { id: 5, type: 'ad', nickname: 'PetHome宠物生活', avatar: 'https://picsum.photos/200?random=10', time: '赞助 · 广告', content: '夏季必备！宠物冰垫限时抢购，让毛孩子清凉一夏🌊 满199减30', images: ['https://picsum.photos/400/400?random=20'], likes: '234', comments: '8', retweets: '34', views: '6.7k', favorites: '56', isAd: true, brandLogo: 'https://picsum.photos/200?random=10', brandName: 'PetHome宠物生活' },
  { id: 6, type: 'post', nickname: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', time: '3小时前 · 深圳', content: '今天带布丁去做了年度体检，医生说它太胖了要减肥😂 以后每天控制零食量，有没有一起打卡减肥的毛孩子家长？', images: ['https://picsum.photos/400/400?random=21'], likes: '1.5k', comments: '89', retweets: '203', views: '4.2k', favorites: '312', hasBadge: true, liked: false },
  { id: 103, type: 'post', nickname: '萨摩耶·团子的麻麻', avatar: 'https://picsum.photos/200?random=8', time: '今天 · 上海', content: '晚上滨江道遛狗组队啦，萨摩耶求偶遇！', walk: { title: '滨江道傍晚遛狗组队', location: '滨江道步行街', time: '18:30', owner: '萨摩耶·团子的麻麻', distance: '800m' }, likes: '31', comments: '7', retweets: '12', views: '567', favorites: '23' },
  { id: 7, type: 'ad', nickname: '皇家宠物食品', avatar: 'https://picsum.photos/200?random=11', time: '赞助 · 广告', content: '皇家新品上线！处方粮系列，专为敏感肠胃设计，兽医师推荐品牌🎯 限时赠送试吃装', images: ['https://picsum.photos/400/400?random=22'], likes: '1.1k', comments: '45', retweets: '156', views: '9.8k', favorites: '178', isAd: true, brandLogo: 'https://picsum.photos/200?random=11', brandName: '皇家宠物食品' },
  { id: 8, type: 'post', nickname: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', time: '昨天 · 广州', content: '七喜第一次见到大海，疯狂在沙滩上跑圈😂 结果追浪花被淋成了落汤鸡，回家的车上就呼呼大睡了💤', images: ['https://picsum.photos/400/400?random=23', 'https://picsum.photos/400/401?random=24'], likes: '3.2k', comments: '134', retweets: '456', views: '15.6k', favorites: '567', hasBadge: true, liked: false },
  { id: 104, type: 'post', nickname: '英短·饭团的姐姐', avatar: 'https://picsum.photos/200?random=9', time: '明天 · 深圳', content: '周末带猫去世纪公园草坪晒太阳，有一起的吗？', walk: { title: '一起带猫去草坪晒太阳', location: '世纪公园2号门', time: '14:00', owner: '英短·饭团的姐姐', distance: '1.5km' }, likes: '42', comments: '11', retweets: '18', views: '789', favorites: '34' },
  { id: 9, type: 'ad', nickname: '疯狂小狗', avatar: 'https://picsum.photos/200?random=12', time: '赞助 · 广告', content: '618大促预热！全场狗粮买三送一，巅峰、渴望、爱肯拿都有货🔥 手慢无！', images: ['https://picsum.photos/400/400?random=25'], likes: '678', comments: '23', retweets: '89', views: '7.3k', favorites: '123', isAd: true, brandLogo: 'https://picsum.photos/200?random=12', brandName: '疯狂小狗' },
  { id: 10, type: 'post', nickname: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', time: '5小时前 · 杭州', content: '今日份的糯米营业照📸 英短的优雅是与生俱来的～新买的领结太好看了，疯狂拍照一百张！', images: ['https://picsum.photos/400/400?random=26', 'https://picsum.photos/400/401?random=27', 'https://picsum.photos/400/402?random=28'], likes: '2.8k', comments: '97', retweets: '345', views: '11.2k', favorites: '678', hasBadge: true, liked: false },
  { id: 105, type: 'post', nickname: '柴犬·豆包的爸爸', avatar: 'https://picsum.photos/200?random=13', time: '后天 · 杭州', content: '西湖边遛狗约起来！柴犬豆包找玩伴～', walk: { title: '明天下午西湖边遛狗约吗', location: '西湖断桥残雪', time: '15:30', owner: '柴犬·豆包的爸爸', distance: '2km' }, likes: '27', comments: '6', retweets: '9', views: '345', favorites: '15' },
])

const storyUsers = [
  { name: '布丁酱', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg' },
  { name: '可乐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg' },
  { name: '团子', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg' },
  { name: '大白', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg' },
  { name: '泡芙', avatar: 'https://picsum.photos/200?random=1' },
  { name: '毛球', avatar: 'https://picsum.photos/200?random=2' },
  { name: '布丁', avatar: 'https://picsum.photos/200?random=4' },
  { name: '糯米', avatar: 'https://picsum.photos/200?random=6' },
]

const switchTab = (tab) => { activeTab.value = tab }
const openPostEdit = () => { router.push('/post-edit') }

const onMainScroll = (e) => {
  const el = e.target
  const st = el.scrollTop
  if (st < lastScrollTop) {
    navHidden.value = false
  } else if (st > lastScrollTop && st > 10) {
    navHidden.value = true
  }
  lastScrollTop = st
}

const formatCount = (val) => {
  const n = typeof val === 'string' ? parseFloat(val.replace('k', '')) * 1000 : val
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}
const parseCount = (val) => {
  if (typeof val === 'number') return val
  const s = val.toLowerCase()
  if (s.endsWith('w')) return parseFloat(s) * 10000
  if (s.endsWith('k')) return parseFloat(s) * 1000
  return parseInt(s) || 0
}

const toggleLike = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) {
    p.liked = !p.liked
    const n = parseCount(p.likes) + (p.liked ? 1 : -1)
    p.likes = formatCount(Math.max(0, n))
  }
}
const toggleRetweet = (payload) => {
  const id = typeof payload === 'object' ? payload.id : payload
  const p = posts.value.find(x => x.id === id)
  if (!p) return
  p.retweeted = !p.retweeted
  const n = parseCount(p.retweets) + (p.retweeted ? 1 : -1)
  p.retweets = formatCount(Math.max(0, n))
}
const toggleFavorite = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (p) {
    p.favorited = !p.favorited
    const n = parseCount(p.favorites) + (p.favorited ? 1 : -1)
    p.favorites = formatCount(Math.max(0, n))
  }
}
const onComment = (payload) => {
  if (typeof payload === 'object' && payload.text) {
    alert(`评论已发送：${payload.text}`)
  } else {
    router.push('/detail')
  }
}
const onShare = (id) => {
  const p = posts.value.find(p => p.id === id)
  if (navigator.share) {
    navigator.share({ title: p?.nickname || '', text: p?.content || '', url: location.href })
  } else {
    navigator.clipboard?.writeText(`${p?.nickname}：${p?.content}`)
    alert('已复制分享内容')
  }
}
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

const carouselSlides = [
  { img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg', tag: '2026 春季上新', title: '元气奶油猫窝\n限时 7 折', subtitle: '猫窝+主粮+玩具全套装' },
  { img: 'https://picsum.photos/400/400?random=30', tag: '618 大促预热', title: '全场满199减30\n上不封顶', subtitle: '巅峰、渴望、爱肯拿补货' },
  { img: 'https://picsum.photos/400/400?random=31', tag: '夏季清凉专区', title: '冰垫凉席大促\n低至 ¥29', subtitle: '让毛孩子清凉一夏' },
  { img: 'https://picsum.photos/400/400?random=32', tag: '新品首发', title: '宠物鲜粮订阅\n首单五折', subtitle: '每周新鲜到家' },
  { img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg', tag: '口碑爆款', title: '高钙羊乳冻干\n回购率 98%', subtitle: '0添加0谷物' },
  { img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg', tag: '服饰专场', title: '春夏新款宠物服\nT恤低至 ¥39', subtitle: '多款花色可选' },
]
const carouselIndex = ref(0)
let carouselTimer

onMounted(() => {
  if (route.query.tab === 'mall') activeTab.value = 'mall'
  const stored = JSON.parse(localStorage.getItem('ppa_new_posts') || '[]')
  if (stored.length) {
    posts.value.unshift(...stored)
    localStorage.removeItem('ppa_new_posts')
  }
  carouselTimer = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % carouselSlides.length
  }, 3500)
})

onUnmounted(() => clearInterval(carouselTimer))

const parentCategory = ref('cat')
const childCategory = ref('')

const allProducts = [
  { id: 1, name: '高钙羊乳肉垫冻干', price: '¥29.9', sales: '2k+', tag: '自营', tagColor: '#FDF0F3', tagTextColor: '#FF85A2', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg', parent: 'cat', child: '零食' },
  { id: 2, name: '元宝定制猫抓板', price: '¥88.0', sales: '800+', tag: '联名', tagColor: '#EAF2FF', tagTextColor: '#A7C7E7', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg', parent: 'cat', child: '用品' },
  { id: 3, name: '全价成猫主粮', price: '¥168.0', sales: '5k+', tag: '自营', tagColor: '#FDF0F3', tagTextColor: '#FF85A2', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg', parent: 'cat', child: '主粮' },
  { id: 4, name: '英短田园猫零食罐', price: '¥12.9', sales: '1.2w+', tag: '热卖', tagColor: '#FFF9C4', tagTextColor: '#D4AF37', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg', parent: 'cat', child: '零食' },
  { id: 5, name: '猫咪连体卫衣', price: '¥79.0', sales: '600+', tag: '新品', tagColor: '#E6E6FA', tagTextColor: '#9370DB', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', parent: 'cat', child: '服饰' },
  { id: 6, name: '宠物猫狗通用冰垫', price: '¥59.0', sales: '3k+', tag: '夏季', tagColor: '#C1E1C1', tagTextColor: '#556B2F', img: 'https://picsum.photos/400/400?random=20', parent: 'dog', child: '用品' },
  { id: 7, name: '中大型犬主粮', price: '¥238.0', sales: '4k+', tag: '自营', tagColor: '#FDF0F3', tagTextColor: '#FF85A2', img: 'https://picsum.photos/400/400?random=22', parent: 'dog', child: '主粮' },
  { id: 8, name: '狗零食鸡肉干', price: '¥19.9', sales: '8k+', tag: '热卖', tagColor: '#FFF9C4', tagTextColor: '#D4AF37', img: 'https://picsum.photos/400/400?random=25', parent: 'dog', child: '零食' },
  { id: 9, name: '柴犬哈士奇T恤', price: '¥49.0', sales: '1.1k+', tag: '新品', tagColor: '#E6E6FA', tagTextColor: '#9370DB', img: 'https://picsum.photos/400/400?random=26', parent: 'dog', child: '服饰' },
  { id: 10, name: '宠物出行水杯', price: '¥39.9', sales: '2.5k+', tag: '便携', tagColor: '#C1E1C1', tagTextColor: '#556B2F', img: 'https://picsum.photos/400/401?random=27', parent: 'dog', child: '用品' },
  { id: 11, name: '猫犬通用磨牙棒', price: '¥15.0', sales: '9k+', tag: '爆款', tagColor: '#FFD1DC', tagTextColor: '#C71585', img: 'https://picsum.photos/400/402?random=28', parent: 'dog', child: '零食' },
  { id: 12, name: '宠物礼服四件套', price: '¥128.0', sales: '300+', tag: '限定', tagColor: '#EAF2FF', tagTextColor: '#A7C7E7', img: 'https://picsum.photos/400/403?random=29', parent: 'cat', child: '服饰' },
]

const filteredProducts = computed(() => {
  return allProducts.filter(p => {
    if (parentCategory.value && p.parent !== parentCategory.value) return false
    if (childCategory.value && p.child !== childCategory.value) return false
    return true
  })
})

const setParent = (parent) => {
  parentCategory.value = parent
  childCategory.value = ''
}
const setChild = (child) => {
  childCategory.value = child === childCategory.value ? '' : child
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
          <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" @click="router.push('/settings')">
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
          <div class="flex gap-4 overflow-x-auto custom-scrollbar px-4 py-3 border-b border-[#F0F0F0] snap-x snap-proximity select-none cursor-grab active:cursor-grabbing scroll-smooth" @pointerdown="dragScroll">
            <div class="flex flex-col items-center gap-1 shrink-0 snap-start">
              <div class="w-14 h-14 rounded-full border-2 border-[#FFD1DC] p-0.5 cursor-pointer" @click="openPostEdit">
                <div class="w-full h-full rounded-full bg-[#FFE4E1] flex items-center justify-center">
                  <iconify-icon class="text-[#FF85A2] text-2xl" icon="solar:camera-add-bold"></iconify-icon>
                </div>
              </div>
              <span class="text-[10px] text-gray-400">发布</span>
            </div>
            <div v-for="u in storyUsers" :key="u.name" class="flex flex-col items-center gap-1 shrink-0 snap-start cursor-pointer" @click="router.push('/profile/' + u.name)">
              <img class="w-14 h-14 rounded-full border-2 border-white ring-1 ring-gray-200 object-cover" :src="u.avatar" :alt="u.name"/>
              <span class="text-[10px] text-gray-400">{{ u.name }}</span>
            </div>
          </div>

          <PostCard
            v-for="item in posts"
            :key="item.id"
            v-bind="item"
            @like="toggleLike"
            @comment="onComment"
            @retweet="toggleRetweet"
            @favorite="toggleFavorite"
            @share="onShare"
            @detail="() => router.push('/detail')"
            @avatar-click="goProfile"
            @product="(id) => router.push('/product/' + id)"
            @walk-join="(id) => alert('已发送约遛申请')"
            @walk-view-map="() => router.push('/location')"
          />
        </div>

        <div v-show="activeTab === 'mall'" class="pb-4">
          <div class="relative rounded-2xl overflow-hidden mx-4 mb-4">
            <div class="relative w-full h-44 overflow-hidden rounded-2xl">
              <Transition name="fade">
                <img :key="carouselIndex" :src="carouselSlides[carouselIndex].img" class="absolute inset-0 w-full h-full object-cover"/>
              </Transition>
              <div class="absolute inset-0 bg-gradient-to-r from-pink-200/40 to-transparent flex flex-col justify-center p-6">
                <span class="text-[10px] bg-white text-[#FF85A2] w-fit px-2 py-0.5 rounded-full mb-2 font-bold italic">{{ carouselSlides[carouselIndex].tag }}</span>
                <h2 class="text-xl font-black text-white drop-shadow-sm" style="white-space: pre-line">{{ carouselSlides[carouselIndex].title }}</h2>
                <p class="text-[10px] text-white/80 mt-1">{{ carouselSlides[carouselIndex].subtitle }}</p>
              </div>
            </div>
            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              <button v-for="(_, idx) in carouselSlides" :key="idx"
                class="w-1.5 h-1.5 rounded-full transition-all cursor-pointer"
                :class="idx === carouselIndex ? 'bg-white w-3' : 'bg-white/50'"
                @click="carouselIndex = idx"></button>
            </div>
          </div>

          <div class="flex items-center justify-between px-[55px] mb-4">
            <button
              class="w-12 h-7 rounded-full font-bold transition-all flex items-center justify-center text-sm"
              :class="parentCategory === 'cat' ? 'bg-[#FF85A2] shadow-md ring-2 ring-[#FF85A2]/30' : 'bg-gray-100'"
              @click="setParent('cat')">🐱</button>
            <button
              class="w-12 h-7 rounded-full font-bold transition-all flex items-center justify-center text-sm"
              :class="parentCategory === 'dog' ? 'bg-[#FF85A2] shadow-md ring-2 ring-[#FF85A2]/30' : 'bg-gray-100'"
              @click="setParent('dog')">🐶</button>
            <button class="w-12 h-7 rounded-full flex items-center justify-center bg-[#FF85A2] text-white shadow-md hover:opacity-90 transition-opacity" @click="router.push('/cart')">
              <iconify-icon icon="solar:cart-large-minimalistic-bold" class="text-xs"></iconify-icon>
            </button>
          </div>

          <div class="grid grid-cols-4 gap-3 px-4 mb-6">
            <div class="flex flex-col items-center gap-1.5 cursor-pointer" @click="setChild('主粮')">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-all" :class="childCategory === '主粮' ? 'bg-[#FF85A2] text-white shadow-md scale-110' : 'bg-[#FFF9C4] text-[#D4AF37]'">
                <iconify-icon class="text-xl" icon="solar:bone-bold"></iconify-icon>
              </div>
              <span class="text-[10px]" :class="childCategory === '主粮' ? 'text-[#FF85A2] font-bold' : 'text-gray-500'">主粮</span>
            </div>
            <div class="flex flex-col items-center gap-1.5 cursor-pointer" @click="setChild('零食')">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-all" :class="childCategory === '零食' ? 'bg-[#FF85A2] text-white shadow-md scale-110' : 'bg-[#E6E6FA] text-[#9370DB]'">
                <iconify-icon class="text-xl" icon="solar:refrigerator-bold"></iconify-icon>
              </div>
              <span class="text-[10px]" :class="childCategory === '零食' ? 'text-[#FF85A2] font-bold' : 'text-gray-500'">零食</span>
            </div>
            <div class="flex flex-col items-center gap-1.5 cursor-pointer" @click="setChild('用品')">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-all" :class="childCategory === '用品' ? 'bg-[#FF85A2] text-white shadow-md scale-110' : 'bg-[#C1E1C1] text-[#556B2F]'">
                <iconify-icon class="text-xl" icon="solar:box-bold"></iconify-icon>
              </div>
              <span class="text-[10px]" :class="childCategory === '用品' ? 'text-[#FF85A2] font-bold' : 'text-gray-500'">用品</span>
            </div>
            <div class="flex flex-col items-center gap-1.5 cursor-pointer" @click="setChild('服饰')">
              <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-all" :class="childCategory === '服饰' ? 'bg-[#FF85A2] text-white shadow-md scale-110' : 'bg-[#FFD1DC] text-[#C71585]'">
                <iconify-icon class="text-xl" icon="solar:t-shirt-bold"></iconify-icon>
              </div>
              <span class="text-[10px]" :class="childCategory === '服饰' ? 'text-[#FF85A2] font-bold' : 'text-gray-500'">服饰</span>
            </div>
          </div>

          <div class="px-4">
            <div class="grid grid-cols-2 gap-3">
              <div v-for="p in filteredProducts" :key="p.id"
                class="bg-white rounded-[20px] p-2.5 creamy-shadow border border-[#FFF5F7] cursor-pointer hover:shadow-lg transition-shadow"
                @click="router.push('/product/' + p.id)">
                <img :src="p.img" class="w-full aspect-square rounded-xl object-cover mb-2"/>
                <h4 class="text-[11px] font-bold text-[#5D4037] truncate">{{ p.name }}</h4>
                <div class="flex items-center gap-1 my-1">
                  <span class="text-[8px] px-1.5 py-0.5 rounded font-medium" :style="{ background: p.tagColor, color: p.tagTextColor }">{{ p.tag }}</span>
                  <span class="text-[8px] text-gray-300">已售 {{ p.sales }}</span>
                </div>
                <div class="flex justify-between items-center mt-0.5">
                  <span class="text-[#FF85A2] font-black text-xs">{{ p.price }}</span>
                  <button class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" :class="p.child === '零食' ? 'bg-[#9370DB]' : p.child === '用品' ? 'bg-[#556B2F]' : p.child === '服饰' ? 'bg-[#C71585]' : 'bg-[#FF85A2]'" @click.stop="router.push('/product/' + p.id)">
                    <iconify-icon icon="solar:cart-large-minimalistic-bold"></iconify-icon>
                  </button>
                </div>
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
