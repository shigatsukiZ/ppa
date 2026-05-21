<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const faqs = ref([
  { q: '如何发布帖子？', a: '点击底部导航栏中间的「+」按钮即可进入发布页面，选择图片和填写内容后点击发布。', open: false },
  { q: '如何修改个人信息？', a: '前往「设置」→「个人信息」即可编辑你的昵称、头像和个人简介。', open: false },
  { q: '如何联系客服？', a: '请发送邮件至 support@petpal.com，我们会在 24 小时内回复你。', open: false },
  { q: '如何注销账号？', a: '前往「设置」→「账号安全」→「注销账号」，按照提示操作即可。', open: false },
  { q: '支付问题如何解决？', a: '如遇到支付失败或重复扣款，请截图并联系客服处理。', open: false },
])

const feedbackText = ref('')
const submitted = ref(false)

const submitFeedback = () => {
  if (!feedbackText.value.trim()) return
  submitted.value = true
  feedbackText.value = ''
  setTimeout(() => { submitted.value = false }, 2000)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-[#FFFDF9] rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <h1 class="flex-1 text-center text-sm font-bold text-[#5D4037]">帮助与反馈</h1>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3">
        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">常见问题</h3>
          <div v-for="(faq, idx) in faqs" :key="idx"
            class="border-b border-[#F5F5F5] last:border-0 cursor-pointer"
            @click="faq.open = !faq.open">
            <div class="flex items-center justify-between py-3">
              <span class="text-sm font-bold text-[#5D4037]">{{ faq.q }}</span>
              <iconify-icon class="text-gray-300 transition-transform shrink-0" :class="faq.open ? 'rotate-180' : ''" icon="solar:alt-arrow-down-linear"></iconify-icon>
            </div>
            <Transition name="fade">
              <p v-if="faq.open" class="text-xs text-gray-500 pb-3 leading-relaxed">{{ faq.a }}</p>
            </Transition>
          </div>
        </div>

        <div class="bg-white rounded-[28px] p-4 creamy-shadow">
          <h3 class="text-xs font-black text-[#5D4037] mb-3">意见反馈</h3>
          <textarea v-model="feedbackText" placeholder="写下你的意见或建议..." class="w-full px-3 py-3 rounded-2xl bg-gray-50 text-sm text-[#5D4037] outline-none resize-none" rows="4" maxlength="200"></textarea>
          <div class="flex justify-between items-center mt-2">
            <span class="text-[10px] text-gray-300">{{ feedbackText.length }}/200</span>
            <button class="px-6 py-2 rounded-full bg-[#FF85A2] text-white text-xs font-bold" :class="feedbackText.trim() ? '' : 'opacity-50'" :disabled="!feedbackText.trim()" @click="submitFeedback">提交</button>
          </div>
        </div>

        <div class="bg-white rounded-[28px] p-4 creamy-shadow text-center">
          <p class="text-xs text-gray-400 mb-1">联系客服</p>
          <p class="text-sm font-bold text-[#A7C7E7]">support@petpal.com</p>
          <p class="text-[10px] text-gray-300 mt-1">工作日 9:00 - 18:00</p>
        </div>
      </main>

      <Transition name="fade">
        <div v-if="submitted" class="absolute inset-0 z-50 flex items-center justify-center bg-black/20">
          <div class="bg-white rounded-[28px] px-8 py-6 shadow-2xl flex flex-col items-center gap-2">
            <div class="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-white text-lg">✓</div>
            <span class="text-sm font-bold text-[#5D4037]">反馈已提交</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
