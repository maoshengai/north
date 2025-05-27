<template>
  <div class="full-page-center">
    <div class="form-card">
      <h2 style="text-align:center;">登录</h2>
      <a-form :model="form" @submit="handleLogin">
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" long :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
      <div style="text-align:right; margin-top: 12px;">
        <span>未注册？</span>
        <a-button type="text" @click="goRegister">去注册</a-button>
      </div>
      <a-alert v-if="errorMsg" type="error" :show-icon="true" style="margin-top:16px;">
        {{ errorMsg }}
      </a-alert>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const errorMsg = ref('')
const userRole = ref('')

function goRegister() {
  router.push('/register')
}

// 伪接口调用，实际应调用后端API
async function handleLogin() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    }).then(r => r.json())
    if (res.success) {
      localStorage.setItem('userRole', res.role)
      localStorage.setItem('userId', res.id) 
      userRole.value = res.role
      window.dispatchEvent(new Event('login-success'))
      router.push('/')
    } else {
      errorMsg.value = res.message || '用户名或密码错误，或未注册'
    }
  } catch (err) {
    errorMsg.value = '登录失败，请稍后重试'
  }
  loading.value = false
}
</script>

<style scoped>
.full-page-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
}
.form-card {
  width: 100%;
  max-width: 600px;
  min-height: 420px;
  padding: 100px;
  box-shadow: 0 2px 8px #f0f1f2;
  border-radius: 8px;
  background: #fff;
}
</style>