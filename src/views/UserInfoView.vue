<template>
  <a-card title="个人信息" style="max-width: 500px; margin: 40px auto;">
    <a-form :model="form" layout="vertical" @submit.prevent="handleSubmit">
      <a-form-item label="用户名">
        <a-input v-model="form.username" disabled />
      </a-form-item>
      <a-form-item label="真实姓名">
        <a-input v-model="form.real_name" placeholder="请输入真实姓名" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱地址" />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input v-model="form.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="角色">
        <a-input v-model="form.role" disabled />
      </a-form-item>
      <a-form-item label="注册时间" v-if="form.create_time">
        <a-input v-model="form.create_time" disabled />
      </a-form-item>
      <a-form-item label="最后登录时间" v-if="form.last_login">
        <a-input v-model="form.last_login" disabled />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading">保存修改</a-button>
        <a-button style="margin-left: 16px" @click="resetForm">重置</a-button>
      </a-form-item>
      <div v-if="successMsg" style="color: #52c41a; margin-top: 16px;">{{ successMsg }}</div>
      <div v-if="errorMsg" style="color: #f53f3f; margin-top: 16px;">{{ errorMsg }}</div>
    </a-form>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  username: '',
  real_name: '',
  email: '',
  phone: '',
  role: '',
  create_time: '',
  last_login: ''
})
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const originalForm = ref({}) // 用于保存初始数据

onMounted(fetchUserInfo)

async function fetchUserInfo() {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    errorMsg.value = '未获取到用户信息，请重新登录'
    return
  }
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`)
    const data = await res.json()
    if (data.success) {
      form.value = {
        username: data.user.username,
        real_name: data.user.real_name,
        email: data.user.email,
        phone: data.user.phone || '',
        role: data.user.role,
        create_time: data.user.create_time,
        last_login: data.user.last_login || ''
      }
      originalForm.value = { ...form.value } // 保存初始数据
    } else {
      errorMsg.value = data.message || '获取用户信息失败'
    }
  } catch (e) {
    errorMsg.value = '获取用户信息失败'
  }
}

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  const userId = localStorage.getItem('userId')
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        real_name: form.value.real_name,
        email: form.value.email,
        phone: form.value.phone
      })
    })
    const data = await res.json()
    if (data.success) {
      successMsg.value = '修改成功'
      originalForm.value = { ...form.value } // 更新初始数据
    } else {
      errorMsg.value = data.message || '修改失败'
    }
  } catch (e) {
    errorMsg.value = '修改失败'
  }
  loading.value = false
}

function resetForm() {
  form.value = { ...originalForm.value } // 重置为初始数据
}
</script>

<style scoped>
a-card {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>