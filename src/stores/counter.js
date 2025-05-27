import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // 用户角色状态
  const userRole = ref(localStorage.getItem('userRole') || '')

  // 登录时设置角色并保存
  function setUserRole(role) {
    userRole.value = role
    localStorage.setItem('userRole', role)
  }

  // 退出登录时销毁角色
  function clearUserRole() {
    userRole.value = ''
    localStorage.removeItem('userRole')
  }

  return { count, doubleCount, increment, userRole, setUserRole, clearUserRole }
})
