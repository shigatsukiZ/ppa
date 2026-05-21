<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const type = route.params.type

const typeLabel = computed(() => type === 'cat' ? '喵星互助专区' : '汪汪互助专区')

const navHidden = ref(false)
let lastScrollTop = 0

const onScroll = (e) => {
  const st = e.target.scrollTop
  if (st < lastScrollTop) navHidden.value = false
  else if (st > lastScrollTop && st > 10) navHidden.value = true
  lastScrollTop = st
}

const allHelps = [
  { id: 1, type: 'cat', title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', distance: '200m', status: 'open' },
  { id: 2, type: 'cat', title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', distance: '1.2km', status: 'open' },
  { id: 3, type: 'cat', title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', distance: '800m', status: 'open' },
  { id: 4, type: 'cat', title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', distance: '300m', status: 'open' },
  { id: 5, type: 'dog', title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', distance: '1.5km', status: 'open' },
  { id: 6, type: 'dog', title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', distance: '600m', status: 'open' },
  { id: 7, type: 'dog', title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', distance: '900m', status: 'open' },
  { id: 8, type: 'dog', title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', distance: '2km', status: 'open' },
  { id: 1, type: 'cat', title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', distance: '200m', status: 'open' },
  { id: 2, type: 'cat', title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', distance: '1.2km', status: 'open' },
  { id: 3, type: 'cat', title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', distance: '800m', status: 'open' },
  { id: 4, type: 'cat', title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', distance: '300m', status: 'open' },
  { id: 5, type: 'dog', title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', distance: '1.5km', status: 'open' },
  { id: 6, type: 'dog', title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', distance: '600m', status: 'open' },
  { id: 7, type: 'dog', title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', distance: '900m', status: 'open' },
  { id: 8, type: 'dog', title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', distance: '2km', status: 'open' },
  { id: 1, type: 'cat', title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', distance: '200m', status: 'open' },
  { id: 2, type: 'cat', title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', distance: '1.2km', status: 'open' },
  { id: 3, type: 'cat', title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', distance: '800m', status: 'open' },
  { id: 4, type: 'cat', title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', distance: '300m', status: 'open' },
  { id: 5, type: 'dog', title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', distance: '1.5km', status: 'open' },
  { id: 6, type: 'dog', title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', distance: '600m', status: 'open' },
  { id: 7, type: 'dog', title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', distance: '900m', status: 'open' },
  { id: 8, type: 'dog', title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', distance: '2km', status: 'open' },
  { id: 1, type: 'cat', title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', distance: '200m', status: 'open' },
  { id: 2, type: 'cat', title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', distance: '1.2km', status: 'open' },
  { id: 3, type: 'cat', title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', distance: '800m', status: 'open' },
  { id: 4, type: 'cat', title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', distance: '300m', status: 'open' },
  { id: 5, type: 'dog', title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', distance: '1.5km', status: 'open' },
  { id: 6, type: 'dog', title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', distance: '600m', status: 'open' },
  { id: 7, type: 'dog', title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', distance: '900m', status: 'open' },
  { id: 8, type: 'dog', title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', distance: '2km', status: 'open' },
  { id: 1, type: 'cat', title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', distance: '200m', status: 'open' },
  { id: 2, type: 'cat', title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', distance: '1.2km', status: 'open' },
  { id: 3, type: 'cat', title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', distance: '800m', status: 'open' },
  { id: 4, type: 'cat', title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', distance: '300m', status: 'open' },
  { id: 5, type: 'dog', title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', distance: '1.5km', status: 'open' },
  { id: 6, type: 'dog', title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', distance: '600m', status: 'open' },
  { id: 7, type: 'dog', title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', distance: '900m', status: 'open' },
  { id: 8, type: 'dog', title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', distance: '2km', status: 'open' },

]

const helps = computed(() => allHelps.filter(h => h.type === type))

const selectedHelp = ref(null)
const acceptedIds = ref(new Set())

const openDetail = (help) => { selectedHelp.value = help }
const closeDetail = () => { selectedHelp.value = null }
const acceptHelp = () => {
  if (selectedHelp.value) {
    acceptedIds.value.add(selectedHelp.value.id)
  }
}
const viewHelp = (id) => {
  router.push(`/help/${id}`)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">{{ typeLabel }}</span>
        <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" @click="router.push('/settings')">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:settings-linear"></iconify-icon>
        </button>
      </header>

      <div class="pointer-events-none absolute inset-0 top-12 bottom-14 flex items-center justify-center overflow-hidden select-none" style="z-index:0">
        <span class="text-[200px] opacity-[0.12] font-bold" style="image-rendering:pixelated">{{ type === 'cat' ? '🐱' : '🐶' }}</span>
      </div>
      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3 relative" style="background-image:url(data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23FFD1DC' opacity='0.08'/%3E%3C/svg%3E)" @scroll="onScroll">
        <div v-for="h in helps" :key="h.id"
          class="bg-white/30 backdrop-blur-xl rounded-[28px] p-4 creamy-shadow border border-white/70 cursor-pointer hover:shadow-lg transition-shadow"
          @click="openDetail(h)">
          <div class="flex items-center gap-2.5 mb-2">
            <img :src="h.avatar" class="w-8 h-8 rounded-full object-cover"/>
            <div class="flex-1 min-w-0">
              <span class="text-xs font-bold text-[#5D4037]">{{ h.poster }}</span>
              <div class="flex items-center gap-1.5">
                <iconify-icon class="text-[10px] text-gray-300" icon="solar:map-point-linear"></iconify-icon>
                <span class="text-[9px] text-gray-400">{{ h.distance }}</span>
              </div>
            </div>
            <div v-if="acceptedIds.has(h.id)"
              class="text-[9px] bg-[#E8F5E9] text-green-600 px-2 py-0.5 rounded-full font-bold">已接取</div>
          </div>
          <h4 class="text-sm font-bold text-[#5D4037] mb-1">{{ h.title }}</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-2">{{ h.desc }}</p>
          <div class="flex items-center gap-3 text-[10px] text-gray-400">
            <span class="flex items-center gap-0.5">
              <iconify-icon icon="solar:clock-circle-linear"></iconify-icon>
              {{ h.time }}
            </span>
            <span class="flex items-center gap-0.5">
              <iconify-icon icon="solar:gift-linear"></iconify-icon>
              {{ h.reward }}
            </span>
          </div>
        </div>
      </main>

      <Transition name="fade">
        <div v-if="selectedHelp" class="fixed inset-0 bg-black/40 z-50" @click="closeDetail"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="selectedHelp"
          class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] p-5 w-[300px] z-50 shadow-2xl"
          @click.stop>
          <div class="flex items-center gap-2 mb-3">
            <img :src="selectedHelp.avatar" class="w-9 h-9 rounded-full object-cover"/>
            <div>
              <span class="text-sm font-bold text-[#5D4037]">{{ selectedHelp.poster }}</span>
              <div class="flex items-center gap-1 text-[9px] text-gray-400">
                <iconify-icon icon="solar:map-point-linear"></iconify-icon>
                <span>{{ selectedHelp.distance }} · {{ selectedHelp.location }}</span>
              </div>
            </div>
          </div>
          <h3 class="text-base font-black text-[#5D4037] mb-2">{{ selectedHelp.title }}</h3>
          <p class="text-xs text-gray-600 leading-relaxed mb-3">{{ selectedHelp.desc }}</p>
          <div class="bg-[#F8F9FA] rounded-2xl p-3 space-y-1.5 mb-3">
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:clock-circle-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">时间</span>
              <span class="text-[#5D4037] font-bold">{{ selectedHelp.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:map-point-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">地点</span>
              <span class="text-[#5D4037] font-bold">{{ selectedHelp.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:gift-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">报酬</span>
              <span class="text-[#FF85A2] font-bold">{{ selectedHelp.reward }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 py-2.5 text-xs font-bold rounded-full border border-gray-200 text-gray-400" @click="closeDetail">放弃</button>
            <button v-if="!acceptedIds.has(selectedHelp.id)"
              class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#FF85A2] text-white"
              @click="acceptHelp">接取</button>
            <button v-else
              class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#A7C7E7] text-white"
              @click="viewHelp(selectedHelp.id)">查看</button>
          </div>
        </div>
      </Transition>

      <BottomNav :hidden="navHidden" />
    </div>
  </div>
</template>
