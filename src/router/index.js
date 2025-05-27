import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LoginView.vue'),
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/RegisterView.vue'),
    // },
    {
      path: '/user-info',
      name: 'user-info',
      component: () => import('../views/UserInfoView.vue')
    },
    {
      path: '/score-query',
      name: 'score-query',
      component: () => import('../views/ScoreQueryView.vue')
    },
    {
      path: '/add-score/:xh?',
      name: 'add-score',
      component: () => import('../views/ScoreAddView.vue')
    },
    {
      path: '/delete-score',
      name: 'delete-score',
      component: () => import('../views/DeleteScoreView.vue'),
    },
    {
      path: '/edit-score',
      name: 'edit-score',
      component: () => import('../views/EditScoreView.vue'),
    },
  ],
})

// 全局前置守卫：未登录强制跳转到登录页
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.getItem('isLogin')
  if (!isLogin && !whiteList.includes(to.path)) {
    alert('请先登录')
    next('/login')
  } else {
    next()
  }
})

export default router
