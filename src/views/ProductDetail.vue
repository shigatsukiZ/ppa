<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const product = ref({
  id: route.params.id,
  images: [
    'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg',
    'https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg',
    'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg',
    'https://modao.cc/agent-py/media/generated_images/2026-04-28/28ecb391b4944668a0266b015448bd3d.jpg',
  ],
  name: '元气奶油猫窝限定套餐',
  price: '¥388.00',
  originalPrice: '¥558.00',
  sales: '2.3k+',
  rating: 4.9,
  tags: ['自营', '宠物优选', '限时7折'],
  specs: [
    { label: '规格', value: '猫窝+罐头+玩具' },
    { label: '材质', value: '记忆棉+牛津布' },
    { label: '适用', value: '全年龄段猫犬' },
    { label: '产地', value: '中国·浙江' },
  ],
  desc: '采用高密度记忆棉内胆，柔软支撑不塌陷。外层可拆洗牛津布，一擦即净。配套主食罐头0谷物0胶质，含肉量98%。附赠逗猫棒+猫薄荷玩具，让主子爱不释手！\n\n换季必备！给毛孩子一个温暖治愈的小窝～',
  reviews: [
    { name: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', text: '猫猫超级喜欢，一拿到就钻进去了！', rating: 5, time: '3天前' },
    { name: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', text: '质量很好，比实体店便宜好多', rating: 5, time: '1周前' },
    { name: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', text: '套餐很划算，罐头团子很爱吃', rating: 4, time: '2周前' },
  ],
  similarProducts: [
    { id: 1, name: '高钙羊乳冻干', price: '¥29.9', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg' },
    { id: 2, name: '宠物冰垫凉席', price: '¥59.0', img: 'https://picsum.photos/400/400?random=20' },
    { id: 3, name: '猫抓板猫窝', price: '¥88.0', img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg' },
  ],
})

const currentImageIndex = ref(0)
const showAllSpecs = ref(false)
const cartCount = ref(0)
const showAddedTip = ref(false)

const displayPrice = computed(() => product.value.price)
const displayOriginal = computed(() => product.value.originalPrice)

const switchImage = (idx) => { currentImageIndex.value = idx }

const addToCart = () => {
  cartCount.value++
  showAddedTip.value = true
  setTimeout(() => { showAddedTip.value = false }, 1500)
}

const buyNow = () => {
  sessionStorage.setItem('payTotal', String(product.value.price.replace('¥', '')))
  sessionStorage.setItem('orderInfo', JSON.stringify({
    name: product.value.name,
    spec: '',
    qty: 1,
    price: product.value.price.replace('¥', ''),
    total: product.value.price.replace('¥', ''),
    img: product.value.images[0],
    orderNum: 'PPA' + Date.now().toString().slice(-8),
  }))
  router.push('/payment')
}

const stars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const arr = []
  for (let i = 0; i < 5; i++) {
    if (i < full) arr.push('full')
    else if (i === full && half) arr.push('half')
    else arr.push('empty')
  }
  return arr
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.push('/home?tab=mall')">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">商品详情</span>
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:share-bold"></iconify-icon>
        </button>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="relative">
          <div class="w-full aspect-square overflow-hidden bg-[#F8F9FA] rounded-2xl">
            <img :src="product.images[currentImageIndex]" class="w-full h-full object-cover" alt="product"/>
          </div>
          <div class="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">{{ currentImageIndex + 1 }}/{{ product.images.length }}</div>
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <button v-for="(_, idx) in product.images" :key="idx"
              class="w-1.5 h-1.5 rounded-full transition-all"
              :class="idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'"
              @click="switchImage(idx)"></button>
          </div>
          <div class="absolute left-1 top-1/2 -translate-y-1/2" v-if="currentImageIndex > 0">
            <button class="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow" @click="currentImageIndex--">
              <iconify-icon class="text-gray-500" icon="solar:alt-arrow-left-bold"></iconify-icon>
            </button>
          </div>
          <div class="absolute right-1 top-1/2 -translate-y-1/2" v-if="currentImageIndex < product.images.length - 1">
            <button class="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow" @click="currentImageIndex++">
              <iconify-icon class="text-gray-500" icon="solar:alt-arrow-right-bold"></iconify-icon>
            </button>
          </div>
        </div>

        <div class="px-4 pt-4 pb-2">
          <div class="flex gap-1.5 mb-2">
            <span v-for="tag in product.tags" :key="tag"
              class="text-[9px] bg-[#FDF0F3] text-[#FF85A2] px-2 py-0.5 rounded-full font-medium">{{ tag }}</span>
          </div>
          <h1 class="text-base font-black text-[#5D4037] leading-snug">{{ product.name }}</h1>
          <div class="flex items-baseline gap-2 mt-2">
            <span class="text-2xl font-black text-[#FF85A2]">{{ displayPrice }}</span>
            <span class="text-xs text-gray-300 line-through">{{ displayOriginal }}</span>
            <span class="text-[10px] bg-[#FFE4E1] text-[#FF85A2] px-1.5 py-0.5 rounded ml-auto">已售 {{ product.sales }}</span>
          </div>
          <div class="flex items-center gap-1 mt-2">
            <span v-for="s in stars(product.rating)" :key="s"
              class="text-sm"
              :class="s === 'full' ? 'text-yellow-400' : s === 'half' ? 'text-yellow-400' : 'text-gray-200'">
              {{ s === 'half' ? '★' : '★' }}
            </span>
            <span class="text-xs text-gray-400 ml-1">{{ product.rating }}</span>
          </div>
        </div>

        <div class="mx-4 p-3 bg-[#F8F9FA] rounded-2xl mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold text-[#5D4037]">商品参数</span>
            <button class="text-[10px] text-gray-400 rounded-lg px-1.5 py-0.5 hover:bg-gray-100" @click="showAllSpecs = !showAllSpecs">
              {{ showAllSpecs ? '收起' : '展开' }}
              <iconify-icon class="inline text-xs" :icon="showAllSpecs ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'"></iconify-icon>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-y-1.5">
            <div v-for="(spec, idx) in showAllSpecs ? product.specs : product.specs.slice(0, 2)" :key="idx" class="flex gap-1">
              <span class="text-[10px] text-gray-400 w-10 shrink-0">{{ spec.label }}</span>
              <span class="text-[10px] text-gray-600">{{ spec.value }}</span>
            </div>
          </div>
        </div>

        <div class="px-4 pb-4 border-b border-[#F0F0F0]">
          <h3 class="text-xs font-bold text-[#5D4037] mb-2">商品详情</h3>
          <p class="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{{ product.desc }}</p>
        </div>

        <div class="px-4 py-4 border-b border-[#F0F0F0]">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">用户评价 ({{ product.reviews.length }})</h3>
          <div v-for="(review, idx) in product.reviews" :key="idx" class="flex gap-2.5 mb-3 last:mb-0">
            <img :src="review.avatar" class="w-7 h-7 rounded-full object-cover shrink-0"/>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-[11px] font-bold text-[#5D4037]">{{ review.name }}</span>
                <span class="text-[9px] text-gray-300">{{ review.time }}</span>
              </div>
              <div class="flex gap-0.5 mb-0.5">
                <span v-for="i in 5" :key="i" class="text-[10px]" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-200'">★</span>
              </div>
              <p class="text-[11px] text-gray-600">{{ review.text }}</p>
            </div>
          </div>
        </div>

        <div class="px-4 py-4 mb-2">
          <h3 class="text-xs font-bold text-[#5D4037] mb-3">猜你喜欢</h3>
          <div class="flex gap-3 overflow-x-auto custom-scrollbar pb-1">
            <div v-for="sp in product.similarProducts" :key="sp.id"
              class="shrink-0 w-[120px] bg-white rounded-2xl p-2 creamy-shadow border border-[#FFF5F7] cursor-pointer"
              @click="router.push('/product/' + sp.id)">
              <img :src="sp.img" class="w-full aspect-square rounded-xl object-cover mb-1.5"/>
              <h4 class="text-[11px] font-bold text-[#5D4037] truncate">{{ sp.name }}</h4>
              <span class="text-xs font-black text-[#FF85A2]">{{ sp.price }}</span>
            </div>
          </div>
        </div>
      </main>

      <Transition name="fade">
        <div v-if="showAddedTip" class="absolute top-14 left-1/2 -translate-x-1/2 bg-[#5D4037] text-white text-xs px-4 py-2 rounded-full shadow-lg z-50">
          已加入购物车
        </div>
      </Transition>

      <div class="shrink-0 px-4 py-3 border-t border-[#F0F0F0] bg-white flex items-center gap-3">
        <div class="flex items-center gap-3">
          <button class="flex flex-col items-center text-gray-400" @click="router.push('/home?tab=mall')">
            <iconify-icon class="text-lg" icon="solar:shop-linear"></iconify-icon>
            <span class="text-[9px]">首页</span>
          </button>
          <button class="flex flex-col items-center text-gray-400 relative" @click="router.push('/home?tab=mall')">
            <iconify-icon class="text-lg" icon="solar:cart-large-minimalistic-linear"></iconify-icon>
            <span class="text-[9px]">购物车</span>
            <span v-if="cartCount > 0"
              class="absolute -top-1 -right-2 bg-[#FF85A2] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{{ cartCount }}</span>
          </button>
        </div>
        <button class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#FFD1DC] text-[#5D4037]" @click="addToCart">加入购物车</button>
        <button class="flex-1 py-2.5 text-xs font-bold rounded-full bg-[#FF85A2] text-white" @click="buyNow">立即购买</button>
      </div>
    </div>
  </div>
</template>
