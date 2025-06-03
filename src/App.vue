<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import IconUser from '@arco-design/web-vue/es/icon/icon-user'

const isLogin = ref(!!localStorage.getItem('isLogin'))

window.addEventListener('login-success', () => {
  isLogin.value = true
  localStorage.setItem('isLogin', '1')
})

window.addEventListener('logout', () => {
  isLogin.value = false
  localStorage.removeItem('isLogin')
})

const userRole = ref(localStorage.getItem('userRole') || '')
window.addEventListener('login-success', () => {
  userRole.value = localStorage.getItem('userRole') || ''
})
window.addEventListener('logout', () => {
  userRole.value = ''
})

const route = useRoute()
const hideNavRoutes = ['/login', '/register']
const hideNav = computed(() => hideNavRoutes.includes(route.path))

function logout() {
  window.dispatchEvent(new Event('logout'))
  location.href = '/login'
}
function onLoginSuccess() {
  window.dispatchEvent(new Event('login-success'))
}
</script>

<template>
  <div :class="{'full-page': hideNav}">
    <header v-if="isLogin && !hideNav">
      <img alt="Vue logo" class="logo" src="@/assets/logo_s.png"  />
      <div class="menu-wrapper">
        <a-menu mode="horizontal" :selected-keys="[route.path]" style="flex:1;min-width:900px;">
          <a-menu-item key="/">
            <RouterLink to="/">首页</RouterLink>
          </a-menu-item>

          <a-menu-item key="/score-query">
            <RouterLink to="/score-query">成绩查询</RouterLink>
          </a-menu-item>
          <a-menu-item key="/score-sort">
            <RouterLink to="/score-sort">排序字段</RouterLink>
          </a-menu-item>
          <a-menu-item key="/add-score">
            <RouterLink to="/add-score">添加成绩</RouterLink>
          </a-menu-item>
          <a-menu-item key="/delete-score">
            <RouterLink to="/delete-score">删除成绩</RouterLink>
          </a-menu-item>
          <a-menu-item key="/edit-score">
            <RouterLink to="/edit-score">修改成绩</RouterLink>
          </a-menu-item>
          <a-menu-item key="/about">
            <RouterLink to="/about">关于页面</RouterLink>
          </a-menu-item>
        </a-menu>
        <!-- 个人中心下拉，无箭头 -->
        <a-dropdown trigger="hover">
          <span class="user-center-btn">
            <IconUser style="margin-right:6px;font-size:18px;" />
            个人中心
          </span>
          <template #content>
            <a-doption @click="$router.push('/user-info')">
              <IconUser style="margin-right:6px;font-size:16px;" />
              用户信息
            </a-doption>
            <a-doption @click="logout" style="color:#f53f3f;">
              退出登录
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </header>
    <RouterView @login-success="onLoginSuccess" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 0 32px;
}
.logo {
  width:"auto" ;
  height:"auto";
  display: block;
  margin: 10px;
}
.menu-wrapper {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}
.user-center-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 16px;
  font-size: 16px;
  color: #1d2129;
  height: 48px;
}
.full-page {
  min-height: 100vh;
  background: #f7f8fa;
  display: flex;
  flex-direction: column;
}
</style>