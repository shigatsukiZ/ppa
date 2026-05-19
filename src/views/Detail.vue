<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showShare = ref(false)
const showAllReviews = ref(false)
const showCart = ref(false)
const currentImgIndex = ref(0)
const qty = ref(1)
const cartCount = ref(3)
const liked = ref(false)
const activeSpec = ref('85g · 鸡肉')

const images = [
  'https://modao.cc/agent-py/media/generated_images/2026-04-28/60d82fb02e44476ba601db671c90129f.jpg',
  'https://modao.cc/agent-py/media/generated_images/2026-04-28/d6cd4d8fc5b940fb8a217a1003ac5c03.jpg',
  'https://picsum.photos/800/800?random=10',
  'https://picsum.photos/800/800?random=11',
  'https://picsum.photos/800/800?random=12',
  'https://picsum.photos/800/800?random=13',
]

const openShare = () => { showShare.value = true }
const closeShare = () => { showShare.value = false }
const openAllReviews = () => { showAllReviews.value = true }
const closeAllReviews = () => { showAllReviews.value = false }
const openCartSheet = () => { showCart.value = true }
const closeCartSheet = () => { showCart.value = false }

const toggleLike = () => { liked.value = !liked.value }
const prevImg = () => {
  currentImgIndex.value = currentImgIndex.value === 0 ? images.length - 1 : currentImgIndex.value - 1
}
const nextImg = () => {
  currentImgIndex.value = currentImgIndex.value === images.length - 1 ? 0 : currentImgIndex.value + 1
}
const selectImg = (idx) => { currentImgIndex.value = idx }
const selectSpec = (spec) => { activeSpec.value = spec }
const addCart = () => {
  cartCount.value++
  openCartSheet()
}
const goToOrder = () => {
  const total = (12.9 * qty.value).toFixed(1)
  const data = {
    name: '元宝定制版-多肉猫罐头',
    spec: activeSpec.value,
    qty: qty.value,
    price: 12.9,
    total: total,
    img: images[currentImgIndex.value],
  }
  sessionStorage.setItem('orderInfo', JSON.stringify(data))
  router.push('/order')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">

      <div class="share-overlay" :class="{ show: showShare }" @click="closeShare"></div>
      <div class="share-sheet" :class="{ show: showShare }">
        <div class="flex flex-col items-center gap-5">
          <p class="text-sm font-bold text-gray-800">分享到</p>
          <div class="flex gap-8 justify-center w-full">
            <button class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <iconify-icon icon="solar:download-bold" class="text-green-500 text-2xl"></iconify-icon>
              </div>
              <span class="text-xs text-gray-600">保存图片</span>
            </button>
            <button class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <iconify-icon icon="solar:wechat-bold" class="text-green-500 text-2xl"></iconify-icon>
              </div>
              <span class="text-xs text-gray-600">微信</span>
            </button>
            <button class="flex flex-col items-center gap-2">
              <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <iconify-icon icon="solar:menu-dots-bold" class="text-gray-500 text-2xl"></iconify-icon>
              </div>
              <span class="text-xs text-gray-600">更多</span>
            </button>
          </div>
          <button class="mt-4 w-full py-3 rounded-full bg-gray-100 text-sm font-bold text-gray-600" @click="closeShare">取消</button>
        </div>
      </div>

      <div class="review-modal" :class="{ show: showAllReviews }" @click="closeAllReviews"></div>
      <div class="review-sheet custom-scrollbar" :class="{ show: showAllReviews }">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-bold text-[#5D4037]">全部评价 (328)</h3>
          <button @click="closeAllReviews" class="text-gray-400">
            <iconify-icon icon="solar:close-bold"></iconify-icon>
          </button>
        </div>
        <div class="space-y-3 mb-6">
          <div v-for="r in 10" :key="r" class="bg-[#FDF0F3]/30 rounded-2xl p-3">
            <div class="flex items-center gap-2 mb-2">
              <img alt="avatar" class="w-6 h-6 rounded-full" :src="'https://picsum.photos/200/200?random=' + r">
              <span class="text-xs font-bold">{{ ['喵星人','铲屎官小周','布丁','可乐','喵喵咪','团团','发财','来福','小白','花花'][r-1] }}</span>
              <div class="flex ml-auto">
                <iconify-icon v-for="s in 5" :key="s" class="text-[10px]" :class="s <= (r % 5 === 0 ? 5 : r % 5) ? 'text-[#FFD1DC]' : 'text-gray-200'" icon="solar:star-bold"></iconify-icon>
              </div>
            </div>
            <p class="text-xs text-gray-600">{{ ['猫咪超爱吃，一打开就疯抢，肉质很扎实！','一直回购，无谷无胶很放心！','包装很精致，适口性满分！','性价比很高，比宠物店便宜很多！','发货速度超快，隔天就到！','配料表很干净，没有乱七八糟添加！','味道很香，猫咪每次都狼吞虎咽。','汤汁超多，猫咪不爱喝水全靠这个罐头。','无限回购款，家里三只猫都爱吃。','肉质细腻，容易消化！'][r-1] }}</p>
          </div>
        </div>
        <p class="text-center text-xs text-gray-400 py-2">评价已经看完了~</p>
      </div>

      <div class="cart-modal" :class="{ show: showCart }" @click="closeCartSheet"></div>
      <div class="cart-sheet" :class="{ show: showCart }">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base font-bold text-[#5D4037]">已加入购物车</h3>
          <button @click="closeCartSheet" class="text-gray-400">
            <iconify-icon icon="solar:close-bold"></iconify-icon>
          </button>
        </div>
        <div class="flex gap-3 items-center mb-5">
          <img :src="images[currentImgIndex]" class="w-16 h-16 rounded-xl object-cover">
          <div class="flex-1">
            <p class="text-xs font-bold text-[#5D4037]">元宝定制版-多肉猫罐头</p>
            <p class="text-[10px] text-gray-400">{{ activeSpec }}</p>
            <p class="text-[#FF85A2] font-bold text-sm mt-1">¥12.9</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400">数量</p>
            <p class="text-base font-bold text-[#5D4037]">{{ qty }}</p>
          </div>
        </div>
        <div class="flex justify-between items-center border-t border-[#FFF5F7] pt-3 mt-2">
          <p class="text-xs text-gray-400">购物车共 <span class="text-[#FF85A2] font-bold">{{ cartCount }}</span> 件</p>
          <button @click="closeCartSheet" class="bg-[#FF85A2] text-white px-4 py-2 rounded-xl text-xs font-bold">确定</button>
        </div>
      </div>

      <header class="px-6 py-3 flex items-center justify-between">
        <button class="w-9 h-9 bg-white rounded-full flex items-center justify-center creamy-shadow border border-[#FFF5F7]" @click="router.push('/home')">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <button class="w-9 h-9 bg-white rounded-full flex items-center justify-center creamy-shadow border border-[#FFF5F7]" @click="openShare">
          <iconify-icon class="text-gray-400 text-lg" icon="solar:share-linear"></iconify-icon>
        </button>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar pb-28">
        <div class="relative mx-6 mb-4 img-container">
          <div class="rounded-[32px] overflow-hidden bg-[#FFF5F7]">
            <img alt="商品主图" class="w-full aspect-square object-cover" :src="images[currentImgIndex]"/>
          </div>
          <span class="absolute top-3 left-3 bg-[#FF85A2] text-white text-[10px] px-3 py-1 rounded-full font-bold">新品</span>
          <button class="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center" @click="toggleLike">
            <iconify-icon class="text-base" :class="liked ? 'text-[#FF85A2]' : 'text-gray-400'" :icon="liked ? 'solar:heart-bold' : 'solar:heart-linear'"></iconify-icon>
          </button>

          <button class="img-arrow absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center" @click="prevImg">
            <iconify-icon icon="solar:arrow-left-bold" class="text-gray-600"></iconify-icon>
          </button>
          <button class="img-arrow absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center" @click="nextImg">
            <iconify-icon icon="solar:arrow-right-bold" class="text-gray-600"></iconify-icon>
          </button>

          <div class="flex gap-2 mt-3 justify-center">
            <div v-for="(img, idx) in images" :key="idx" class="w-12 h-12 rounded-xl overflow-hidden cursor-pointer" :class="idx === currentImgIndex ? 'border-2 border-[#FF85A2]' : 'border border-[#F0E8E4]'" @click="selectImg(idx)">
              <img alt="thumb" class="w-full h-full object-cover" :src="img"/>
            </div>
          </div>
        </div>

        <div class="px-6 pb-4 border-b border-[#FFF5F7]">
          <div class="flex items-center gap-2 mb-2">
            <span class="tag-pill">自营</span>
            <span class="tag-pill">包邮</span>
            <span class="text-[10px] text-gray-400">已售 6.2k+</span>
          </div>
          <h1 class="text-lg font-black text-[#5D4037] leading-tight">元宝定制版-多肉猫罐头</h1>
          <p class="text-xs text-gray-400 mt-1">98% 高肉含量 · 无胶无谷 · 补水神器</p>
          <div class="flex items-baseline gap-2 mt-3">
            <span class="text-[#FF85A2] text-2xl font-black">¥12.9</span>
            <span class="text-xs text-gray-300 line-through">¥18.0</span>
            <span class="text-[10px] bg-[#FFF9C4] text-[#D4AF37] px-2 py-0.5 rounded font-bold">7.2折</span>
          </div>
          <div class="flex items-center gap-4 mt-2 text-[10px] text-gray-400">
            <div class="flex items-center gap-1">
              <iconify-icon class="text-[#FFD1DC]" icon="solar:star-bold"></iconify-icon>
              <iconify-icon class="text-[#FFD1DC]" icon="solar:star-bold"></iconify-icon>
              <iconify-icon class="text-[#FFD1DC]" icon="solar:star-bold"></iconify-icon>
              <iconify-icon class="text-[#FFD1DC]" icon="solar:star-bold"></iconify-icon>
              <iconify-icon class="text-gray-200" icon="solar:star-bold"></iconify-icon>
              <span class="ml-1">4.8 (328条评价)</span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-b border-[#FFF5F7]">
          <h3 class="text-sm font-bold text-[#5D4037] mb-3">选择规格</h3>
          <div class="flex gap-2 mb-2">
            <button v-for="spec in ['85g · 鸡肉','85g · 三文鱼','170g · 混合装']" :key="spec" class="spec-btn" :class="{ active: activeSpec === spec }" @click="selectSpec(spec)">{{ spec }}</button>
          </div>
        </div>

        <div class="px-6 py-4 border-b border-[#FFF5F7] flex items-center justify-between">
          <h3 class="text-sm font-bold text-[#5D4037]">数量</h3>
          <div class="flex items-center gap-4">
            <button class="w-8 h-8 bg-[#FDF0F3] rounded-full flex items-center justify-center text-[#FF85A2] font-bold text-lg" @click="qty = Math.max(1, qty - 1)">−</button>
            <span class="text-sm font-bold text-[#5D4037] w-6 text-center">{{ qty }}</span>
            <button class="w-8 h-8 bg-[#FF85A2] rounded-full flex items-center justify-center text-white font-bold text-lg" @click="qty++">+</button>
          </div>
        </div>

        <div class="px-6 py-4">
          <div class="flex gap-6 border-b border-[#FFF5F7] mb-4">
            <button class="text-sm font-bold text-[#FF85A2] pb-2 border-b-2 border-[#FF85A2]">商品详情</button>
            <a href="#reviewSection" class="text-sm text-gray-400 pb-2">评价 (328)</a>
            <button class="text-sm text-gray-400 pb-2">推荐</button>
          </div>
          <div class="space-y-3 text-xs text-gray-500 leading-relaxed">
            <p>选用优质鸡胸肉与深海三文鱼，98% 高肉含量，无谷物无胶质添加，呵护猫咪肠胃。</p>
            <p>特别添加牛磺酸与多种维生素，帮助维持猫咪日常营养所需。适口性极佳，挑食猫咪也爱不释口。</p>
            <div class="bg-[#FFF9C4] rounded-2xl p-3 mt-3">
              <p class="text-xs text-[#D4AF37] font-bold">🧾 配料表：鸡胸肉65%、三文鱼肉20%、鸡汤12%、牛磺酸0.1%、维生素E、维生素B族</p>
              <p class="text-xs text-[#D4AF37] mt-1">📅 保质期：36个月（未开封）</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-[#FDF0F3]/30" id="reviewSection">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-sm font-bold text-[#5D4037]">用户评价</h3>
            <a href="#" class="text-[10px] text-[#FF85A2] font-bold" @click.prevent="openAllReviews">查看全部 &gt;</a>
          </div>
          <div class="space-y-3">
            <div class="bg-white rounded-2xl p-3 creamy-shadow">
              <div class="flex items-center gap-2 mb-2">
                <img alt="avatar" class="w-6 h-6 rounded-full" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg"/>
                <span class="text-[10px] font-bold text-[#5D4037]">咪咪的姐姐</span>
                <div class="flex gap-0.5 ml-auto">
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                </div>
              </div>
              <p class="text-[11px] text-gray-500">我家布丁超爱吃这个罐头，每次一开盖就跑过来，汤汁也很丰富~</p>
            </div>
            <div class="bg-white rounded-2xl p-3 creamy-shadow">
              <div class="flex items-center gap-2 mb-2">
                <img alt="avatar" class="w-6 h-6 rounded-full" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg"/>
                <span class="text-[10px] font-bold text-[#5D4037]">橘子哥</span>
                <div class="flex gap-0.5 ml-auto">
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-[#FFD1DC] text-[10px]" icon="solar:star-bold"></iconify-icon>
                  <iconify-icon class="text-gray-200 text-[10px]" icon="solar:star-bold"></iconify-icon>
                </div>
              </div>
              <p class="text-[11px] text-gray-500">回购无数次了，性价比很高，而且猫猫吃了便便也很正常。</p>
            </div>
          </div>
        </div>
      </main>

      <div class="absolute bottom-0 left-0 right-0 z-20">
        <nav class="bg-white/80 backdrop-blur-lg border-t border-[#FFF5F7] px-4 py-2 flex items-center gap-3">
          <button class="flex flex-col items-center gap-0.5 text-gray-400 w-12" @click="router.push('/profile')">
            <iconify-icon class="text-xl" icon="solar:user-bold"></iconify-icon>
            <span class="text-[8px]">个人</span>
          </button>
          <button class="flex flex-col items-center gap-0.5 text-gray-400 w-12 relative" @click="openCartSheet">
            <iconify-icon class="text-xl" icon="solar:cart-large-minimalistic-linear"></iconify-icon>
            <span class="text-[8px]">购物车</span>
            <span class="absolute -top-0.5 -right-1 bg-[#FF85A2] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">{{ cartCount }}</span>
          </button>
          <button class="flex-1 bg-[#FFD1DC] text-[#5D4037] py-3 rounded-2xl text-sm font-bold" @click="addCart">加入购物车</button>
          <button class="flex-1 bg-[#FF85A2] text-white py-3 rounded-2xl text-sm font-bold shadow-lg shadow-pink-200" @click="goToOrder">立即购买</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-arrow { opacity: 0; transition: opacity 0.3s; }
.img-container:hover .img-arrow { opacity: 1; }
.share-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 40; display: none; }
.share-overlay.show { display: block; }
.share-sheet { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-radius: 24px 24px 0 0; padding: 24px; z-index: 50; transform: translateY(100%); transition: transform 0.3s ease; }
.share-sheet.show { transform: translateY(0); }
.review-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 60; display: none; }
.review-modal.show { display: block; }
.review-sheet { position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 340px; max-height: 70vh; background: #fff; border-radius: 24px; padding: 20px; z-index: 70; display: none; overflow-y: auto; }
.review-sheet.show { display: block; }
.cart-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 80; display: none; }
.cart-modal.show { display: block; }
.cart-sheet { position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-radius: 24px 24px 0 0; padding: 24px; z-index: 90; transform: translateY(100%); transition: transform 0.3s ease; }
.cart-sheet.show { transform: translateY(0); }
.tag-pill { background: #FDF0F3; color: #FF85A2; font-size: 10px; padding: 2px 8px; border-radius: 20px; font-weight: bold; }
.spec-btn { border: 1.5px solid #F0E8E4; border-radius: 16px; padding: 6px 16px; font-size: 12px; color: #5D4037; font-weight: 500; transition: all 0.2s; }
.spec-btn.active { border-color: #FF85A2; background: #FFF5F7; color: #FF85A2; font-weight: bold; }
</style>
