<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: { type: [String, Number], default: '' },
  title: { type: String, default: '下午有人一起遛狗吗？' },
  location: { type: String, default: '西溪湿地南门' },
  time: { type: String, default: '16:00' },
  pets: { type: String, default: '金毛·奶油' },
  owner: { type: String, default: '奶油的麻麻' },
  distance: { type: String, default: '500m' },
  status: { type: String, default: 'active' },
})

const emit = defineEmits(['join', 'view-map'])

const joined = ref(false)

const onJoin = () => {
  if (joined.value) return
  joined.value = true
  emit('join', props.id)
}
</script>

<template>
  <div class="w-full p-3 rounded-2xl flex items-center gap-3" :class="joined ? 'bg-[#F0F7F0] border border-solid border-[#A7C7E7]' : 'bg-[#F9F9FF] border border-dashed border-[#A7C7E7]'">
    <div class="bg-white w-10 h-10 rounded-xl flex items-center justify-center text-[#A7C7E7] shrink-0">
      <iconify-icon class="text-2xl" icon="solar:map-point-bold"></iconify-icon>
    </div>
    <div class="flex-1 min-w-0">
      <h4 class="text-xs font-bold text-[#5D4037] truncate">{{ title }}</h4>
      <p class="text-[10px] text-gray-400 truncate">{{ location }} · {{ time }}见</p>
      <p v-if="!joined" class="text-[9px] text-[#A7C7E7] mt-1">{{ owner }} · {{ distance }}</p>
      <p v-else class="text-[9px] text-green-500 mt-1">已加入，记得准时到哦～</p>
    </div>
    <button v-if="!joined" class="bg-[#A7C7E7] text-white text-[10px] px-3 py-1.5 rounded-full font-bold shrink-0 hover:opacity-90 transition-opacity" @click="onJoin">加入</button>
    <button v-else class="border border-[#A7C7E7] text-[#A7C7E7] text-[10px] px-3 py-1.5 rounded-full font-bold shrink-0 hover:bg-blue-50 transition-colors" @click.stop="emit('view-map', props.id)">去地图</button>
  </div>
</template>
