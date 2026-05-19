<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mapContainer = ref(null)
const loading = ref(true)
const userAddr = ref('获取中...')
const destAddr = ref('西溪湿地南门')
const distText = ref('')
const loaded = ref(false)

let map = null

const loadBaiduMap = () => {
  return new Promise((resolve) => {
    if (window.BMap) { resolve(window.BMap); return }
    const key = 'YOUR_BAIDU_MAP_KEY'
    window.__onBMapLoaded = () => {
      resolve(window.BMap)
      delete window.__onBMapLoaded
    }
    const script = document.createElement('script')
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${key}&callback=__onBMapLoaded`
    script.async = true
    document.head.appendChild(script)
  })
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

onMounted(async () => {
  try {
    await loadBaiduMap()
    const BMap = window.BMap
    const dest = { lng: 120.1358, lat: 30.2712 }

    map = new BMap.Map(mapContainer.value)
    map.centerAndZoom(new BMap.Point(dest.lng, dest.lat), 14)
    map.enableScrollWheelZoom()

    const destIcon = new BMap.Icon(
      '//api.map.baidu.com/library/customMarker/img/mk.png',
      new BMap.Size(23, 25)
    )
    const destMarker = new BMap.Marker(new BMap.Point(dest.lng, dest.lat), { icon: destIcon })
    map.addOverlay(destMarker)

    const destLabel = new BMap.Label('西溪湿地南门', {
      position: new BMap.Point(dest.lng, dest.lat),
      offset: new BMap.Size(-35, -30)
    })
    destLabel.setStyle({
      color: '#5D4037', fontSize: '11px', fontWeight: 'bold',
      background: '#FFFDF9', border: '1px solid #FFD1DC',
      borderRadius: '8px', padding: '2px 8px', whiteSpace: 'nowrap'
    })
    map.addOverlay(destLabel)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPt = new BMap.Point(pos.coords.longitude, pos.coords.latitude)
          const userIcon = new BMap.Icon(
            '//api.map.baidu.com/library/customMarker/img/mk.png',
            new BMap.Size(23, 25)
          )
          const userMarker = new BMap.Marker(userPt, { icon: userIcon })
          map.addOverlay(userMarker)

          const userLabel = new BMap.Label('我的位置', {
            position: userPt,
            offset: new BMap.Size(-20, -30)
          })
          userLabel.setStyle({
            color: '#A7C7E7', fontSize: '11px', fontWeight: 'bold',
            background: '#FFFDF9', border: '1px solid #A7C7E7',
            borderRadius: '8px', padding: '2px 8px', whiteSpace: 'nowrap'
          })
          map.addOverlay(userLabel)

          const dist = calcDist(
            { lat: pos.coords.latitude, lng: pos.coords.longitude },
            { lat: dest.lat, lng: dest.lng }
          )
          distText.value = '距目的地 ' + fmtDist(dist)

          map.centerAndZoom(userPt, 13)
        },
        () => {
          userAddr.value = '定位失败，使用默认位置'
        },
        { enableHighAccuracy: true, timeout: 10000 }
      )
    } else {
      userAddr.value = '浏览器不支持定位'
    }
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
        <div class="flex-1 flex items-center gap-1.5 bg-[#F5F5F5] rounded-xl px-3 py-2">
          <iconify-icon class="text-[#A7C7E7]" icon="solar:map-point-bold"></iconify-icon>
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

      <div class="flex-1 relative" ref="mapContainer">
        <div class="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 text-sm" v-show="loading">地图加载中...</div>
      </div>

      <div class="px-6 py-4 bg-[#FFFDF9] border-t border-gray-50 shrink-0">
        <div class="flex items-center justify-between">
          <p class="text-xs text-gray-400">{{ distText || '计算距离中...' }}</p>
          <button class="bg-[#FF85A2] text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-pink-100" @click="alert('已发送加入申请')">
            申请加入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
