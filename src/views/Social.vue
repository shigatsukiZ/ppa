<script setup>
import { ref } from 'vue'
import BottomNav from '../components/BottomNav.vue'

const showUpload = ref(false)
const showWalk = ref(false)
const walkMsg = ref('')

const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }
const showJoinWalkSheet = () => { showWalk.value = true }
const hideJoinWalkSheet = () => { showWalk.value = false }
const submitJoinWalk = () => {
  hideJoinWalkSheet()
  alert('已发送申请' + (walkMsg.value ? '，留言：' + walkMsg.value : ''))
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="px-6 py-4 flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-black text-[#5D4037]">社区探索</h1>
          <div class="flex gap-2">
            <button class="bg-[#FDF0F3] text-[#FF85A2] text-xs px-3 py-1.5 rounded-full font-bold">全城动态</button>
            <button class="bg-[#F0F7FF] text-[#A7C7E7] text-xs px-3 py-1.5 rounded-full font-bold">熟人圈</button>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="zone-card-cat p-5 rounded-[32px] border border-white creamy-shadow relative overflow-hidden group">
            <h3 class="text-lg font-black text-[#8B4513] mb-1">喵星专区</h3>
            <p class="text-[10px] text-gray-500">2.4w 位铲屎官在聊</p>
            <iconify-icon class="absolute -right-4 -bottom-4 text-7xl text-orange-200/50 group-hover:scale-110 transition-transform" icon="solar:cat-bold"></iconify-icon>
          </div>
          <div class="zone-card-dog p-5 rounded-[32px] border border-white creamy-shadow relative overflow-hidden group">
            <h3 class="text-lg font-black text-[#2F4F4F] mb-1">汪汪星球</h3>
            <p class="text-[10px] text-gray-500">3.8w 条运动足迹</p>
            <iconify-icon class="absolute -right-4 -bottom-4 text-7xl text-blue-200/50 group-hover:scale-110 transition-transform" icon="solar:dog-bold"></iconify-icon>
          </div>
        </div>

        <section class="mb-8">
          <div class="flex justify-between items-end mb-4">
            <h2 class="text-lg font-black text-[#5D4037]">同城约遛</h2>
            <a class="text-xs text-[#A7C7E7] font-bold" href="#">查看全部地图 &gt;</a>
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

            <div class="bg-white rounded-[32px] p-5 creamy-shadow border border-[#FFF9C4]">
              <div class="flex items-center gap-3 mb-4">
                <img alt="Pet Avatar" class="w-12 h-12 rounded-full border-2 border-[#FFF9C4]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg"/>
                <div>
                  <h4 class="text-sm font-bold text-[#5D4037]">柯基·短腿 的爸爸</h4>
                  <p class="text-[10px] text-gray-400 italic">"寻求互助中"</p>
                </div>
                <span class="ml-auto text-[10px] bg-[#FFF9C4] text-[#D4AF37] px-3 py-1 rounded-full font-bold">互助需求</span>
              </div>
              <div class="border-t border-dashed border-gray-100 pt-4">
                <h5 class="text-xs font-bold text-[#5D4037] mb-1">周末出差，求邻居代喂猫</h5>
                <p class="text-[10px] text-gray-400">只限本小区认证熟人，报酬：一箱罐头或红包</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-lg font-black text-[#5D4037] mb-4">你可能认识的朋友</h2>
          <div class="flex gap-4 overflow-x-auto custom-scrollbar">
            <div class="bg-white w-32 shrink-0 rounded-[28px] p-4 text-center creamy-shadow border border-[#FFF5F7]">
              <img alt="Avatar" class="w-16 h-16 rounded-full mx-auto mb-2" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/c614195a501b4303b4ff9c3fa6dbcafe.jpg"/>
              <h4 class="text-[11px] font-bold text-[#5D4037] truncate">萨摩耶主理人</h4>
              <p class="text-[9px] text-gray-300 mb-3">共同好友 3 位</p>
              <button class="w-full bg-[#FFD1DC] text-white py-1.5 rounded-full text-[10px] font-bold">关注</button>
            </div>
            <div class="bg-white w-32 shrink-0 rounded-[28px] p-4 text-center creamy-shadow border border-[#FFF5F7]">
              <img alt="Avatar" class="w-16 h-16 rounded-full mx-auto mb-2" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/c614195a501b4303b4ff9c3fa6dbcafe.jpg"/>
              <h4 class="text-[11px] font-bold text-[#5D4037] truncate">猫片摄影师</h4>
              <p class="text-[9px] text-gray-300 mb-3">同城铲屎官</p>
              <button class="w-full bg-[#FFD1DC] text-white py-1.5 rounded-full text-[10px] font-bold">关注</button>
            </div>
          </div>
        </section>
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

      <div class="overlay" :class="{ show: showWalk }" @click="hideJoinWalkSheet"></div>
      <div class="sheet" :class="{ show: showWalk }">
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
