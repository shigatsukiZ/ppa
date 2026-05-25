<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { merchantLogin } from '../../stores/auth.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const doLogin = async () => {
  error.value = ''
  if (!username.value || !password.value) { error.value = '请输入用户名和密码'; return }
  loading.value = true
  try {
    await merchantLogin(username.value, password.value)
    router.push('/merchant/dashboard')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF0F3]">
    <div class="w-full max-w-md mx-4">
      <div class="text-center mb-10">
        <div class="w-20 h-20 rounded-2xl bg-[#FF85A2] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-200">
          <span class="text-white text-3xl font-black">P</span>
        </div>
        <h1 class="text-2xl font-black text-[#5D4037]">商家中心</h1>
        <p class="text-sm text-gray-400 mt-1">宠物食光 · 商家管理平台</p>
      </div>

      <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
        <div class="space-y-5">
          <div>
            <label class="text-xs text-gray-400 font-bold block mb-1.5">用户名</label>
            <input v-model="username" type="text" placeholder="请输入商家账号" class="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#5D4037] outline-none focus:border-[#FF85A2] transition-colors" @keyup.enter="doLogin"/>
          </div>
          <div>
            <label class="text-xs text-gray-400 font-bold block mb-1.5">密码</label>
            <input v-model="password" type="password" placeholder="请输入密码" class="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-[#5D4037] outline-none focus:border-[#FF85A2] transition-colors" @keyup.enter="doLogin"/>
          </div>
          <p v-if="error" class="text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2">{{ error }}</p>
          <button class="w-full h-12 rounded-xl bg-[#FF85A2] text-white text-sm font-bold shadow-lg shadow-pink-100 hover:scale-[1.02] transition-all disabled:opacity-50" :disabled="loading" @click="doLogin">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <div class="mt-6 text-center">
          <p class="text-[10px] text-gray-300">测试账号：merchant / 123456</p>
        </div>
      </div>
    </div>
  </div>
</template>
