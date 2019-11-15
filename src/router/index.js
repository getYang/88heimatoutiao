import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home/index.vue'  完整路径
import Layout from '../views/layout' // 简写路径
import Login from '../views/login' // 简写路径

// @ 是 VueCLI 中提供的一种特殊的路径规则，它直接指向 src 目录路径
// 注意：在 VueCLI 创建的项目中，无论你在哪里使用 @ 符号，它永远指向 src
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 一级路由 主页，它是最外面的那个壳子
  {
    path: '/',
    component: Layout,
    children: [
      { // 首页
        path: '', // 默认子路由，只能有一个
        component: Home
      }
    ]
  },
  {
    // 一级路由 登录页
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  console.log('所有页面的访问都要经过这里')

  // 1. 如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()

    // 停止代码往后执行
    return
  }

  // 2. 非登录页面，校验登录状态

  // 2.1 获取用户 token
  const token = window.localStorage.getItem('user-token')

  // 2.2 判断是否有 token，有就通过
  if (token) {
    next()
  } else {
    // 2.3 没有，就跳转到登录页
    next('/login')
  }
})
