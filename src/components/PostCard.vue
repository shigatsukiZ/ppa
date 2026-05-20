<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  id: { type: [String, Number], default: '' },
  username: { type: String, default: '' },
  nickname: { type: String, default: '' },
  avatar: { type: String, default: '' },
  time: { type: String, default: '' },
  location: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  likes: { type: [String, Number], default: '0' },
  comments: { type: [String, Number], default: '0' },
  hasBadge: { type: Boolean, default: false },
  isWalkPost: { type: Boolean, default: false },
  walkLocation: { type: String, default: '' },
  walkTime: { type: String, default: '' },
  liked: { type: Boolean, default: false },
})

const emit = defineEmits(['like', 'comment', 'share', 'join-walk'])
</script>

<template>
  <div class="px-4 pt-3 pb-2 hover:bg-[#FDF0F3]/40 transition-colors border-b border-[#F5F5F5]">
    <div class="flex gap-3">
      <div class="shrink-0">
        <img :src="avatar" :alt="nickname" class="w-10 h-10 rounded-full object-cover bg-gray-100" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-1">
          <span class="text-sm font-bold text-[#5D4037] truncate">{{ nickname }}</span>
          <span v-if="hasBadge" class="text-[9px] leading-none bg-[#A7C7E7] text-white px-1.5 py-0.5 rounded-full shrink-0">认证熟人</span>
          <span class="text-xs text-gray-400 shrink-0 ml-auto">···</span>
        </div>
        <p class="text-xs text-gray-400 mb-1">{{ time }} · {{ location }}</p>

        <p class="text-sm text-gray-700 leading-relaxed mb-2 whitespace-pre-wrap">{{ content }}</p>

        <img v-if="image" :src="image" alt="Post image" class="w-full rounded-2xl border border-gray-100 object-cover mb-2 max-h-80" />

        <div v-if="isWalkPost" class="mb-2 p-3 bg-[#F9F9FF] rounded-2xl border border-dashed border-[#A7C7E7] flex items-center gap-3">
          <div class="bg-white w-9 h-9 rounded-xl flex items-center justify-center text-[#A7C7E7] shrink-0">
            <iconify-icon class="text-xl" icon="solar:map-point-bold"></iconify-icon>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-[#5D4037]">一起遛狗吗？</p>
            <p class="text-[10px] text-gray-400 truncate">{{ walkLocation }} · {{ walkTime }}</p>
          </div>
          <button class="shrink-0 bg-[#A7C7E7] text-white text-[10px] px-3 py-1.5 rounded-full font-bold hover:bg-[#8db5d5] transition-colors" @click="emit('join-walk', props.id)">
            加入
          </button>
        </div>

        <div class="flex items-center justify-between mt-1 -ml-2">
          <button class="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#FDF0F3] transition-colors" :class="liked ? 'text-[#FF85A2]' : 'text-gray-400'" @click="emit('like', props.id)">
            <iconify-icon class="text-lg" :icon="liked ? 'solar:heart-bold' : 'solar:heart-linear'"></iconify-icon>
            <span class="text-xs">{{ likes }}</span>
          </button>
          <button class="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#FDF0F3] transition-colors text-gray-400" @click="emit('comment', props.id)">
            <iconify-icon class="text-lg" icon="solar:chat-line-linear"></iconify-icon>
            <span class="text-xs">{{ comments }}</span>
          </button>
          <button class="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-[#FDF0F3] transition-colors text-gray-400" @click="emit('share', props.id)">
            <iconify-icon class="text-lg" icon="solar:share-circle-linear"></iconify-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
