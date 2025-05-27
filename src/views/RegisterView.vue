<template>
  <div class="full-page-center">
    <div class="form-card">
      <h2 style="text-align:center;">注册</h2>
      <a-form :model="form" @submit="handleRegister">
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input-password v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item field="role" label="角色">
          <a-select v-model="form.role" placeholder="请选择角色">
            <a-option value="student">学生</a-option>
            <a-option value="leader">教师</a-option>
            <a-option value="admin">管理员</a-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="form.role === 'leader' || form.role === 'admin'" field="registerCode" label="注册码">
          <a-input v-model="form.registerCode" placeholder="请输入注册码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" long :loading="loading">注册</a-button>
        </a-form-item>
      </a-form>
      <div style="text-align:right; margin-top: 12px;">
        <span>已有账号？</span>
        <a-button type="text" @click="goLogin">去登录</a-button>
      </div>
      <a-alert v-if="errorMsg" type="error" :show-icon="true" style="margin-top:16px;">
        {{ errorMsg }}
      </a-alert>
      <a-alert v-if="successMsg" type="success" :show-icon="true" style="margin-top:16px;">
        {{ successMsg }}
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
  password: '',
  role: '',
  registerCode: ''
})
const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

function goLogin() {
  router.push('/login')
}

async function handleRegister() {
  errorMsg.value = ''
  successMsg.value = ''
  if (
    !form.value.username ||
    !form.value.password ||
    !form.value.role ||
    ((form.value.role === 'leader' || form.value.role === 'admin') && !form.value.registerCode)
  ) {
    errorMsg.value = '请填写所有字段'
    return
  }
  // 校验注册码
  if (
    (form.value.role === 'leader' || form.value.role === 'admin') &&
    form.value.registerCode !== 'admin123'
  ) {
    errorMsg.value = '注册码错误'
    return
  }
  loading.value = true
  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.value.username,
        password: form.value.password,
        role: form.value.role
      })
    }).then(r => r.json())
    if (res.success) {
      successMsg.value = '注册成功，正在跳转登录页...'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      errorMsg.value = res.message || '注册失败，用户名可能已存在'
    }
  } catch (err) {
    errorMsg.value = '注册失败，请稍后重试'
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