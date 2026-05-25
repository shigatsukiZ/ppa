<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = ref({
  nickname: '元宝麻麻',
  bio: '萨摩耶日常 | 宠物好物推荐',
  phone: '138****1234',
  email: 'mama@yuanbao.com',
  gender: '女',
  birthday: '1995-06-15',
})

const saved = ref(false)
const save = () => {
  saved.value = true
  setTimeout(() => {
    saved.value = false
    router.back()
  }, 1200)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-bold text-[#5D4037]">编辑个人资料</h1>
        <button class="text-xs font-bold text-[#FF85A2]" @click="save">保存</button>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-4">
        <div class="flex flex-col items-center">
          <div class="relative">
            <img class="w-20 h-20 rounded-full object-cover border-2 border-[#FFD1DC]" src="https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg" alt="avatar"/>
            <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FF85A2] flex items-center justify-center text-white border-2 border-white cursor-pointer">
              <iconify-icon class="text-xs" icon="solar:camera-bold"></iconify-icon>
            </div>
          </div>
          <p class="text-[10px] text-gray-400 mt-2">点击更换头像</p>
        </div>

        <div class="bg-white rounded-[28px] p-4 creamy-shadow space-y-4">
          <div>
            <label class="text-[10px] text-gray-400 font-bold">昵称</label>
            <input v-model="form.nickname" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none" maxlength="20"/>
          </div>
          <div>
            <label class="text-[10px] text-gray-400 font-bold">个人简介</label>
            <textarea v-model="form.bio" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none resize-none" rows="2" maxlength="60"/>
          </div>
          <div>
            <label class="text-[10px] text-gray-400 font-bold">手机号</label>
            <input v-model="form.phone" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none" maxlength="11"/>
          </div>
          <div>
            <label class="text-[10px] text-gray-400 font-bold">邮箱</label>
            <input v-model="form.email" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="text-[10px] text-gray-400 font-bold">性别</label>
              <select v-model="form.gender" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none">
                <option>男</option>
                <option>女</option>
                <option>保密</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="text-[10px] text-gray-400 font-bold">生日</label>
              <input v-model="form.birthday" type="date" class="w-full mt-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-[#5D4037] outline-none"/>
            </div>
          </div>
        </div>
      </main>

      <Transition name="fade">
        <div v-if="saved" class="absolute inset-0 z-50 flex items-center justify-center bg-black/20">
          <div class="bg-white rounded-[28px] px-8 py-6 shadow-2xl flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-lg">✓</div>
            <span class="text-sm font-bold text-[#5D4037]">保存成功</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
