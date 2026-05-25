<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mapContainer = ref(null)
const loading = ref(true)
const userAddr = ref('环球中心')
const destAddr = ref('成都锦城公园')
const distText = ref('')
const loaded = ref(false)

const isVoiceMode = ref(true)
const isRecording = ref(false)
const dragZoneVisible = ref(false)
const inDragZone = ref(false)
const chatInput = ref('')
const messages = ref([])
const showEmojiPicker = ref(false)
let map = null
let startY = 0
let dragZoneTopY = 0
let dragZoneBottomY = 0
let msgIdCounter = 0

const emojis = [...'😀😁😂🤣😃😄😅😆😉😊😋😎😍🥰😘😗😙😚🙂🤗🤩🤔🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤧🥵🥶🥴😵🤯🤠🥳🥺😢😭😤😡🤬😈👿💀☠💩🤡👹👺👻👽👾🤖💋💘❤🧡💛💚💙💜🖤🤍🤎💔❣💕💞💓💗💖💝💟👍👎👊✊🤛🤜🤚👋🤟✌🤞🤟👌✋🤏👆👇👉👈🙌🙏🤝💪🦵🦶👂👃🧠🦷👀👅👄💄💋']

const nearbyUsers = [
  { name: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', lat: 30.5780, lng: 104.0620 },
  { name: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', lat: 30.5650, lng: 104.0550 },
  { name: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', lat: 30.5750, lng: 104.0500 },
  { name: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', lat: 30.5600, lng: 104.0650 },
  { name: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', lat: 30.5850, lng: 104.0580 },
  { name: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', lat: 30.5680, lng: 104.0700 },
  { name: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', lat: 30.5550, lng: 104.0450 },
]

const insertEmoji = (e) => {
  chatInput.value += e
  chatInput.value = chatInput.value
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const calcDist = (p1, p2) => {
  const R = 6371000
  const rad = (d) => d * Math.PI / 180
  const dlat = rad(p2.lat - p1.lat)
  const dlng = rad(p2.lng - p1.lng)
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dlng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const fmtDist = (m) => m < 1000 ? Math.round(m) + 'm' : (m / 1000).toFixed(1) + 'km'

const sendMessage = () => {
  const text = chatInput.value.trim()
  if (!text) return
  const id = ++msgIdCounter
  messages.value.push({ id, text, isSelf: true })
  chatInput.value = ''
  setTimeout(() => {
    messages.value = messages.value.filter(m => m.id !== id)
  }, 9000)
}

const onMicPointerDown = (e) => {
  isRecording.value = true
  dragZoneVisible.value = true
  startY = e.clientY
  const rect = e.target.getBoundingClientRect()
  dragZoneBottomY = rect.top - 12
  dragZoneTopY = dragZoneBottomY - 70
}

const onMicPointerMove = (e) => {
  if (!isRecording.value) return
  inDragZone.value = e.clientY >= dragZoneTopY && e.clientY <= dragZoneBottomY
}

const onMicPointerUp = (e) => {
  isRecording.value = false
  dragZoneVisible.value = false
  if (inDragZone.value) {
    isVoiceMode.value = false
    inDragZone.value = false
  }
}

const loadTencentMap = () => {
  return new Promise((resolve) => {
    if (window.qq && window.qq.maps) { resolve(window.qq.maps); return }
    const key = 'YOUR_TENCENT_MAP_KEY'
    window.__onTMapLoaded = () => {
      resolve(window.qq.maps)
      delete window.__onTMapLoaded
    }
    const script = document.createElement('script')
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=__onTMapLoaded`
    script.async = true
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    const maps = await loadTencentMap()
    const dest = new maps.LatLng(30.5713, 104.0583)

    map = new maps.Map(mapContainer.value, {
      center: dest,
      zoom: 14,
      scrollwheel: true,
      zoomControl: false,
      mapTypeControl: false
    })

    new maps.Marker({ position: dest, map })

    new maps.InfoWindow({
      map, position: dest,
      content: '<div style="color:#5D4037;font-size:11px;font-weight:bold;background:#FFFDF9;border:1px solid #FFD1DC;border-radius:8px;padding:2px 8px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">成都锦城公园</div>'
    })

    const userPt = new maps.LatLng(30.5702, 104.0614)

    new maps.Marker({ position: userPt, map })

    new maps.InfoWindow({
      map, position: userPt,
      content: '<div style="color:#A7C7E7;font-size:11px;font-weight:bold;background:#FFFDF9;border:1px solid #A7C7E7;border-radius:8px;padding:2px 8px;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">环球中心</div>'
    })

    const dist = calcDist(
      { lat: 30.5702, lng: 104.0614 },
      { lat: 30.5713, lng: 104.0583 }
    )
    distText.value = '距目的地 ' + fmtDist(dist)
    map.setCenter(userPt)
    map.setZoom(13)

    nearbyUsers.forEach(u => {
      const pt = new maps.LatLng(u.lat, u.lng)
      const d = calcDist({ lat: 30.5702, lng: 104.0614 }, u)
      if (d > 5000) return
      new maps.Marker({ position: pt, map })
      new maps.InfoWindow({
        map, position: pt,
        content: `<div style="display:flex;align-items:center;gap:4px;color:#5D4037;font-size:10px;font-weight:bold;background:#FFFDF9;border:1px solid #FFD1DC;border-radius:12px;padding:3px 8px;max-width:140px"><img src="${u.avatar}" style="width:16px;height:16px;border-radius:50%;object-fit:cover"/><span>${u.name}</span></div>`
      })
    })
  } catch {
    // map load failed
  } finally {
    loading.value = false
    loaded.value = true
  }
})

onUnmounted(() => {
  map = null
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col">
      <header class="px-6 pt-10 pb-3 flex items-center gap-4 shrink-0">
        <button class="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-100" @click="router.back()">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="text-lg font-black text-[#5D4037]">约遛位置</h1>
      </header>

      <div class="flex items-center gap-2 px-6 mb-3 shrink-0">
        <div class="flex-1 flex items-center gap-1.5 bg-[#F5F5F5] rounded-xl px-3 py-2 overflow-hidden">
          <iconify-icon class="shrink-0 text-[#A7C7E7]" icon="solar:map-point-bold"></iconify-icon>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] text-gray-400">我的位置</p>
            <p class="text-xs text-[#5D4037] font-bold truncate">{{ userAddr }}</p>
          </div>
        </div>
        <iconify-icon class="text-gray-300 text-lg" icon="solar:arrow-right-linear"></iconify-icon>
        <div class="flex-1 flex items-center gap-1.5 bg-[#FFF5F7] rounded-xl px-3 py-2">
          <iconify-icon class="text-[#FF85A2]" icon="solar:flag-bold"></iconify-icon>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] text-gray-400">目的地</p>
            <p class="text-xs text-[#5D4037] font-bold truncate">{{ destAddr }}</p>
          </div>
        </div>
      </div>

      <div class="flex-1 relative rounded-2xl overflow-hidden" ref="mapContainer">
        <div class="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 text-sm" v-show="loading">地图加载中...</div>

        <!-- Floating chat bubbles - full map, transparent background, topmost layer -->
        <div class="absolute inset-0 z-10 pointer-events-none overflow-hidden flex flex-col justify-end" v-show="messages.length">
          <div class="px-4 pb-5 space-y-2">
            <div v-for="msg in messages" :key="msg.id" class="flex animate-float-up" :class="msg.isSelf ? 'justify-end' : 'justify-start'">
              <div class="max-w-[70%] px-3 py-2 rounded-2xl text-xs shadow-md" :class="msg.isSelf ? 'bg-[#FF85A2] text-white' : 'bg-white text-[#5D4037] border border-gray-100'">
                {{ msg.text }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- input area -->
      <div class="shrink-0 px-4 py-3 bg-[#FFFDF9]">
          <template v-if="isVoiceMode">
            <div class="flex flex-col items-center relative">
              <div v-show="dragZoneVisible"
                class="absolute -top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 select-none"
                :class="inDragZone ? 'bg-[#FF85A2] text-white scale-110 shadow-lg shadow-pink-200' : 'bg-gray-100 text-gray-400 border border-gray-200'">
                上滑 松手切换文字
              </div>
              <div v-show="isRecording && !inDragZone" class="absolute -top-14 w-12 h-12 rounded-full bg-[#FF85A2]/20 animate-ping pointer-events-none"></div>
              <button
                class="w-16 h-16 rounded-full bg-[#FF85A2] text-white flex items-center justify-center shadow-lg shadow-pink-200 active:scale-90 transition-transform select-none touch-none relative"
                @pointerdown="onMicPointerDown"
                @pointermove="onMicPointerMove"
                @pointerup="onMicPointerUp"
                @pointerleave="onMicPointerUp">
                <iconify-icon class="text-3xl" :icon="isRecording ? 'solar:record-bold' : 'solar:microphone-bold'"></iconify-icon>
              </button>
              <p class="text-[10px] text-gray-300 mt-1 select-none">{{ isRecording ? '录制中...' : '按住 语音输入' }}</p>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col gap-2">
              <div v-show="showEmojiPicker" class="bg-white border border-gray-100 rounded-2xl shadow-xl p-3 max-h-[180px] overflow-y-auto custom-scrollbar grid grid-cols-7 gap-1">
                <button v-for="e in emojis" :key="e" class="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-50 rounded-lg transition-colors" @click="insertEmoji(e)">{{ e }}</button>
              </div>
              <div class="flex items-center gap-2">
                <button class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0" @click="isVoiceMode = true">
                  <iconify-icon class="text-gray-400 text-lg" icon="solar:microphone-bold"></iconify-icon>
                </button>
                <input class="flex-1 h-10 bg-gray-100 rounded-xl px-4 text-xs text-[#5D4037] outline-none" v-model="chatInput" placeholder="输入消息..." @keyup.enter="sendMessage" />
                <button class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-base leading-none" @click="toggleEmojiPicker">
                  😊
                </button>
                <button class="h-10 px-4 rounded-xl bg-[#FF85A2] text-white text-xs font-bold shadow-md shrink-0" @click="sendMessage">发送</button>
              </div>
            </div>
          </template>
        </div>

      <div class="px-6 py-4 bg-[#FFFDF9] border-t border-gray-50 shrink-0">
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">{{ distText || '计算距离中...' }}</p>
          <button class="bg-red-400 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-red-100" @click="router.push('/social')">
            断开连接
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float-up {
  0% { opacity: 1; transform: translateY(0); }
  70% { opacity: 1; filter: blur(0); }
  100% { opacity: 0; transform: translateY(-500px); filter: blur(6px); }
}
.animate-float-up {
  animation: float-up 10s linear forwards;
}
</style>
