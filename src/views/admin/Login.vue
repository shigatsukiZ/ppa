<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminLogin } from '../../stores/auth.js'

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
    await adminLogin(username.value, password.value)
    router.push('/admin/dashboard')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#2C3E50]">
    <div class="w-full max-w-md mx-4">
      <div class="text-center mb-10">
        <div class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-xl border border-white/20">
          <span class="text-white text-3xl font-black">P</span>
        </div>
        <h1 class="text-2xl font-black text-white">PPA 管理后台</h1>
        <p class="text-sm text-white/50 mt-1">全平台管理系统</p>
      </div>

      <div class="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
        <div class="space-y-5">
          <div>
            <label class="text-xs text-white/50 font-bold block mb-1.5">用户名</label>
            <input v-model="username" type="text" placeholder="请输入管理员账号" class="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder-white/20" @keyup.enter="doLogin"/>
          </div>
          <div>
            <label class="text-xs text-white/50 font-bold block mb-1.5">密码</label>
            <input v-model="password" type="password" placeholder="请输入密码" class="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors placeholder-white/20" @keyup.enter="doLogin"/>
          </div>
          <p v-if="error" class="text-xs text-red-400 bg-red-500/10 rounded-xl px-4 py-2">{{ error }}</p>
          <button class="w-full h-12 rounded-xl bg-[#FF85A2] text-white text-sm font-bold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50" :disabled="loading" @click="doLogin">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </div>
        <div class="mt-6 text-center">
          <p class="text-[10px] text-white/30">测试账号：admin / admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>
