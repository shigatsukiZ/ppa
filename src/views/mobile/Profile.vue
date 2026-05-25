<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostCard from '../../components/PostCard.vue'

const route = useRoute()
const router = useRouter()
const userName = route.params.name

const activeProfileTab = ref('帖子')

const userInfo = computed(() => {
  const allUsers = [
    { name: '元宝麻麻', desc: '萨摩耶日常 | 宠物好物推荐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg', followers: '8.6w', following: '312', posts: '156' },
    { name: '大白姐姐', desc: '边牧控 | 成都遛狗地图', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', followers: '12.4w', following: '189', posts: '234' },
    { name: '团子爸爸', desc: '三只猫的铲屎官 | 自制猫饭', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', followers: '3.2w', following: '98', posts: '67' },
    { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享', avatar: 'https://picsum.photos/200?random=1', followers: '12.3w', following: '156', posts: '89' },
    { name: '毛球麻麻', desc: '两只柯基的快乐生活', avatar: 'https://picsum.photos/200?random=2', followers: '8.5w', following: '87', posts: '120' },
    { name: '可乐麻麻', desc: '金毛控 | 训练教程分享', avatar: 'https://picsum.photos/200?random=3', followers: '6.2w', following: '203', posts: '45' },
    { name: '布丁麻麻', desc: '猫狗双全的人生赢家', avatar: 'https://picsum.photos/200?random=4', followers: '15.7w', following: '421', posts: '312' },
    { name: '七喜麻麻', desc: '哈士奇搞笑日常', avatar: 'https://picsum.photos/200?random=5', followers: '21.0w', following: '67', posts: '198' },
    { name: '糯米麻麻', desc: '英短繁育 | 猫咪知识科普', avatar: 'https://picsum.photos/200?random=6', followers: '4.3w', following: '45', posts: '56' },
  ]
  return allUsers.find(u => u.name === userName) || allUsers[0]
})

const formatCount = (val) => {
  const n = typeof val === 'string' ? parseFloat(val.replace('k', '')) * 1000 : val
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}
const parseCount = (val) => {
  if (typeof val === 'number') return val
  const s = val.toLowerCase()
  if (s.endsWith('w')) return parseFloat(s) * 10000
  if (s.endsWith('k')) return parseFloat(s) * 1000
  return parseInt(s) || 0
}

const userPosts = ref([])

const buildPosts = () => {
  userPosts.value = [
    {
      id: userName + '-1',
      nickname: userName,
      avatar: userInfo.value.avatar,
      time: '昨天 · 发布',
      content: `${userName}的新动态！今天带毛孩子出去玩了，超级开心的一天～🐾`,
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
      id: userName + '-2',
      nickname: userName,
      avatar: userInfo.value.avatar,
      time: '3天前 · 发布',
      content: '分享一下最近入手的好物，毛孩子超爱！链接在评论区～',
      images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg'],
      likes: '156',
      comments: '8',
      views: '856',
      hasBadge: true,
      liked: false,
      favorited: false,
      retweeted: false,
    },
  ]
}

buildPosts()

const onProfileLike = (id) => {
  const p = userPosts.value.find(x => x.id === id)
  if (p) { p.liked = !p.liked; p.likes = formatCount(Math.max(0, parseCount(p.likes) + (p.liked ? 1 : -1))) }
}
const onProfileRetweet = (id) => {
  const p = userPosts.value.find(x => x.id === id)
  if (!p) return
  if (p.retweeted) {
    p.retweeted = false
    p.retweets = formatCount(Math.max(0, parseCount(p.retweets || 0) - 1))
    return
  }
  if (confirm('转发该帖子到你的动态？')) {
    p.retweeted = true
    p.retweets = formatCount(Math.max(0, parseCount(p.retweets || 0) + 1))
  }
}
const onProfileFavorite = (id) => {
  const p = userPosts.value.find(x => x.id === id)
  if (p) { p.favorited = !p.favorited; p.favorites = formatCount(Math.max(0, parseCount(p.favorites || 0) + (p.favorited ? 1 : -1))) }
}

const isFollowed = ref(false)
const toggleFollow = () => { isFollowed.value = !isFollowed.value }

const goChat = () => {
  router.push(`/chat/${encodeURIComponent(userName)}`)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <div class="shrink-0 z-10 bg-white/80 backdrop-blur-lg">
        <div class="flex items-center px-4 h-11">
          <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" @click="router.push('/home')">
            <iconify-icon class="text-gray-500 text-xl" icon="solar:arrow-left-linear"></iconify-icon>
          </button>
          <h1 class="flex-1 text-center text-sm font-black text-[#5D4037]">{{ userName }}</h1>
          <div class="w-8"></div>
        </div>
      </div>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 pt-2 pb-4">
          <div class="flex items-start gap-4 mb-4">
            <img :src="userInfo.avatar" class="w-16 h-16 rounded-full object-cover border-2 border-[#FFF5F7] shrink-0"/>
            <div class="flex-1 min-w-0">
              <h2 class="text-base font-black text-[#5D4037]">{{ userInfo.name }}</h2>
              <p class="text-[11px] text-gray-400 mt-0.5">{{ userInfo.desc }}</p>
              <div class="flex items-center gap-4 mt-2">
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">{{ userInfo.posts }}</strong> 帖子</span>
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">{{ userInfo.followers }}</strong> 粉丝</span>
                <span class="text-[11px] text-gray-400"><strong class="text-[#5D4037]">{{ userInfo.following }}</strong> 关注</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button class="flex-1 py-2 rounded-full bg-[#FF85A2] text-white text-xs font-bold" @click="goChat">发消息</button>
            <button class="flex-1 py-2 rounded-full border border-[#FF85A2] text-[#FF85A2] text-xs font-bold" :class="isFollowed ? 'bg-[#FDF0F3]' : ''" @click="toggleFollow">{{ isFollowed ? '已关注' : '关注' }}</button>
          </div>
        </div>

        <div class="flex border-b border-[#F0F0F0]">
          <button v-for="tab in ['帖子', '动态', '赞过']" :key="tab" class="flex-1 py-3 text-xs font-bold text-center transition-colors relative" :class="activeProfileTab === tab ? 'text-[#FF85A2]' : 'text-gray-400'" @click="activeProfileTab = tab">
            {{ tab }}
            <div v-if="activeProfileTab === tab" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#FF85A2] rounded-full"></div>
          </button>
        </div>

        <div v-show="activeProfileTab === '帖子'">
          <PostCard
            v-for="p in userPosts"
            :key="p.id"
            v-bind="p"
            @like="onProfileLike"
            @comment="(e) => { if (typeof e === 'object' && e.text) alert('评论已发送：' + e.text); else router.push('/detail') }"
            @retweet="(e) => onProfileRetweet(typeof e === 'object' ? e.id : e)"
            @favorite="onProfileFavorite"
            @share="() => { navigator.clipboard?.writeText(p.content); alert('已复制分享内容') }"
            @detail="() => router.push('/detail')"
          />
        </div>

        <div v-show="activeProfileTab === '动态'" class="flex items-center justify-center h-32">
          <span class="text-xs text-gray-200">暂无动态</span>
        </div>

        <div v-show="activeProfileTab === '赞过'" class="flex items-center justify-center h-32">
          <span class="text-xs text-gray-200">暂无赞过</span>
        </div>
      </main>
    </div>
  </div>
</template>
