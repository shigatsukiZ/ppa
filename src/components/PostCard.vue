<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: [String, Number], default: '' },
  nickname: { type: String, default: '' },
  avatar: { type: String, default: '' },
  time: { type: String, default: '' },
  content: { type: String, default: '' },
  images: { type: Array, default: () => [] },
  video: { type: String, default: '' },
  location: { type: String, default: '' },
  likes: { type: [String, Number], default: '0' },
  comments: { type: [String, Number], default: '0' },
  retweets: { type: [String, Number], default: '0' },
  views: { type: [String, Number], default: '0' },
  favorites: { type: [String, Number], default: '0' },
  hasBadge: { type: Boolean, default: false },
  liked: { type: Boolean, default: false },
  retweeted: { type: Boolean, default: false },
  favorited: { type: Boolean, default: false },
  isAd: { type: Boolean, default: false },
  brandLogo: { type: String, default: '' },
  brandName: { type: String, default: '' },
})

const emit = defineEmits(['like', 'comment', 'retweet', 'favorite', 'share', 'more', 'location-click', 'avatar-click'])

const videoPlaying = ref(false)

const gridCols = computed(() => props.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2')
const videoRef = ref(null)

const toggleVideo = () => {
  if (!videoRef.value) return
  if (videoPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
  videoPlaying.value = !videoPlaying.value
}
</script>

<template>
  <div class="px-4 pt-3 pb-2 hover:bg-gray-50 transition-colors border-b border-[#F0F0F0]">
    <div v-if="isAd" class="flex items-center gap-2 mb-2">
      <img :src="brandLogo" class="w-5 h-5 rounded object-cover" alt="brand"/>
      <span class="text-[10px] text-gray-400 font-medium">{{ brandName }}</span>
      <span class="text-[9px] text-gray-300 ml-auto border border-gray-200 px-1.5 py-0.5 rounded">广告</span>
    </div>

    <div class="flex gap-3">
      <div class="shrink-0 cursor-pointer" @click="emit('avatar-click', nickname)">
        <img :src="avatar" :alt="nickname" class="w-10 h-10 rounded-full object-cover bg-gray-100" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5 mb-0.5">
          <span class="text-sm font-bold text-[#5D4037] truncate cursor-pointer" @click="emit('avatar-click', nickname)">{{ nickname }}</span>
          <span v-if="hasBadge" class="text-[8px] leading-none bg-[#A7C7E7] text-white px-1.5 py-0.5 rounded-full shrink-0">✓</span>
          <span class="text-[10px] text-gray-400 truncate shrink-0">@{{ nickname }} · {{ time }}</span>
          <button class="ml-auto shrink-0 px-1 text-gray-300 hover:text-gray-500 transition-colors" @click="emit('more', id)">
            <iconify-icon class="text-lg" icon="solar:menu-dots-bold"></iconify-icon>
          </button>
        </div>

        <p class="text-sm text-gray-800 leading-relaxed mb-3 whitespace-pre-wrap break-words">{{ content }}</p>

        <div v-if="images.length" :class="`grid ${gridCols} gap-1 mb-3`">
          <div v-for="(img, idx) in images" :key="idx" class="rounded-xl overflow-hidden">
            <img :src="img" class="w-full aspect-square object-cover" alt="post image"/>
          </div>
        </div>

        <div v-if="video" class="relative mb-3 rounded-2xl overflow-hidden bg-black cursor-pointer" @click="toggleVideo">
          <video ref="videoRef" :src="video" class="w-full aspect-video object-cover" preload="metadata" playsinline @ended="videoPlaying = false"></video>
          <div v-if="!videoPlaying" class="absolute inset-0 flex items-center justify-center bg-black/20">
            <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <iconify-icon class="text-[#FF85A2] text-3xl ml-1" icon="solar:play-bold"></iconify-icon>
            </div>
          </div>
        </div>

        <div v-if="location" class="flex items-center gap-1 mb-3 cursor-pointer" @click="emit('location-click', id)">
          <iconify-icon class="text-[#A7C7E7] text-sm" icon="solar:map-point-bold"></iconify-icon>
          <span class="text-xs text-[#A7C7E7] font-medium">{{ location }}</span>
        </div>

        <div class="flex items-center justify-between mt-1 -ml-2 max-w-[320px]">
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]" @click="emit('comment', id)">
            <iconify-icon class="text-base" icon="solar:chat-line-linear"></iconify-icon>
            <span v-if="comments > 0">{{ comments }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]" :class="retweeted ? 'text-green-500' : 'text-gray-400'" @click="emit('retweet', id)">
            <iconify-icon class="text-base" :icon="retweeted ? 'solar:repeat-bold' : 'solar:repeat-linear'"></iconify-icon>
            <span v-if="retweets > 0">{{ retweets }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-[11px]" :class="liked ? 'text-[#FF85A2]' : 'text-gray-400'" @click="emit('like', id)">
            <iconify-icon class="text-base" :icon="liked ? 'solar:heart-bold' : 'solar:heart-linear'"></iconify-icon>
            <span v-if="likes > 0">{{ likes }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]">
            <iconify-icon class="text-base" icon="solar:eye-linear"></iconify-icon>
            <span v-if="views > 0">{{ views }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-[11px]" :class="favorited ? 'text-yellow-500' : 'text-gray-400'" @click="emit('favorite', id)">
            <iconify-icon class="text-base" :icon="favorited ? 'solar:bookmark-bold' : 'solar:bookmark-linear'"></iconify-icon>
            <span v-if="favorites > 0">{{ favorites }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]" @click="emit('share', id)">
            <iconify-icon class="text-base" icon="solar:export-linear"></iconify-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
