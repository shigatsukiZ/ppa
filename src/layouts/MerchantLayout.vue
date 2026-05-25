<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth, merchantLogout } from '../stores/auth.js'
import MerchantLogin from '../views/merchant/Login.vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const navItems = ref([
  { label: '数据概览', icon: 'solar:chart-bold', path: '/merchant/dashboard' },
  { label: '商品管理', icon: 'solar:box-bold', path: '/merchant/products' },
  { label: '订单管理', icon: 'solar:clipboard-list-bold', path: '/merchant/orders' },
  { label: '客户消息', icon: 'solar:chat-round-dots-bold', path: '/merchant/messages' },
  { label: '评价管理', icon: 'solar:star-bold', path: '/merchant/reviews' },
  { label: '店铺设置', icon: 'solar:shop-bold', path: '/merchant/settings' },
])

const isActive = (path) => route.path.startsWith(path)
const loggedIn = computed(() => !!auth.merchant)

const doLogout = () => {
  merchantLogout()
  router.push('/merchant')
}
</script>

<template>
  <MerchantLogin v-if="!loggedIn && route.path !== '/merchant/login'"/>

  <div v-else class="flex h-screen bg-gray-50">
    <aside class="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0" :class="collapsed ? 'w-16' : 'w-60'">
      <div class="h-16 flex items-center gap-3 px-4 border-b border-gray-100 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-[#FF85A2] flex items-center justify-center text-white text-sm font-bold shrink-0">P</div>
        <span v-show="!collapsed" class="font-bold text-[#5D4037] text-sm whitespace-nowrap">商家中心</span>
      </div>
      <nav class="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <div v-for="item in navItems" :key="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
          :class="isActive(item.path) ? 'bg-[#FFF5F7] text-[#FF85A2]' : 'text-gray-500 hover:bg-gray-50'"
          @click="router.push(item.path)">
          <iconify-icon class="text-xl shrink-0" :icon="item.icon"></iconify-icon>
          <span v-show="!collapsed" class="text-sm font-medium whitespace-nowrap">{{ item.label }}</span>
        </div>
      </nav>
      <div class="px-2 py-3 border-t border-gray-100 shrink-0 space-y-1">
        <div class="flex items-center gap-3 px-3 py-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" @click="collapsed = !collapsed">
          <iconify-icon class="text-xl shrink-0" :icon="collapsed ? 'solar:alt-arrow-right-bold' : 'solar:alt-arrow-left-bold'"></iconify-icon>
          <span v-show="!collapsed" class="text-xs">收起侧栏</span>
        </div>
        <div class="flex items-center gap-3 px-3 py-2 cursor-pointer text-red-400 hover:text-red-500 transition-colors" @click="doLogout">
          <iconify-icon class="text-xl shrink-0" icon="solar:logout-2-bold"></iconify-icon>
          <span v-show="!collapsed" class="text-xs">退出登录</span>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-[#5D4037]">{{ auth.merchant?.name || '商家中心' }}</span>
          <span class="text-[10px] bg-green-50 text-green-500 px-2 py-0.5 rounded-full font-bold">{{ auth.merchant?.status || '营业中' }}</span>
        </div>
        <div class="flex items-center gap-4">
          <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors relative">
            <iconify-icon class="text-lg" icon="solar:bell-bold"></iconify-icon>
            <span class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF85A2] text-white text-[8px] flex items-center justify-center font-bold">3</span>
          </button>
          <div class="flex items-center gap-2 cursor-pointer" @click="doLogout" title="退出登录">
            <img class="w-8 h-8 rounded-full object-cover" :src="auth.merchant?.logo || ''" alt="avatar"/>
            <span class="text-sm font-medium text-[#5D4037] hidden sm:inline">{{ auth.merchant?.name }}</span>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
