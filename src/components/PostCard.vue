<script setup>
import { ref, computed } from 'vue'
import WalkCard from './WalkCard.vue'

const props = defineProps({
  id: { type: [String, Number], default: '' },
  nickname: { type: String, default: '' },
  avatar: { type: String, default: '' },
  time: { type: String, default: '' },
  content: { type: String, default: '' },
  images: { type: Array, default: () => [] },
  video: { type: String, default: '' },
  walk: { type: Object, default: null },
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

const emit = defineEmits(['like', 'comment', 'retweet', 'favorite', 'share', 'detail', 'product', 'avatar-click', 'walk-join', 'walk-view-map'])

const videoPlaying = ref(false)
const showCommentModal = ref(false)
const commentText = ref('')
const showRetweetModal = ref(false)
const showMoreDropdown = ref(false)
const showAtDropdown = ref(false)
const showEmojiPicker = ref(false)

const mentionUsers = [
  '大白姐姐', '团子爸爸', '泡芙麻麻', '毛球麻麻', '可乐麻麻', '布丁麻麻', '七喜麻麻', '糯米麻麻',
]

const emojiList = ['😊', '😂', '🥰', '😍', '🤩', '😘', '😭', '😤', '🤔', '🙄', '😴', '🥺', '😎', '🤗', '🐾', '❤️', '🔥', '✨', '🌟', '💪', '🎉', '👏', '🙌', '🍀']

const insertAt = () => {
  showAtDropdown.value = !showAtDropdown.value
  showEmojiPicker.value = false
}

const selectMention = (name) => {
  commentText.value = commentText.value + '@' + name + ' '
  showAtDropdown.value = false
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
  showAtDropdown.value = false
}

const insertEmoji = (emoji) => {
  commentText.value = commentText.value + emoji
  showEmojiPicker.value = false
}

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

const submitComment = () => {
  if (commentText.value.trim()) {
    emit('comment', { id: props.id, text: commentText.value })
    commentText.value = ''
    showCommentModal.value = false
  }
}

const onRetweetClick = () => {
  showRetweetModal.value = true
}

const confirmRetweet = (withComment) => {
  showRetweetModal.value = false
  emit('retweet', { id: props.id, withComment })
}

const retweetComment = ref('')
const submitRetweetWithComment = () => {
  showRetweetModal.value = false
  emit('retweet', { id: props.id, withComment: true, text: retweetComment.value.trim() || undefined })
  retweetComment.value = ''
}

const closeRetweetModal = () => {
  showRetweetModal.value = false
  retweetComment.value = ''
}

const dropdownOptions = [
  { label: '举报', icon: 'solar:flag-bold', action: 'report' },
  { label: '不感兴趣', icon: 'solar:eye-closed-bold', action: 'uninterested' },
  { label: '屏蔽该用户', icon: 'solar:user-block-bold', action: 'block' },
  { label: '复制链接', icon: 'solar:copy-bold', action: 'copy' },
]

const onDropdownAction = (action) => {
  showMoreDropdown.value = false
  if (action === 'report') {
    alert('已举报，我们会尽快处理')
  } else if (action === 'uninterested') {
    emit('detail', props.id)
  } else if (action === 'block') {
    if (confirm(`确认屏蔽 ${props.nickname}？`)) {
      alert('已屏蔽')
    }
  } else if (action === 'copy') {
    navigator.clipboard?.writeText(`${props.nickname}：${props.content}`)
    alert('已复制链接')
  }
}
</script>

<template>
  <div class="px-4 pt-3 pb-2 hover:bg-gray-50 transition-colors border-b border-[#F0F0F0]" :class="isAd ? 'cursor-pointer' : ''" @click="isAd ? emit('product', id) : undefined">
    <div v-if="isAd" class="flex items-center gap-2 mb-2">
      <img :src="brandLogo" class="w-5 h-5 rounded object-cover" alt="brand"/>
      <span class="text-[10px] text-gray-400 font-medium">{{ brandName }}</span>
      <span class="text-[9px] text-gray-300 ml-auto border border-gray-200 px-1.5 py-0.5 rounded">广告</span>
    </div>

    <div class="flex gap-3" @click.stop>
      <div class="shrink-0 w-10 h-10 cursor-pointer" @click="emit('avatar-click', nickname)">
        <img :src="avatar" :alt="nickname" class="w-full h-full rounded-full object-cover bg-gray-100" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1.5 mb-0.5">
          <span class="text-sm font-bold text-[#5D4037] truncate cursor-pointer" @click="emit('avatar-click', nickname)">{{ nickname }}</span>
          <span v-if="hasBadge" class="text-[8px] leading-none bg-[#A7C7E7] text-white px-1.5 py-0.5 rounded-full shrink-0">✓</span>
          <span class="text-[10px] text-gray-400 truncate shrink-0">@{{ nickname }} · {{ time }}</span>
          <div class="ml-auto shrink-0 relative">
            <button class="px-1 text-gray-300 hover:text-gray-500 transition-colors rounded-full" @click.stop="showMoreDropdown = !showMoreDropdown">
              <iconify-icon class="text-lg" icon="solar:menu-dots-bold"></iconify-icon>
            </button>
            <Transition name="scale">
              <div v-if="showMoreDropdown" class="absolute right-0 top-8 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 w-36 z-50" @click.stop>
                <button v-for="opt in dropdownOptions" :key="opt.action" class="flex items-center gap-2 w-full px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors" @click="onDropdownAction(opt.action)">
                  <iconify-icon :icon="opt.icon" class="text-sm text-gray-400"></iconify-icon>
                  {{ opt.label }}
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <p class="text-sm text-gray-800 leading-relaxed mb-3 whitespace-pre-wrap break-words cursor-pointer" @click.stop="isAd ? emit('product', id) : emit('detail', id)">{{ content }}</p>

        <div v-if="images.length" :class="`grid ${gridCols} gap-1 mb-3 cursor-pointer`" @click.stop="isAd ? emit('product', id) : emit('detail', id)">
          <div v-for="(img, idx) in images" :key="idx" class="rounded-xl overflow-hidden">
            <img :src="img" class="w-full aspect-square object-cover" alt="post image"/>
          </div>
        </div>

        <div v-if="video" class="relative mb-3 rounded-2xl overflow-hidden bg-black cursor-pointer" @click.stop="toggleVideo">
          <video ref="videoRef" :src="video" class="w-full aspect-video object-cover" preload="metadata" playsinline @ended="videoPlaying = false"></video>
          <div v-if="!videoPlaying" class="absolute inset-0 flex items-center justify-center bg-black/20">
            <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <iconify-icon class="text-[#FF85A2] text-3xl ml-1" icon="solar:play-bold"></iconify-icon>
            </div>
          </div>
        </div>

        <div v-if="walk" class="mb-3" @click.stop>
          <WalkCard v-bind="walk" @join="emit('walk-join', id)" @view-map="emit('walk-view-map', id)"/>
        </div>

        <div class="flex items-center justify-between mt-1 -ml-2 max-w-[320px]" @click.stop>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]" @click="showCommentModal = true">
            <iconify-icon class="text-base" icon="solar:chat-line-linear"></iconify-icon>
            <span v-if="comments > 0">{{ comments }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 text-[11px]" :class="retweeted ? 'text-green-500' : 'text-gray-400'" @click="onRetweetClick">
            <iconify-icon class="text-base" :icon="retweeted ? 'solar:repeat-bold' : 'solar:repeat-linear'"></iconify-icon>
            <span v-if="retweets > 0">{{ retweets }}</span>
          </button>
          <button class="flex items-center gap-1 px-1.5 py-1 rounded-full hover:bg-gray-100 transition-colors text-[11px]" :class="liked ? 'text-[#FF85A2]' : 'text-gray-400'" @click="emit('like', id)">
            <iconify-icon class="text-base" :icon="liked ? 'solar:heart-bold' : 'solar:heart-linear'"></iconify-icon>
            <span v-if="likes > 0">{{ likes }}</span>
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

    <Transition name="fade">
      <div v-if="showCommentModal" class="fixed inset-0 bg-black/40 z-50" @click="showCommentModal = false"></div>
    </Transition>
    <Transition name="scale">
      <div v-if="showCommentModal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] p-5 w-[300px] z-50 shadow-2xl" @click.stop="showAtDropdown = false; showEmojiPicker = false">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-black text-[#5D4037]">写评论</h3>
          <button class="text-gray-300 hover:text-gray-500 rounded-full p-1" @click="showCommentModal = false">
            <iconify-icon icon="solar:close-bold"></iconify-icon>
          </button>
        </div>
        <textarea v-model="commentText" placeholder="说说你的看法..." class="w-full px-4 py-3 text-sm rounded-2xl bg-gray-50 outline-none text-[#5D4037] resize-none" rows="4" maxlength="500"/>
        <div class="flex justify-between items-center mt-3">
          <div class="flex items-center gap-1 relative">
            <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors bg-[#FFB6C1] text-white font-bold text-sm" @click="insertAt">@</button>
            <Transition name="scale">
              <div v-if="showAtDropdown" class="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 w-36 max-h-48 overflow-y-auto z-50 custom-scrollbar" @click.stop>
                <button v-for="name in mentionUsers" :key="name" class="w-full px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 text-left transition-colors" @click="selectMention(name)">@{{ name }}</button>
              </div>
            </Transition>
            <div class="relative">
              <button class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDF0F3] transition-colors text-[#FFB6C1]" @click="toggleEmojiPicker">
                <iconify-icon class="text-lg" icon="solar:emoji-funny-square-bold"></iconify-icon>
              </button>
              <Transition name="scale">
                <div v-if="showEmojiPicker" class="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-56 z-50 grid grid-cols-6 gap-1" @click.stop>
                  <button v-for="emoji in emojiList" :key="emoji" class="w-7 h-7 flex items-center justify-center text-sm hover:bg-gray-100 rounded-lg transition-colors" @click="insertEmoji(emoji)">{{ emoji }}</button>
                </div>
              </Transition>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] text-gray-300">{{ commentText.length }}/500</span>
            <button class="px-6 py-2 text-xs font-bold rounded-full bg-[#FF85A2] text-white" :class="commentText.trim() ? '' : 'opacity-50'" :disabled="!commentText.trim()" @click="submitComment">发表</button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showRetweetModal" class="fixed inset-0 bg-black/40 z-50" @click="closeRetweetModal"></div>
    </Transition>
    <Transition name="scale">
      <div v-if="showRetweetModal" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[28px] p-5 w-[280px] z-50 shadow-2xl" @click.stop>
        <h3 class="text-sm font-black text-[#5D4037] mb-4 text-center">转发帖子</h3>
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors mb-2" @click="confirmRetweet(false)">
          <div class="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
            <iconify-icon class="text-green-500 text-lg" icon="solar:repeat-bold"></iconify-icon>
          </div>
          <div class="text-left">
            <span class="block text-xs font-bold text-[#5D4037]">直接转发</span>
            <span class="text-[10px] text-gray-400">转发到你的动态</span>
          </div>
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-colors" @click="showRetweetModal = false">
          <div class="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
            <iconify-icon class="text-blue-500 text-lg" icon="solar:chat-round-dots-bold"></iconify-icon>
          </div>
          <div class="text-left">
            <span class="block text-xs font-bold text-[#5D4037]">带评论转发</span>
            <span class="text-[10px] text-gray-400">写下你的想法</span>
          </div>
        </button>
        <div v-if="showRetweetModal" class="mt-3 pt-3 border-t border-gray-100">
          <input v-model="retweetComment" placeholder="说点什么..." class="w-full px-3 py-2 text-xs rounded-full bg-gray-100 outline-none text-[#5D4037]" maxlength="140"/>
          <div class="flex gap-2 mt-3">
            <button class="flex-1 py-2 rounded-full border border-gray-200 text-xs text-gray-400 font-bold" @click="closeRetweetModal">取消</button>
            <button class="flex-1 py-2 rounded-full bg-[#A7C7E7] text-white text-xs font-bold" :class="retweetComment.trim() ? '' : 'opacity-50'" :disabled="!retweetComment.trim()" @click="submitRetweetWithComment">发布</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>