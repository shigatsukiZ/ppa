<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const showUpload = ref(false)
const showMsg = ref(false)

const fabClick = () => { showUpload.value = true }
const hideUpload = () => { showUpload.value = false }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="px-6 pt-6 pb-4">
        <div class="flex justify-end mb-4">
          <button @click="router.push('/setting')" class="w-10 h-10 rounded-full bg-white flex items-center justify-center creamy-shadow border border-[#FFF5F7]">
            <iconify-icon class="text-gray-400 text-xl" icon="solar:settings-linear"></iconify-icon>
          </button>
        </div>
        <div class="flex items-center gap-5 mb-8">
          <div class="relative">
            <img alt="User Avatar" class="w-20 h-20 rounded-[32px] object-cover border-4 border-white creamy-shadow" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg"/>
            <div class="absolute -bottom-1 -right-1 bg-[#A7C7E7] text-white p-1 rounded-full border-2 border-white">
              <iconify-icon class="text-xs" icon="solar:check-read-bold"></iconify-icon>
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-black text-[#5D4037]">元宝麻麻</h1>
            <p class="text-xs text-gray-400 flex items-center gap-1 mt-1">
              元仔ID: 20260428 <iconify-icon icon="solar:copy-linear"></iconify-icon>
            </p>
            <div class="flex gap-4 mt-3">
              <div class="text-center">
                <span class="block text-sm font-bold text-[#5D4037]">128</span>
                <span class="text-[10px] text-gray-400">关注</span>
              </div>
              <div class="text-center">
                <span class="block text-sm font-bold text-[#5D4037]">3.5k</span>
                <span class="text-[10px] text-gray-400">粉丝</span>
              </div>
              <div class="text-center">
                <span class="block text-sm font-bold text-[#5D4037]">892</span>
                <span class="text-[10px] text-gray-400">获赞</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
        <section class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-black text-[#5D4037]">我的宠物档案</h2>
            <button class="text-[#FF85A2] text-xs font-bold flex items-center gap-1">
              <iconify-icon icon="solar:add-circle-linear"></iconify-icon>添加宠物
            </button>
          </div>
          <div class="flex gap-4 overflow-x-auto custom-scrollbar py-2">
            <div class="pet-card-active w-40 shrink-0 rounded-[32px] p-4 creamy-shadow flex flex-col items-center">
              <img alt="Pet 1" class="w-16 h-16 rounded-full border-2 border-white mb-2 object-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/9db4ef934a764915b9babc24b74a33e4.jpg"/>
              <h3 class="text-sm font-bold text-[#5D4037]">萨摩耶·元宝</h3>
              <span class="text-[10px] bg-white text-[#FF85A2] px-2 py-0.5 rounded-full mt-1 font-bold">当前发布身份</span>
            </div>
            <div class="bg-white w-40 shrink-0 rounded-[32px] p-4 creamy-shadow flex flex-col items-center border border-[#F0F7FF]">
              <img alt="Pet 2" class="w-16 h-16 rounded-full border-2 border-white mb-2 object-cover opacity-50" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/df08b7ec8be74879831b12017bce837e.jpg"/>
              <h3 class="text-sm font-bold text-gray-400">英短·饭团</h3>
              <span class="text-[10px] text-gray-300 mt-1">点击切换</span>
            </div>
          </div>
        </section>

        <section class="mb-8 bg-[#F0F7FF]/50 rounded-[32px] p-5 border border-[#F0F7FF]">
          <div class="flex items-center gap-2 mb-4">
            <iconify-icon class="text-[#A7C7E7] text-xl" icon="solar:magic-stick-3-bold"></iconify-icon>
            <h3 class="text-sm font-black text-[#5D4037]">元宝的专属好物推荐</h3>
          </div>
          <div class="flex gap-3">
            <div class="bg-white flex-1 rounded-2xl p-2 flex items-center gap-2 cursor-pointer" @click="router.push('/detail')">
              <img alt="Rec" class="w-10 h-10 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg"/>
              <div class="overflow-hidden">
                <span class="block text-[10px] font-bold text-[#5D4037] truncate">萨摩耶泪痕清理液</span>
                <span class="text-[10px] text-[#FF85A2] font-black">¥48.0</span>
              </div>
            </div>
            <div class="bg-white flex-1 rounded-2xl p-2 flex items-center gap-2 cursor-pointer" @click="router.push('/detail')">
              <img alt="Rec" class="w-10 h-10 rounded-lg" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg"/>
              <div class="overflow-hidden">
                <span class="block text-[10px] font-bold text-[#5D4037] truncate">耐咬大骨头</span>
                <span class="text-[10px] text-[#FF85A2] font-black">¥19.9</span>
              </div>
            </div>
          </div>
        </section>

        <section class="grid grid-cols-2 gap-4">
          <div class="bg-white rounded-[28px] p-5 creamy-shadow flex items-center gap-3 cursor-pointer" @click="router.push('/order')">
            <div class="w-10 h-10 bg-[#FFD1DC] rounded-xl flex items-center justify-center text-white">
              <iconify-icon class="text-xl" icon="solar:wallet-bold"></iconify-icon>
            </div>
            <div>
              <span class="block text-sm font-bold text-[#5D4037]">我的订单</span>
              <span class="text-[10px] text-gray-400">2个待收货</span>
            </div>
          </div>
          <div class="bg-white rounded-[28px] p-5 creamy-shadow flex items-center gap-3">
            <div class="w-10 h-10 bg-[#A7C7E7] rounded-xl flex items-center justify-center text-white">
              <iconify-icon class="text-xl" icon="solar:star-bold"></iconify-icon>
            </div>
            <div>
              <span class="block text-sm font-bold text-[#5D4037]">我的收藏</span>
              <span class="text-[10px] text-gray-400">45个宝贝</span>
            </div>
          </div>
          <div class="bg-white rounded-[28px] p-5 creamy-shadow flex items-center gap-3 cursor-pointer" @click="showMsg = !showMsg">
            <div class="w-10 h-10 bg-[#C1E1C1] rounded-xl flex items-center justify-center text-white">
              <iconify-icon class="text-xl" icon="solar:chat-round-bold"></iconify-icon>
            </div>
            <div>
              <span class="block text-sm font-bold text-[#5D4037]">消息中心</span>
              <span class="text-[10px] text-gray-400">99+ 未读</span>
            </div>
          </div>
          <div class="bg-white rounded-[28px] p-5 creamy-shadow flex items-center gap-3 cursor-pointer" @click="router.push('/setting')">
            <div class="w-10 h-10 bg-[#E6E6FA] rounded-xl flex items-center justify-center text-white">
              <iconify-icon class="text-xl" icon="solar:shield-user-bold"></iconify-icon>
            </div>
            <div>
              <span class="block text-sm font-bold text-[#5D4037]">账号安全</span>
              <span class="text-[10px] text-gray-400">已实名认证</span>
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

      <div class="msg-overlay" :class="{ show: showMsg }" @click="showMsg = false"></div>
      <div class="msg-panel creamy-shadow custom-scrollbar" :class="{ show: showMsg }">
        <h3 class="text-lg font-bold text-[#5D4037] mb-3">消息通知</h3>
        <div class="space-y-3">
          <div v-for="(msg, idx) in [
            { name: '泡芙妈妈', text: '点赞了你的动态', time: '今天 10:23' },
            { name: '毛球麻麻', text: '评论了你：好可爱呀！', time: '今天 09:47' },
            { name: '可乐麻麻', text: '点赞了你的动态', time: '昨天 21:15' },
            { name: '布丁麻麻', text: '评论了你：求链接！', time: '昨天 18:30' },
            { name: '七喜麻麻', text: '点赞了你的动态', time: '昨天 15:22' },
            { name: '糯米麻麻', text: '评论了你：太治愈了～', time: '昨天 12:10' },
            { name: '旺旺麻麻', text: '点赞了你的动态', time: '05-01 20:45' },
            { name: '馒头麻麻', text: '评论了你：我家也有同款！', time: '05-01 16:33' },
            { name: '汤圆麻麻', text: '点赞了你的动态', time: '05-01 11:05' },
            { name: '豆包麻麻', text: '评论了你：颜值太高啦！', time: '04-30 22:18' },
            { name: '西瓜麻麻', text: '点赞了你的动态', time: '04-30 19:52' },
            { name: '橙子麻麻', text: '评论了你：好乖的宝宝！', time: '04-30 14:07' },
          ]" :key="idx">
            <div class="flex items-start gap-2">
              <img :src="'https://picsum.photos/200?random=' + (idx+1)" class="w-8 h-8 rounded-full">
              <div>
                <p class="text-sm"><b>{{ msg.name }}</b> {{ msg.text }}</p>
                <p class="text-xs text-gray-400">{{ msg.time }}</p>
              </div>
            </div>
          </div>
        </div>
        <button @click="showMsg = false" class="w-full mt-4 py-2 bg-[#F0F7FF] rounded-xl text-[#5D4037] text-sm">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-card-active { border: 3px solid #FFD1DC; background-color: #FFF5F7; }
.msg-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
.msg-overlay.show { display: block; }
.msg-panel { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90%; max-width: 340px; max-height: 70vh; background: #fff; border-radius: 20px; padding: 20px; z-index: 100; display: none; overflow-y: auto; }
.msg-panel.show { display: block; }
</style>
