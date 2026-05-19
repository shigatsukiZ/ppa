<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'
const router = useRouter()

const showUpload = ref(false)
const activeTab = ref('social')

const switchTab = (tab) => { activeTab.value = tab }
const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }
const goToDetail = () => { router.push('/detail') }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="px-6 py-4 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <button class="w-10 h-10 bg-[#FFD1DC] rounded-full flex items-center justify-center cursor-pointer" @click="router.push('/profile')">
              <iconify-icon class="text-white text-2xl" icon="solar:cat-bold"></iconify-icon>
            </button>
          </div>
          <div class="flex gap-3">
            <button class="w-10 h-10 rounded-full bg-white flex items-center justify-center creamy-shadow border border-[#FFF5F7]" @click="router.push('/search')">
              <iconify-icon class="text-gray-400 text-xl" icon="solar:magnifer-linear"></iconify-icon>
            </button>
            <button class="w-10 h-10 rounded-full bg-white flex items-center justify-center creamy-shadow border border-[#FFF5F7]">
              <iconify-icon class="text-gray-400 text-xl" icon="solar:bell-bing-linear"></iconify-icon>
            </button>
          </div>
        </div>
        <div class="flex items-center bg-[#FDF0F3] p-1.5 rounded-2xl">
          <button class="flex-1 py-2 text-sm rounded-xl font-medium transition-all" :class="activeTab === 'social' ? 'bg-white text-[#FF85A2] shadow-sm' : 'text-gray-400'" @click="switchTab('social')">
            宠物社区
          </button>
          <button class="flex-1 py-2 text-sm rounded-xl font-medium transition-all" :class="activeTab === 'mall' ? 'bg-white text-[#FF85A2] shadow-sm' : 'text-gray-400'" @click="switchTab('mall')">
            宠物商城
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-5 pb-20">
        <div v-show="activeTab === 'social'">
          <div class="flex gap-4 overflow-x-auto custom-scrollbar py-2 mb-4">
            <div class="flex flex-col items-center gap-1 shrink-0">
              <div class="w-14 h-14 rounded-full border-2 border-[#FFD1DC] p-0.5">
                <div class="w-full h-full rounded-full bg-[#FFE4E1] flex items-center justify-center">
                  <iconify-icon class="text-[#FF85A2] text-2xl" icon="solar:camera-add-bold"></iconify-icon>
                </div>
              </div>
              <span class="text-[10px] text-gray-500">发布</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0">
              <img alt="Pet Story 1" class="w-14 h-14 rounded-full border-2 border-white creamy-shadow object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg"/>
              <span class="text-[10px] text-gray-500">布丁酱</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0">
              <img alt="Pet Story 2" class="w-14 h-14 rounded-full border-2 border-white creamy-shadow object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg"/>
              <span class="text-[10px] text-gray-500">可乐</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0">
              <img alt="Pet Story 3" class="w-14 h-14 rounded-full border-2 border-white creamy-shadow object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg"/>
              <span class="text-[10px] text-gray-500">团子</span>
            </div>
            <div class="flex flex-col items-center gap-1 shrink-0">
              <img alt="Pet Story 4" class="w-14 h-14 rounded-full border-2 border-white creamy-shadow object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg"/>
              <span class="text-[10px] text-gray-500">大白</span>
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white rounded-[32px] overflow-hidden creamy-shadow border border-[#FFF5F7]">
              <div class="p-4 flex items-center gap-3">
                <img alt="Avatar" class="w-10 h-10 rounded-full" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg"/>
                <div>
                  <h3 class="text-sm font-bold text-[#5D4037]">元宝麻麻 <span class="text-[10px] bg-[#A7C7E7] text-white px-2 py-0.5 rounded-full ml-1">认证熟人</span></h3>
                  <p class="text-[10px] text-gray-400">2026.04.28 · 上海·徐汇区</p>
                </div>
                <button class="ml-auto">
                  <iconify-icon class="text-gray-300" icon="solar:menu-dots-bold"></iconify-icon>
                </button>
              </div>
              <img alt="Post Image" class="w-full aspect-square object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg"/>
              <div class="p-4">
                <p class="text-sm text-gray-600 leading-relaxed mb-3">
                  今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~
                </p>
                <div class="flex justify-between items-center">
                  <div class="flex gap-4">
                    <button class="flex items-center gap-1 text-gray-400">
                      <iconify-icon class="text-xl" icon="solar:heart-linear"></iconify-icon>
                      <span class="text-xs">1.2k</span>
                    </button>
                    <button class="flex items-center gap-1 text-gray-400">
                      <iconify-icon class="text-xl" icon="solar:chat-line-linear"></iconify-icon>
                      <span class="text-xs">48</span>
                    </button>
                  </div>
                  <button class="text-gray-400">
                    <iconify-icon class="text-xl" icon="solar:share-circle-linear"></iconify-icon>
                  </button>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-[32px] overflow-hidden creamy-shadow border border-[#FFF5F7]">
              <div class="p-4 flex items-center gap-3">
                <img alt="Avatar" class="w-10 h-10 rounded-full" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg"/>
                <div>
                  <h3 class="text-sm font-bold text-[#5D4037]">豆奶同学</h3>
                  <p class="text-[10px] text-gray-400">刚刚 · 杭州·西湖区</p>
                </div>
              </div>
              <div class="p-4 bg-[#F9F9FF] mx-4 mb-4 rounded-2xl flex items-center gap-3 border border-dashed border-[#A7C7E7]">
                <div class="bg-white w-10 h-10 rounded-xl flex items-center justify-center text-[#A7C7E7]">
                  <iconify-icon class="text-2xl" icon="solar:map-point-bold"></iconify-icon>
                </div>
                <div class="flex-1">
                  <h4 class="text-xs font-bold text-[#5D4037]">下午有人一起遛狗吗？</h4>
                  <p class="text-[10px] text-gray-400">西溪湿地南门 · 16:00见</p>
                </div>
                <button class="bg-[#A7C7E7] text-white text-[10px] px-3 py-1.5 rounded-full font-bold" @click="router.push('/location')">加入</button>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'mall'">
          <div class="relative rounded-[32px] overflow-hidden mb-6 creamy-shadow">
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
            <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
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
            <div class="bg-white rounded-[28px] p-3 creamy-shadow border border-[#FFF5F7] cursor-pointer" @click="goToDetail">
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

      <BottomNav @fab-click="fabClick" />

      <div class="overlay" :class="{ show: showUpload }" @click="hideUpload"></div>
      <div class="sheet" :class="{ show: showUpload }">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
