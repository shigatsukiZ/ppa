<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth, adminLogout } from '../stores/auth.js'
import AdminLogin from '../views/admin/Login.vue'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)

const navGroups = ref([
  { key: 'data', label: '数据', items: [
    { label: '仪表盘', icon: 'solar:chart-bold', path: '/admin/dashboard' },
    { label: '数据统计', icon: 'solar:graph-up-bold', path: '/admin/statistics' },
  ]},
  { key: 'user', label: '用户', items: [
    { label: '用户管理', icon: 'solar:users-group-rounded-bold', path: '/admin/users' },
    { label: '商家管理', icon: 'solar:shop-bold', path: '/admin/merchants' },
  ]},
  { key: 'content', label: '内容', items: [
    { label: '商品审核', icon: 'solar:box-bold', path: '/admin/product-audit' },
    { label: '帖子管理', icon: 'solar:file-text-bold', path: '/admin/posts' },
  ]},
  { key: 'order', label: '交易', items: [
    { label: '订单管理', icon: 'solar:clipboard-list-bold', path: '/admin/orders' },
  ]},
  { key: 'system', label: '系统', items: [
    { label: '系统设置', icon: 'solar:settings-bold', path: '/admin/settings' },
  ]},
])

const isActive = (path) => route.path.startsWith(path)
const loggedIn = computed(() => !!auth.admin)

const doLogout = () => {
  adminLogout()
  router.push('/admin')
}
</script>

<template>
  <AdminLogin v-if="!loggedIn && route.path !== '/admin/login'"/>

  <div v-else class="flex h-screen bg-gray-50">
    <aside class="bg-[#2C3E50] flex flex-col transition-all duration-300 shrink-0" :class="collapsed ? 'w-16' : 'w-60'">
      <div class="h-16 flex items-center gap-3 px-4 border-b border-white/10 shrink-0">
        <div class="w-8 h-8 rounded-lg bg-[#FF85A2] flex items-center justify-center text-white text-sm font-bold shrink-0">P</div>
        <span v-show="!collapsed" class="font-bold text-white text-sm whitespace-nowrap">PPA 管理后台</span>
      </div>
      <nav class="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <template v-for="group in navGroups" :key="group.key">
          <div v-show="!collapsed" class="text-[10px] text-white/30 uppercase tracking-wider px-3 pt-4 pb-1 font-bold">{{ group.label }}</div>
          <div v-for="item in group.items" :key="item.path"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
            :class="isActive(item.path) ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white/80'"
            @click="router.push(item.path)">
            <iconify-icon class="text-lg shrink-0" :icon="item.icon"></iconify-icon>
            <span v-show="!collapsed" class="text-sm whitespace-nowrap">{{ item.label }}</span>
          </div>
        </template>
      </nav>
      <div class="px-2 py-3 border-t border-white/10 shrink-0 space-y-1">
        <div class="flex items-center gap-3 px-3 py-2 cursor-pointer text-white/40 hover:text-white/60 transition-colors" @click="collapsed = !collapsed">
          <iconify-icon class="text-xl shrink-0" :icon="collapsed ? 'solar:alt-arrow-right-bold' : 'solar:alt-arrow-left-bold'"></iconify-icon>
          <span v-show="!collapsed" class="text-xs">收起侧栏</span>
        </div>
        <div class="flex items-center gap-3 px-3 py-2 cursor-pointer text-red-400 hover:text-red-300 transition-colors" @click="doLogout">
          <iconify-icon class="text-xl shrink-0" icon="solar:logout-2-bold"></iconify-icon>
          <span v-show="!collapsed" class="text-xs">退出登录</span>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <span class="text-sm font-bold text-[#5D4037]">欢迎回来，{{ auth.admin?.nickname || '管理员' }}</span>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5">
            <iconify-icon class="text-gray-400 text-sm" icon="solar:calendar-linear"></iconify-icon>
            <span class="text-xs text-gray-500">{{ new Date().toLocaleDateString('zh-CN') }}</span>
          </div>
          <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <iconify-icon class="text-lg" icon="solar:bell-bold"></iconify-icon>
          </button>
          <div class="flex items-center gap-2 cursor-pointer" @click="doLogout" title="退出登录">
            <div class="w-8 h-8 rounded-full bg-[#2C3E50] flex items-center justify-center text-white text-xs font-bold">管</div>
            <span class="text-sm font-medium text-[#5D4037] hidden sm:inline">{{ auth.admin?.nickname || '管理员' }}</span>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-6 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>
