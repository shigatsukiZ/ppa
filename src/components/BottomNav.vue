<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  hidden: { type: Boolean, default: false },
})

const route = useRoute()
const router = useRouter()

const items = [
  { path: '/home', icon: 'home-smile-linear', activeIcon: 'home-smile-bold' },
  { path: '/search', icon: 'magnifer-linear', activeIcon: 'magnifer-bold' },
  { path: '/post-edit', icon: 'add-circle-linear', activeIcon: 'add-circle-bold' },
  { path: '/social', icon: 'compass-linear', activeIcon: 'compass-bold' },
  { path: '/chat', icon: 'chat-round-dots-linear', activeIcon: 'chat-round-dots-bold' },
]

const navigate = (item) => {
  if (route.path !== item.path) router.push(item.path)
}
</script>

<template>
  <nav
    class="absolute bottom-0 left-0 right-0 flex items-center justify-around z-10 transition-transform duration-300 px-3 pb-3"
    :class="hidden ? 'translate-y-full' : 'translate-y-0'"
  >
    <div class="w-full h-[64px] bg-white/80 backdrop-blur-lg border border-[#F0F0F0] flex items-center justify-around rounded-[28px] shadow-lg shadow-black/5">
      <div
        v-for="(item, idx) in items"
        :key="item.path"
        class="flex items-center justify-center w-12 h-12 cursor-pointer relative"
        :class="route.path === item.path && idx !== 2 ? 'text-[#FF85A2]' : idx === 2 ? '' : 'text-gray-300'"
        @click="navigate(item)"
      >
        <div v-if="idx === 2" class="w-12 h-12 rounded-full bg-[#FF85A2] flex items-center justify-center shadow-md shadow-pink-200/60">
          <span class="text-white text-2xl font-bold leading-none">+</span>
        </div>
        <iconify-icon v-else
          class="text-2xl"
          :icon="`solar:${route.path === item.path ? item.activeIcon : item.icon}`"
        ></iconify-icon>
      </div>
    </div>
  </nav>
</template>
