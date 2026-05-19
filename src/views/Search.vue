<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')

const history = ref([
  '幼猫猫粮推荐排行榜',
  '比熊犬美容教程',
  '宠物益生菌哪个牌子好',
  '金毛狗粮进口平价',
  '猫咪驱虫药内外同驱',
  '泰迪造型修剪视频',
  '宠物空气净化器测评',
  '狗狗训练上厕所方法',
])

const recommends = [
  '猫罐头', '狗粮', '驱虫药', '宠物玩具', '宠物衣服', '美容工具',
]

const close = () => {
  router.back()
}

const doSearch = () => {
  if (keyword.value.trim()) {
    history.value.unshift(keyword.value.trim())
    if (history.value.length > 8) history.value.pop()
    keyword.value = ''
  }
}

const searchHistory = (item) => {
  keyword.value = item
  doSearch()
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col" @click.self="close">
      <div class="pt-12 px-6 flex-1 overflow-y-auto custom-scrollbar" @click.stop>
        <div class="flex items-center gap-3 mb-8">
          <div class="flex-1 flex items-center bg-[#F5F5F5] rounded-2xl px-4 h-[44px] gap-2">
            <iconify-icon class="text-gray-400 text-lg" icon="solar:magnifer-linear"></iconify-icon>
            <input
              class="flex-1 bg-transparent outline-none text-sm text-[#5D4037] placeholder-gray-300"
              placeholder="搜索宠物、商品、用户..."
              v-model="keyword"
              @keyup.enter="doSearch"
            />
          </div>
          <button class="text-sm font-bold text-gray-500 whitespace-nowrap" @click="close">取消</button>
        </div>

        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-bold text-[#5D4037]">搜索历史</span>
          <button class="text-xs text-gray-300" @click="history = []">
            <iconify-icon icon="solar:trash-bin-trash-linear"></iconify-icon>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-8">
          <div
            v-for="(item, idx) in history"
            :key="idx"
            class="flex items-center gap-2 bg-[#F5F5F5] rounded-xl px-3 py-2.5 cursor-pointer"
            @click="searchHistory(item)"
          >
            <iconify-icon class="text-gray-300 shrink-0" icon="solar:history-linear"></iconify-icon>
            <span class="text-xs text-gray-500 truncate">{{ item }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-bold text-[#5D4037]">推荐搜索</span>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="(tag, idx) in recommends"
            :key="idx"
            class="px-3 py-1.5 bg-[#FFF5F7] rounded-full text-xs text-[#FF85A2] font-medium cursor-pointer"
            @click="keyword = tag; doSearch()"
          >{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
