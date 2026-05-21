<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
import Sidebar from '../components/Sidebar.vue'

const router = useRouter()
const showUpload = ref(false)
const showWalk = ref(false)
const walkMsg = ref('')
const showConfirmModal = ref(false)
const showSidebar = ref(false)
const navHidden = ref(false)
let lastScrollTop = 0

const showHelpDetail = ref(false)
const helpAccepted = ref(false)
const helpPost = {
  id: 99, title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包',
  location: '成都·环球中心E5栋', time: '本周末 全天',
  reward: '一箱主食罐头（约¥120）', poster: '柯基·短腿 的爸爸',
  avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg',
  distance: '200m', detail: '家有两只猫，需要每天喂食一次、换水、清猫砂。已备好足够猫粮和罐头。'
}
const followingIds = ref(new Set())
const toggleFollow = (name) => {
  if (followingIds.value.has(name)) followingIds.value.delete(name)
  else followingIds.value.add(name)
}
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
const friends = [
  { name: '萨摩耶主理人', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c614195a501b4303b4ff9c3fa6dbcafe.jpg', desc: '共同好友 3 位' },
  { name: '猫片摄影师', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c614195a501b4303b4ff9c3fa6dbcafe.jpg', desc: '同城铲屎官' },
  { name: '哈士奇饲养员', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg', desc: '共同好友 5 位' },
  { name: '布偶猫舍主理人', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', desc: '同城猫友' },
]
const acceptSocialHelp = () => { helpAccepted.value = true }
const viewSocialHelp = () => { router.push(`/help/${helpPost.id}`) }

const onMainScroll = (e) => {
  const st = e.target.scrollTop
  if (st < lastScrollTop) navHidden.value = false
  else if (st > lastScrollTop && st > 10) navHidden.value = true
  lastScrollTop = st
}
const showGoModal = ref(false)
const confirmMsg = ref('')
let goTimer = null

const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }
const showJoinWalkSheet = () => { showWalk.value = true }
const hideJoinWalkSheet = () => { showWalk.value = false }

const submitJoinWalk = () => {
  hideJoinWalkSheet()
  confirmMsg.value = '已发送申请' + (walkMsg.value ? '，留言：' + walkMsg.value : '')
  showConfirmModal.value = true
  walkMsg.value = ''
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  goTimer = setTimeout(() => {
    showGoModal.value = true
  }, 20000)
}

const goToLocation = () => {
  showGoModal.value = false
  clearTimeout(goTimer)
  router.push('/location')
}

onUnmounted(() => {
  clearTimeout(goTimer)
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="flex items-center px-4 h-11">
        <button class="w-8 h-8 rounded-full overflow-hidden shrink-0 cursor-pointer hover:opacity-80 transition-opacity" @click="showSidebar = true">
          <img class="w-full h-full object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" alt="avatar"/>
        </button>
        <div class="flex-1 flex items-center justify-center">
          <span class="text-sm font-black text-[#5D4037]">附近的宠友</span>
        </div>
        <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 cursor-pointer" @click="router.push('/settings')">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:settings-linear"></iconify-icon>
        </button>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24" @scroll="onMainScroll">
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="zone-card-cat p-5 rounded-[32px] border border-white creamy-shadow relative overflow-hidden group cursor-pointer" @click="router.push('/help-list/cat')">
              <h3 class="text-lg font-black text-[#8B4513] mb-1">喵星专区</h3>
              <p class="text-[10px] text-gray-500">2.4w 位铲屎官在聊</p>
              <iconify-icon class="absolute -right-4 -bottom-4 text-7xl text-orange-200/50 group-hover:scale-110 transition-transform" icon="solar:cat-bold"></iconify-icon>
            </div>
            <div class="zone-card-dog p-5 rounded-[32px] border border-white creamy-shadow relative overflow-hidden group cursor-pointer" @click="router.push('/help-list/dog')">
              <h3 class="text-lg font-black text-[#2F4F4F] mb-1">汪汪星球</h3>
              <p class="text-[10px] text-gray-500">3.8w 条运动足迹</p>
              <iconify-icon class="absolute -right-4 -bottom-4 text-7xl text-blue-200/50 group-hover:scale-110 transition-transform" icon="solar:dog-bold"></iconify-icon>
            </div>
          </div>

        <section class="mb-8">
          <div class="flex justify-between items-end mb-4">
            <h2 class="text-lg font-black text-[#5D4037]">附近遛宠</h2>
            <button class="text-xs text-[#A7C7E7] font-bold" @click="router.push('/location')">地图找宠友 &gt;</button>
          </div>
          <div class="space-y-4">
            <div class="bg-white rounded-[32px] p-5 creamy-shadow border border-[#F0F7FF] relative">
              <div class="flex items-center gap-3 mb-4">
                <div class="relative">
                  <img alt="Pet Avatar" class="w-12 h-12 rounded-full border-2 border-[#A7C7E7]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg"/>
                  <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-[#FF85A2]">
                    <iconify-icon class="text-sm" icon="solar:heart-bold"></iconify-icon>
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-[#5D4037]">金毛·奶油 的麻麻</h4>
                  <p class="text-[10px] text-green-400 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    距离 500m · 刚刚活跃
                  </p>
                </div>
              </div>
              <div class="bg-[#F8FBFF] rounded-2xl p-3 mb-4">
                <p class="text-xs text-gray-600 mb-2 font-medium">"我家金毛性格超好，想找个性格开稳的小伙伴一起在公园草坪跑跑~"</p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <iconify-icon class="text-[#A7C7E7]" icon="solar:map-point-linear"></iconify-icon>
                    <span class="text-[10px] text-gray-400">陆家嘴中心公园</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <iconify-icon class="text-[#A7C7E7]" icon="solar:clock-circle-linear"></iconify-icon>
                    <span class="text-[10px] text-gray-400">今日 18:30</span>
                  </div>
                </div>
              </div>
              <button class="w-full bg-[#A7C7E7] text-white py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-100" @click="showJoinWalkSheet">申请加入约遛</button>
            </div>

            <div class="bg-white rounded-[32px] p-5 creamy-shadow border border-[#FFF9C4] cursor-pointer hover:shadow-lg transition-shadow" @click="showHelpDetail = true">
              <div class="flex items-center gap-3 mb-4">
                <img alt="Pet Avatar" class="w-12 h-12 rounded-full border-2 border-[#FFF9C4]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg"/>
                <div>
                  <h4 class="text-sm font-bold text-[#5D4037]">柯基·短腿 的爸爸</h4>
                  <p class="text-[10px] text-gray-400 italic">"寻求互助中"</p>
                </div>
                <span class="ml-auto text-[10px] bg-[#FFF9C4] text-[#D4AF37] px-3 py-1 rounded-full font-bold">互助需求</span>
              </div>
              <div class="border-t border-dashed border-gray-100 pt-4" @click.stop>
                <h5 class="text-xs font-bold text-[#5D4037] mb-1">周末出差，求邻居代喂猫</h5>
                <p class="text-[10px] text-gray-400">只限本小区认证熟人，报酬：一箱罐头或红包</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-black text-[#5D4037] mb-4">你可能认识的朋友</h2>
          <div class="flex gap-4 overflow-x-auto custom-scrollbar snap-x snap-mandatory scroll-smooth select-none cursor-grab active:cursor-grabbing" style="-webkit-overflow-scrolling:touch" @pointerdown="dragScroll">
            <div v-for="f in friends" :key="f.name" class="bg-white w-32 shrink-0 rounded-[28px] p-4 text-center creamy-shadow border border-[#FFF5F7] snap-start">
              <img alt="Avatar" class="w-16 h-16 rounded-full mx-auto mb-2 cursor-pointer" :src="f.avatar" @click="router.push('/profile/' + f.name)"/>
              <h4 class="text-[11px] font-bold text-[#5D4037] truncate cursor-pointer" @click="router.push('/profile/' + f.name)">{{ f.name }}</h4>
              <p class="text-[9px] text-gray-300 mb-3">{{ f.desc }}</p>
              <button :class="['w-full py-1.5 rounded-full text-[10px] font-bold transition-colors', followingIds.has(f.name) ? 'bg-gray-100 text-gray-400' : 'bg-[#FFD1DC] text-white']"
                @click="toggleFollow(f.name)">{{ followingIds.has(f.name) ? '已关注' : '关注' }}</button>
            </div>
          </div>
        </section>
      </main>

      <BottomNav :hidden="navHidden" @fab-click="fabClick" />
      <Sidebar :show="showSidebar" @close="showSidebar = false" />

      <Transition name="fade">
        <div v-if="showHelpDetail" class="fixed inset-0 bg-black/40 z-50" @click="showHelpDetail = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showHelpDetail"
          class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] p-5 w-[300px] z-50 shadow-2xl"
          @click.stop>
          <div class="flex items-center gap-2 mb-3">
            <img :src="helpPost.avatar" class="w-9 h-9 rounded-full object-cover"/>
            <div>
              <span class="text-sm font-bold text-[#5D4037]">{{ helpPost.poster }}</span>
              <div class="flex items-center gap-1 text-[9px] text-gray-400">
                <iconify-icon icon="solar:map-point-linear"></iconify-icon>
                <span>{{ helpPost.distance }} · {{ helpPost.location }}</span>
              </div>
            </div>
          </div>
          <h3 class="text-base font-black text-[#5D4037] mb-2">{{ helpPost.title }}</h3>
          <p class="text-xs text-gray-600 leading-relaxed mb-3">{{ helpPost.desc }}</p>
          <div class="bg-[#F8F9FA] rounded-2xl p-3 space-y-1.5 mb-3">
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:clock-circle-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">时间</span>
              <span class="text-[#5D4037] font-bold">{{ helpPost.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:map-point-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">地点</span>
              <span class="text-[#5D4037] font-bold">{{ helpPost.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:gift-linear"></iconify-icon>
              <span class="text-gray-600 w-12 shrink-0">报酬</span>
              <span class="text-[#FF85A2] font-bold">{{ helpPost.reward }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 py-2.5 text-xs font-bold rounded-full border border-gray-200 text-gray-400" @click="showHelpDetail = false">放弃</button>
            <button v-if="!helpAccepted"
              class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#FF85A2] text-white"
              @click="acceptSocialHelp">接取</button>
            <button v-else
              class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#A7C7E7] text-white"
              @click="viewSocialHelp">查看</button>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showUpload" class="overlay" @click="hideUpload"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showUpload" class="sheet">
          <div class="flex flex-col items-center gap-2 mb-6">
            <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
            <span class="text-sm font-bold text-[#5D4037]">发布动态</span>
          </div>
          <div class="flex gap-6 justify-center">
            <button class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 bg-[#A7C7E7] rounded-[24px] flex items-center justify-center creamy-shadow">
                <iconify-icon class="text-white text-3xl" icon="solar:camera-bold"></iconify-icon>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">拍照</span>
            </button>
            <button class="flex flex-col items-center gap-2">
              <div class="w-16 h-16 bg-[#FFD1DC] rounded-[24px] flex items-center justify-center creamy-shadow">
                <iconify-icon class="text-white text-3xl" icon="solar:gallery-bold"></iconify-icon>
              </div>
              <span class="text-xs font-bold text-[#5D4037]">从相册选择</span>
            </button>
          </div>
          <button class="w-full mt-6 py-3 rounded-2xl bg-[#FDF0F3] text-[#FF85A2] text-sm font-bold" @click="hideUpload">取消</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showWalk" class="overlay" @click="hideJoinWalkSheet"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showWalk" class="sheet">
          <div class="flex flex-col items-center gap-2 mb-5">
            <div class="w-10 h-1 bg-gray-200 rounded-full"></div>
            <span class="text-sm font-bold text-[#5D4037]">申请加入约遛</span>
          </div>
          <div class="bg-[#F8FBFF] rounded-2xl p-4 border border-[#EAF0F7] mb-4">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 bg-[#A7C7E7] rounded-xl flex items-center justify-center text-white">
                <iconify-icon icon="solar:map-point-bold"></iconify-icon>
              </div>
              <div>
                <span class="text-sm font-bold text-[#5D4037]">陆家嘴中心公园</span>
                <p class="text-[10px] text-green-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span>距离 500m
                </p>
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="text-xs font-bold text-[#5D4037] mb-2 block">留言给发起人</label>
            <textarea class="walk-input" rows="3" placeholder="说说你的宠物情况和想一起遛的理由～" v-model="walkMsg"></textarea>
          </div>
          <div class="flex gap-3">
            <button class="flex-1 py-3 rounded-2xl bg-[#FDF0F3] text-[#5D4037] text-sm font-bold" @click="hideJoinWalkSheet">取消</button>
            <button class="flex-1 py-3 rounded-2xl bg-[#A7C7E7] text-white text-sm font-bold shadow-lg shadow-blue-100" @click="submitJoinWalk">确认申请</button>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showConfirmModal" class="fixed inset-0 bg-black/40 z-[70]" @click="closeConfirmModal"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showConfirmModal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[32px] p-6 w-[300px] z-[80] shadow-2xl text-center">
          <div class="w-16 h-16 bg-[#A7C7E7] rounded-full flex items-center justify-center mx-auto mb-4">
            <iconify-icon class="text-white text-3xl" icon="solar:check-circle-bold"></iconify-icon>
          </div>
          <p class="text-sm font-bold text-[#5D4037] mb-6">{{ confirmMsg }}</p>
          <button class="w-full py-3 rounded-2xl bg-[#A7C7E7] text-white text-sm font-bold shadow-lg shadow-blue-100" @click="closeConfirmModal">确定</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showGoModal" class="fixed inset-0 bg-black/40 z-[70]" @click="showGoModal = false"></div>
      </Transition>
      <Transition name="scale">
        <div v-if="showGoModal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[32px] p-6 w-[300px] z-[80] shadow-2xl text-center">
          <div class="w-16 h-16 bg-[#FF85A2] rounded-full flex items-center justify-center mx-auto mb-4">
            <iconify-icon class="text-white text-3xl" icon="solar:map-point-bold"></iconify-icon>
          </div>
          <p class="text-sm font-bold text-[#5D4037] mb-2">出发时间到！</p>
          <p class="text-xs text-gray-400 mb-6">准备好了吗？去看看约遛位置吧</p>
          <button class="w-full py-3 rounded-2xl bg-[#FF85A2] text-white text-sm font-bold shadow-lg shadow-pink-100" @click="goToLocation">去看看</button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.zone-card-cat { background: linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 100%); }
.zone-card-dog { background: linear-gradient(135deg, #A7C7E7 0%, #FFFFFF 100%); }
.walk-input {
  background: #F8FBFF; border: 1.5px solid #EAF0F7; border-radius: 16px;
  padding: 12px 14px; font-size: 12px; color: #5D4037;
  width: 100%; outline: none; transition: border 0.2s; resize: none;
}
.walk-input:focus { border-color: #A7C7E7; }
</style>
