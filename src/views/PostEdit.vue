<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const content = ref('')
const images = ref([])
const linkUrl = ref('')
const pollQuestion = ref('')
const pollOptions = ref(['', ''])
const scheduleTime = ref('')
const locationText = ref('')
const selectedTag = ref('')
const visibility = ref('每个人')
const commentPerm = ref('所有人可以回复')
const showVisibility = ref(false)
const showCommentPerm = ref(false)

const showGallery = ref(false)
const showGif = ref(false)
const showLink = ref(false)
const showPoll = ref(false)
const showEmoji = ref(false)
const showSchedule = ref(false)
const showLocation = ref(false)
const showFlag = ref(false)
const draftBtnText = ref('草稿')

const visibilityOptions = ['每个人', '仅关注的人', '仅我']
const commentOptions = ['所有人可以回复', '仅关注的人可以回复', '仅我']

const tagOptions = ['宠物日常', '好物分享', '萌宠搞笑', '健康养护', '寻宠启事', '约遛组局', '经验交流']

const mapContainer = ref(null)
let map = null
let marker = null
const mapLoading = ref(false)

const loadTencentMap = () => new Promise((resolve, reject) => {
  if (window.qq?.maps) return resolve(window.qq.maps)
  const key = 'YOUR_TENCENT_MAP_KEY'
  window.__onTMapLoaded = () => {
    resolve(window.qq.maps)
    delete window.__onTMapLoaded
  }
  const script = document.createElement('script')
  script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=__onTMapLoaded`
  script.async = true
  script.onerror = () => reject(new Error('Tencent Map load failed'))
  document.head.appendChild(script)
})

const onMapClick = (ev) => {
  const latlng = ev.latLng
  if (marker) marker.setPosition(latlng)
  else marker = new window.qq.maps.Marker({ position: latlng, map })
  const geocoder = new window.qq.maps.Geocoder()
  geocoder.getAddress(latlng)
  geocoder.setComplete((result) => {
    const addr = result.detail.address
    locationText.value = addr
  })
  geocoder.search(latlng)
}

const openLocationPicker = async () => {
  showLocation.value = true
  await new Promise(r => setTimeout(r, 400))
  if (!mapContainer.value || map) return
  mapLoading.value = true
  try {
    const maps = await loadTencentMap()
    const center = new maps.LatLng(30.5713, 104.0583)
    map = new maps.Map(mapContainer.value, {
      center,
      zoom: 13,
      scrollwheel: true,
      zoomControl: false,
      mapTypeControl: false,
    })
    maps.event.addListener(map, 'click', onMapClick)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const pt = new maps.LatLng(pos.coords.latitude, pos.coords.longitude)
        map.setCenter(pt)
        map.setZoom(15)
        marker = new maps.Marker({ position: pt, map })
      }, () => {}, { enableHighAccuracy: true, timeout: 5000 })
    }
  } catch {
    locationText.value = '地图加载失败'
  } finally {
    mapLoading.value = false
  }
}

const confirmLocation = () => {
  if (locationText.value.trim()) {
    content.value += ' 📍 ' + locationText.value.trim()
    locationText.value = ''
  }
  if (map) { map = null; marker = null }
  showLocation.value = false
}

const cancelLocation = () => {
  locationText.value = ''
  if (map) { map = null; marker = null }
  showLocation.value = false
}

const emojiList = '😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗😚😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥳😎🤓🧐😕😟🙁😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖😺😸😹😻😼😽🙀😿😾💕💞💓💗💖💘💝❤️🧡💛💚💙💜🤎🖤🤍💔❣️💋'

const close = () => router.back()

const saveDraft = () => {
  const draft = {
    content: content.value,
    images: images.value,
    visibility: visibility.value,
    commentPerm: commentPerm.value,
    savedAt: new Date().toLocaleString('zh-CN'),
  }
  localStorage.setItem('ppa_draft', JSON.stringify(draft))
  draftBtnText.value = '已保存'
  setTimeout(() => { draftBtnText.value = '草稿' }, 1500)
}

const canPost = computed(() => content.value.trim().length > 0)

const post = () => {
  if (!canPost.value) return
  const newPost = {
    id: Date.now(),
    nickname: '元宝麻麻',
    username: 'yuanbao_mama',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
    time: '刚刚',
    location: visibility.value === '每个人' ? '公开' : visibility.value,
    content: content.value,
    image: images.value[0] || '',
    likes: '0',
    comments: '0',
    hasBadge: true,
    liked: false,
  }
  const stored = JSON.parse(localStorage.getItem('ppa_new_posts') || '[]')
  stored.unshift(newPost)
  localStorage.setItem('ppa_new_posts', JSON.stringify(stored))
  router.back()
}

const selectVisibility = (opt) => { visibility.value = opt; showVisibility.value = false }
const selectCommentPerm = (opt) => { commentPerm.value = opt; showCommentPerm.value = false }

const fileInput = ref(null)
const triggerFileInput = () => fileInput.value?.click()
const onFileChange = (e) => {
  const files = Array.from(e.target.files || [])
  files.forEach(f => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      images.value.push(ev.target.result)
    }
    reader.readAsDataURL(f)
  })
  e.target.value = ''
}

const removeImage = (idx) => { images.value.splice(idx, 1) }

const addPollOption = () => { if (pollOptions.value.length < 6) pollOptions.value.push('') }
const removePollOption = (idx) => { if (pollOptions.value.length > 2) pollOptions.value.splice(idx, 1) }

const insertEmoji = (e) => {
  const start = content.value.length
  content.value = content.value.slice(0, start) + e + content.value.slice(start)
  showEmoji.value = false
}

const addGif = (url) => {
  images.value.push(url)
  showGif.value = false
}

const saveLink = () => {
  if (linkUrl.value.trim()) {
    content.value += ' ' + linkUrl.value.trim()
    linkUrl.value = ''
    showLink.value = false
  }
}

const savePoll = () => {
  if (pollQuestion.value.trim()) {
    const opts = pollOptions.value.filter(o => o.trim())
    content.value += '\n📊 ' + pollQuestion.value.trim() + (opts.length ? '\n' + opts.map((o, i) => `${i + 1}. ${o}`).join('\n') : '')
    pollQuestion.value = ''
    pollOptions.value = ['', '']
    showPoll.value = false
  }
}

const saveSchedule = () => {
  if (scheduleTime.value) {
    content.value += ' 📅 ' + scheduleTime.value
    scheduleTime.value = ''
    showSchedule.value = false
  }
}

const saveLocation = () => {
  if (locationText.value.trim()) {
    content.value += ' 📍 ' + locationText.value.trim()
    locationText.value = ''
    showLocation.value = false
  }
}

const selectTag = (tag) => {
  selectedTag.value = tag
  content.value += ' #' + tag + ' '
  showFlag.value = false
}

const gifUrls = [
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTd4MzhidDBpMTExdGZ4dzVoZjhjazRtNTB2cWJxZjNha2hkdmZ2OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1iP5dLJ8FVHneOo7y/giphy.gif',
  'https://media.giphy.com/media/1iP5dLJ8FVHneOo7y/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGZ4dzVoZjhjazRtNTB2cWJxZjNha2hkZHZmZ2ZzZ2ZzZ2ZzZ2ZzL2dpZnkvZ2lmLmdpZiZjdD1nL2dpZnkvZ2lmLmdpZg/giphy.gif',
  'https://media.giphy.com/media/3o7aD2sa1B4V1Y6Ve/giphy.gif',
]
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center text-gray-500 -ml-1 rounded-full hover:bg-gray-100 transition-colors" @click="close">
          <iconify-icon class="text-2xl" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1"></span>
        <button
          class="px-3 py-1 mr-2 rounded-full text-[11px] text-[#FF85A2] font-medium border border-[#FFD1DC] bg-white hover:bg-[#FDF0F3] transition-colors"
          @click="saveDraft"
        >{{ draftBtnText }}</button>
        <button
          class="px-5 py-1.5 rounded-full text-sm font-bold transition-colors"
          :class="canPost ? 'bg-[#FF85A2] text-white shadow-sm shadow-pink-200' : 'bg-gray-100 text-gray-300'"
          @click="post"
        >发帖</button>
      </header>

      <main class="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
        <div class="flex items-start gap-3 px-4 pt-4 pb-2">
          <img class="w-10 h-10 rounded-full object-cover shrink-0" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" alt="avatar"/>
          <div class="relative">
            <button class="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-[#5D4037] font-medium" @click="showVisibility = !showVisibility">
              <iconify-icon class="text-sm" icon="solar:globe-linear"></iconify-icon>
              {{ visibility }}
              <iconify-icon class="text-[10px] transition-transform" :class="showVisibility ? 'rotate-180' : ''" icon="solar:alt-arrow-down-linear"></iconify-icon>
            </button>
            <Transition name="fade">
              <div v-if="showVisibility" class="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10 min-w-[140px]">
                <button v-for="opt in visibilityOptions" :key="opt" class="block w-full text-left px-3 py-2 text-xs text-[#5D4037] hover:bg-[#FDF0F3] transition-colors" :class="visibility === opt ? 'font-bold text-[#FF85A2]' : ''" @click="selectVisibility(opt)">{{ opt }}</button>
              </div>
            </Transition>
          </div>
        </div>

        <div class="flex-1 flex flex-col px-4 pt-2">
          <textarea
            v-model="content"
            placeholder="有什么新鲜事？"
            class="w-full flex-1 resize-none text-base text-[#5D4037] placeholder-gray-300 leading-relaxed outline-none bg-transparent min-h-[180px] rounded-xl"
          ></textarea>

          <div v-if="images.length" class="flex gap-2 flex-wrap mb-3">
            <div v-for="(img, idx) in images" :key="idx" class="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100">
              <img :src="img" class="w-full h-full object-cover" alt="preview"/>
              <button class="absolute top-0.5 right-0.5 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white text-xs" @click="removeImage(idx)">✕</button>
            </div>
          </div>
        </div>

        <div class="shrink-0 px-4 py-3 border-t border-[#F0F0F0]">
          <div class="relative">
            <button class="flex items-center gap-1.5 text-xs text-[#FF85A2] font-medium" @click="showCommentPerm = !showCommentPerm">
              <iconify-icon icon="solar:chat-round-dots-linear"></iconify-icon>
              {{ commentPerm }}
            </button>
            <Transition name="fade">
              <div v-if="showCommentPerm" class="absolute bottom-full left-0 mb-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10 min-w-[180px]">
                <button v-for="opt in commentOptions" :key="opt" class="block w-full text-left px-3 py-2 text-xs text-[#5D4037] hover:bg-[#FDF0F3] transition-colors" :class="commentPerm === opt ? 'font-bold text-[#FF85A2]' : ''" @click="selectCommentPerm(opt)">{{ opt }}</button>
              </div>
            </Transition>
          </div>
        </div>
      </main>

      <div class="shrink-0 border-t border-[#F0F0F0] px-4 py-3">
        <div class="flex items-center justify-around">
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="triggerFileInput">
            <iconify-icon class="text-xl" icon="solar:gallery-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showGif = true">
            <iconify-icon class="text-xl" icon="solar:gift-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showLink = true">
            <iconify-icon class="text-xl" icon="solar:link-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showPoll = true">
            <iconify-icon class="text-xl" icon="solar:chart-square-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showEmoji = true">
            <span class="text-xl">😊</span>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showSchedule = true">
            <iconify-icon class="text-xl" icon="solar:calendar-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="openLocationPicker">
            <iconify-icon class="text-xl" icon="solar:map-point-bold"></iconify-icon>
          </button>
          <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="showFlag = true">
            <iconify-icon class="text-xl" icon="solar:flag-bold"></iconify-icon>
          </button>
        </div>
      </div>

      <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFileChange" />

      <Transition name="fade">
        <div v-if="showGif" class="overlay z-30" @click="showGif = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showGif" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">选择 GIF</span>
            <button @click="showGif = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <div class="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar">
            <img v-for="(url, idx) in gifUrls" :key="idx" :src="url" class="w-full aspect-video rounded-xl object-cover cursor-pointer border border-gray-100" @click="addGif(url)" alt="gif"/>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showLink" class="overlay z-30" @click="showLink = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showLink" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">添加链接</span>
            <button @click="showLink = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <input v-model="linkUrl" placeholder="输入 URL 链接" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none border border-gray-100 mb-4"/>
          <button class="w-full py-3 rounded-2xl bg-[#FF85A2] text-white text-sm font-bold" @click="saveLink">添加</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showPoll" class="overlay z-30" @click="showPoll = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showPoll" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">创建投票</span>
            <button @click="showPoll = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <input v-model="pollQuestion" placeholder="投票问题" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none border border-gray-100 mb-3"/>
          <div class="space-y-2 mb-3">
            <div v-for="(opt, idx) in pollOptions" :key="idx" class="flex items-center gap-2">
              <input v-model="pollOptions[idx]" :placeholder="'选项 ' + (idx + 1)" class="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none border border-gray-100"/>
              <button v-if="pollOptions.length > 2" class="text-gray-300 text-lg" @click="removePollOption(idx)">✕</button>
            </div>
          </div>
          <button v-if="pollOptions.length < 6" class="text-[#FF85A2] text-xs font-bold mb-4" @click="addPollOption">+ 添加选项</button>
          <button class="w-full py-3 rounded-2xl bg-[#FF85A2] text-white text-sm font-bold" @click="savePoll">添加到正文</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showEmoji" class="overlay z-30" @click="showEmoji = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showEmoji" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">选择表情</span>
            <button @click="showEmoji = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <div class="grid grid-cols-7 gap-2 max-h-60 overflow-y-auto custom-scrollbar">
            <button v-for="e in [...emojiList]" :key="e" class="w-9 h-9 flex items-center justify-center text-xl hover:bg-[#FDF0F3] rounded-xl transition-colors" @click="insertEmoji(e)">{{ e }}</button>
          </div>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showSchedule" class="overlay z-30" @click="showSchedule = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showSchedule" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">定时发布</span>
            <button @click="showSchedule = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <input v-model="scheduleTime" type="datetime-local" class="w-full px-4 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none border border-gray-100 mb-4"/>
          <button class="w-full py-3 rounded-2xl bg-[#FF85A2] text-white text-sm font-bold" @click="saveSchedule">确定</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showLocation" class="overlay z-30" @click="cancelLocation"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showLocation" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">添加位置</span>
            <button @click="cancelLocation"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <div class="w-full h-48 rounded-2xl overflow-hidden mb-3 bg-gray-50 relative" ref="mapContainer">
            <div v-if="mapLoading" class="absolute inset-0 flex items-center justify-center bg-gray-50 text-xs text-gray-400">加载地图中...</div>
          </div>
          <div class="flex items-center gap-2 mb-3">
            <iconify-icon class="text-[#FF85A2] shrink-0" icon="solar:map-point-bold"></iconify-icon>
            <input v-model="locationText" placeholder="点击地图选择位置" class="flex-1 px-3 py-2 rounded-xl bg-gray-50 text-xs text-[#5D4037] outline-none border border-gray-100" readonly/>
          </div>
          <button class="w-full py-3 rounded-2xl bg-[#FF85A2] text-white text-sm font-bold" :class="locationText.trim() ? '' : 'opacity-50'" :disabled="!locationText.trim()" @click="confirmLocation">确定</button>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="showFlag" class="overlay z-30" @click="showFlag = false"></div>
      </Transition>
      <Transition name="slide-up">
        <div v-if="showFlag" class="sheet">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-[#5D4037]">选择话题</span>
            <button @click="showFlag = false"><iconify-icon icon="solar:close-circle-linear" class="text-gray-400 text-xl"></iconify-icon></button>
          </div>
          <div class="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
            <button v-for="tag in tagOptions" :key="tag" class="px-4 py-2 rounded-full text-xs font-bold border border-[#FFD1DC] text-[#FF85A2] hover:bg-[#FDF0F3] transition-colors" @click="selectTag(tag)">{{ tag }}</button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
