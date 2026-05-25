<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const post = ref({
  nickname: '元宝麻麻',
  avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
  time: '2026.04.28 · 上海',
  content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~ 小家伙学得特别快，才教了三次就会了，老母亲感动到流泪😭\n\n附上元宝的帅气照片～',
  images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg'],
  likes: '1.2k',
  comments: '48',
  views: '5.6k',
  hasBadge: true,
})

const liked = ref(false)
const favorited = ref(false)
const newComment = ref('')
const comments = ref([
  { id: 1, name: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', text: '好聪明的元宝！大白三岁才会握手😂', time: '5分钟前', likes: 12 },
  { id: 2, name: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', text: '萨摩耶智商真的可以，我家团子就是太懒了🐶', time: '10分钟前', likes: 8 },
  { id: 3, name: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', text: '主食罐头推荐哪个牌子的呀？也想给泡芙加餐~', time: '15分钟前', likes: 5 },
  { id: 4, name: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', text: '元宝好干净啊，我家毛球每次出门回来都一身泥😅', time: '20分钟前', likes: 3 },
  { id: 5, name: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', text: '握手已经是最高级技能了！比我家可乐强，它只会拆家😂', time: '30分钟前', likes: 15 },
])

const submitComment = () => {
  if (!newComment.value.trim()) return
  comments.value.unshift({
    id: Date.now(),
    name: '元宝麻麻',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg',
    text: newComment.value.trim(),
    time: '刚刚',
    likes: 0,
  })
  newComment.value = ''
}

const formatCount = (n) => {
  const v = typeof n === 'string' ? parseFloat(n.replace('k', '')) * 1000 : parseFloat(n) || 0
  if (v >= 10000) return (v / 10000).toFixed(1) + 'w'
  if (v >= 1000) return (v / 1000).toFixed(1) + 'k'
  return String(Math.round(v))
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" @click="router.push('/home')">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">帖子详情</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 pt-4 pb-2">
          <div class="flex items-center gap-3 mb-3">
            <img :src="post.avatar" class="w-10 h-10 rounded-full object-cover cursor-pointer" @click="router.push('/profile/' + post.nickname)"/>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-sm font-bold text-[#5D4037] cursor-pointer" @click="router.push('/profile/' + post.nickname)">{{ post.nickname }}</span>
                <span v-if="post.hasBadge" class="text-[8px] bg-[#A7C7E7] text-white px-1.5 py-0.5 rounded-full">✓</span>
              </div>
              <span class="text-[10px] text-gray-400">{{ post.time }}</span>
            </div>
          </div>

          <p class="text-sm text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap break-words">{{ post.content }}</p>

          <div v-if="post.images.length" class="grid grid-cols-1 gap-1 mb-4">
            <div v-for="(img, idx) in post.images" :key="idx" class="rounded-xl overflow-hidden">
              <img :src="img" class="w-full aspect-square object-cover" alt="post image"/>
            </div>
          </div>

          <div class="flex items-center gap-4 text-[11px] text-gray-400 mb-4 pb-4 border-b border-[#F0F0F0]">
            <span class="flex items-center gap-1">
              <iconify-icon class="text-sm" icon="solar:heart-linear"></iconify-icon>
              {{ formatCount(post.likes) }} 赞
            </span>
            <span class="flex items-center gap-1">
              <iconify-icon class="text-sm" icon="solar:chat-line-linear"></iconify-icon>
              {{ formatCount(post.comments) }} 评论
            </span>
            <span class="flex items-center gap-1">
              <iconify-icon class="text-sm" icon="solar:eye-linear"></iconify-icon>
              {{ formatCount(post.views) }} 浏览
            </span>
          </div>

          <div class="flex items-center justify-between mb-4 px-2">
            <button class="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors" :class="liked ? 'text-[#FF85A2] font-bold' : 'text-gray-400'" @click="liked = !liked">
              <iconify-icon class="text-lg" :icon="liked ? 'solar:heart-bold' : 'solar:heart-linear'"></iconify-icon>
              {{ liked ? '已赞' : '赞' }}
            </button>
            <button class="flex items-center gap-1 text-xs text-gray-400 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors" @click="$el?.querySelector('.comment-input')?.focus()">
              <iconify-icon class="text-lg" icon="solar:chat-line-linear"></iconify-icon>
              评论
            </button>
            <button class="flex items-center gap-1 text-xs px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors" :class="favorited ? 'text-yellow-500 font-bold' : 'text-gray-400'" @click="favorited = !favorited">
              <iconify-icon class="text-lg" :icon="favorited ? 'solar:bookmark-bold' : 'solar:bookmark-linear'"></iconify-icon>
              {{ favorited ? '已收藏' : '收藏' }}
            </button>
            <button class="flex items-center gap-1 text-xs text-gray-400 px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors" @click="navigator.clipboard?.writeText(post.content); alert('已复制')">
              <iconify-icon class="text-lg" icon="solar:export-linear"></iconify-icon>
              分享
            </button>
          </div>
        </div>

        <div class="bg-[#F8F9FA] px-4 py-4">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">全部评论 ({{ comments.length + 48 }})</h3>

          <div class="space-y-3 mb-4">
            <div v-for="c in comments" :key="c.id" class="flex gap-2.5">
              <img :src="c.avatar" class="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 cursor-pointer" @click="router.push('/profile/' + c.name)"/>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-[11px] font-bold text-[#5D4037] cursor-pointer" @click="router.push('/profile/' + c.name)">{{ c.name }}</span>
                  <span class="text-[9px] text-gray-300">{{ c.time }}</span>
                </div>
                <p class="text-[12px] text-gray-700 leading-relaxed break-words">{{ c.text }}</p>
                <div class="flex items-center gap-3 mt-1">
                  <button class="text-[9px] text-gray-300 flex items-center gap-0.5" @click="c.likes++">
                    <iconify-icon class="text-xs" icon="solar:heart-linear"></iconify-icon>
                    <span v-if="c.likes > 0">{{ c.likes }}</span>
                  </button>
                  <button class="text-[9px] text-gray-300">回复</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="shrink-0 px-4 py-3 border-t border-[#F0F0F0] bg-white">
        <div class="flex gap-2 items-center">
          <img src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg" class="w-8 h-8 rounded-full object-cover shrink-0"/>
          <input v-model="newComment" placeholder="写评论..." class="comment-input flex-1 px-4 py-2 text-xs rounded-full bg-gray-100 outline-none text-[#5D4037]" @keyup.enter="submitComment"/>
          <button class="px-4 py-2 text-xs font-bold rounded-full bg-[#FF85A2] text-white shrink-0" :class="newComment.trim() ? '' : 'opacity-50'" :disabled="!newComment.trim()" @click="submitComment">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>