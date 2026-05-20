<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartItems = ref([
  { id: 1, name: '元气奶油猫窝限定套餐', price: 388.00, qty: 1, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/c1b3faf520804bda89bbdd836711d2d6.jpg', checked: true },
  { id: 2, name: '高钙羊乳肉垫冻干', price: 29.9, qty: 2, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg', checked: true },
  { id: 3, name: '宠物猫狗通用冰垫', price: 59.0, qty: 1, img: 'https://picsum.photos/400/400?random=20', checked: false },
  { id: 4, name: '猫咪连体卫衣', price: 79.0, qty: 1, img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', checked: true },
])

const allChecked = computed(() => cartItems.value.every(i => i.checked))
const totalPrice = computed(() => cartItems.value.reduce((s, i) => s + (i.checked ? i.price * i.qty : 0), 0))

const toggleCheck = (id) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.checked = !item.checked
}
const toggleAll = () => {
  const newVal = !allChecked.value
  cartItems.value.forEach(i => i.checked = newVal)
}
const updateQty = (id, delta) => {
  const item = cartItems.value.find(i => i.id === id)
  if (!item) return
  item.qty = Math.max(1, item.qty + delta)
}
const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

const checkout = () => {
  const checked = cartItems.value.filter(i => i.checked)
  if (!checked.length) { alert('请选择商品'); return }
  sessionStorage.setItem('cartItems', JSON.stringify(checked))
  const total = checked.reduce((s, i) => s + i.price * i.qty, 0)
  sessionStorage.setItem('payTotal', String(total))
  router.push('/payment')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.push('/home?tab=mall')">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">购物车</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar bg-[#FAFAFA]">
        <div v-if="!cartItems.length" class="flex flex-col items-center justify-center h-full gap-3 text-gray-300">
          <iconify-icon class="text-5xl" icon="solar:cart-large-minimalistic-linear"></iconify-icon>
          <span class="text-sm">购物车是空的</span>
        </div>

        <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#F0F0F0]">
          <button class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all" :class="item.checked ? 'bg-[#FF85A2] border-[#FF85A2] text-white' : 'border-gray-300'" @click="toggleCheck(item.id)">
            <iconify-icon v-if="item.checked" class="text-[10px]" icon="solar:check-bold"></iconify-icon>
          </button>
          <img :src="item.img" class="w-16 h-16 rounded-xl object-cover shrink-0"/>
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-[#5D4037] truncate">{{ item.name }}</h4>
            <div class="flex items-center justify-between mt-1.5">
              <span class="text-sm font-black text-[#FF85A2]">¥{{ item.price.toFixed(1) }}</span>
              <div class="flex items-center gap-2">
                <div class="flex items-center rounded-lg bg-gray-100">
                  <button class="w-7 h-7 flex items-center justify-center text-gray-500 text-sm rounded-lg hover:bg-gray-200 transition-colors" @click="updateQty(item.id, -1)">−</button>
                  <span class="w-7 text-center text-xs font-bold text-[#5D4037]">{{ item.qty }}</span>
                  <button class="w-7 h-7 flex items-center justify-center text-gray-500 text-sm rounded-lg hover:bg-gray-200 transition-colors" @click="updateQty(item.id, 1)">+</button>
                </div>
                <button class="text-gray-300 hover:text-gray-500 transition-colors rounded-full p-1" @click="removeItem(item.id)">
                  <iconify-icon class="text-sm" icon="solar:trash-bin-minimalistic-bold"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div class="shrink-0 px-4 py-3 border-t border-[#F0F0F0] bg-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all" :class="allChecked ? 'bg-[#FF85A2] border-[#FF85A2] text-white' : 'border-gray-300'" @click="toggleAll">
              <iconify-icon v-if="allChecked" class="text-[10px]" icon="solar:check-bold"></iconify-icon>
            </button>
            <span class="text-xs text-gray-400">全选</span>
          </div>
          <div class="flex items-center gap-4">
            <div>
              <span class="text-xs text-gray-400">合计：</span>
              <span class="text-base font-black text-[#FF85A2]">¥{{ totalPrice.toFixed(1) }}</span>
            </div>
            <button class="px-6 py-2.5 text-xs font-bold rounded-full bg-[#FF85A2] text-white shadow-lg shadow-pink-200/50" :class="totalPrice ? '' : 'opacity-50'" :disabled="!totalPrice" @click="checkout">结算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
