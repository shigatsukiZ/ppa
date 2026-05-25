<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostCard from '../../components/PostCard.vue'

const router = useRouter()
const activeTab = ref('帖子')

const userPosts = ref([
  {
    id: 'user-1',
    nickname: '元宝麻麻',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg',
    time: '昨天 · 发布',
    content: '今天带元宝去公园玩了，遇到好多小伙伴，超级开心的一天！🐾',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg'],
    likes: '238',
    comments: '12',
    views: '1.2k',
    hasBadge: true,
    liked: false,
    favorited: false,
    retweeted: false,
  },
  {
    id: 'user-2',
    nickname: '元宝麻麻',
    avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg',
    time: '3天前 · 发布',
    content: '分享一下最近入手的好物，元宝超爱！链接在评论区～',
    images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg'],
    likes: '156',
    comments: '8',
    views: '856',
    hasBadge: true,
    liked: false,
    favorited: false,
    retweeted: false,
  },
])
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <div class="shrink-0 z-10 bg-white/80 backdrop-blur-lg">
        <div class="flex items-center px-4 h-11">
          <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" @click="router.back()">
            <iconify-icon class="text-gray-500 text-xl" icon="solar:arrow-left-linear"></iconify-icon>
          </button>
          <h1 class="flex-1 text-center text-sm font-black text-[#5D4037]">个人主页</h1>
          <div class="w-8"></div>
        </div>
      </div>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 pt-2 pb-4">
          <div class="flex items-start gap-4 mb-4">
            <img class="w-16 h-16 rounded-full object-cover border-2 border-[#FFF5F7] shrink-0" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg" alt="avatar"/>
            <div class="flex-1 min-w-0">
              <h2 class="text-base font-black text-[#5D4037]">元宝麻麻</h2>
              <p class="text-[11px] text-gray-400 mt-0.5">萨摩耶日常 | 宠物好物推荐</p>
              <div class="flex items-center gap-4 mt-2">
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">156</strong> 帖子</span>
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">8.6w</strong> 粉丝</span>
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">312</strong> 关注</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex border-b border-[#F0F0F0]">
          <button v-for="tab in ['帖子', '动态', '赞过']" :key="tab" class="flex-1 py-3 text-xs font-bold text-center transition-colors relative" :class="activeTab === tab ? 'text-[#FF85A2]' : 'text-gray-400'" @click="activeTab = tab">
            {{ tab }}
            <div v-if="activeTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#FF85A2] rounded-full"></div>
          </button>
        </div>

        <div v-show="activeTab === '帖子'">
          <PostCard
            v-for="p in userPosts"
            :key="p.id"
            v-bind="p"
            @like="(id) => { const x = userPosts.find(v => v.id === id); if (x) { x.liked = !x.liked } }"
            @comment="() => {}"
            @retweet="() => {}"
            @favorite="(id) => { const x = userPosts.find(v => v.id === id); if (x) { x.favorited = !x.favorited } }"
            @share="() => {}"
            @detail="() => router.push('/detail')"
          />
        </div>

        <div v-show="activeTab === '动态'" class="flex items-center justify-center h-32">
          <span class="text-xs text-gray-200">暂无动态</span>
        </div>

        <div v-show="activeTab === '赞过'" class="flex items-center justify-center h-32">
          <span class="text-xs text-gray-200">暂无赞过</span>
        </div>
      </main>
    </div>
  </div>
</template>
