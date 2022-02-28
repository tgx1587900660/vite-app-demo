import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './components/Home.vue'
import Movie from './components/Movie.vue'

import About from './components/About.vue'
import Html from './components/Html.vue'
import AboutTab1 from './components/About-tab1.vue'
import AboutTab2 from './components/About-tab2.vue'

// 创建路由实例对象
const router = createRouter({
  // 指定路由模式为 hash 模式
  history: createWebHashHistory(),

  // 指定 用于激活的 RouterLink 的默认类名，会渲染到 router-link 转换的 a 标签上(可以在全局 css 中定义它的样式)
  linkActiveClass: 'my-router-active',

  // 设置路由对应关系
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/html/:id', name: 'html', component: Html, props: true },
    { path: '/movie', component: Movie },
    {
      path: '/about',
      component: About,
      redirect: '/about/tab1',
      children: [
        {
          path: 'tab1',
          component: AboutTab1
        },
        {
          path: 'tab2',
          component: AboutTab2
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果未声明 next 函数，默认可以访问所有组件
  // 如果声明了 next 函数，则必须调用它，否则所有组件都无法访问
  console.log('ok')

  // next() // 直接放行
  // next(false) // 不跳转
  // next('/home') // 跳到 '/home' 这个 hash 地址

  const token = localStorage.getItem('token')
  if (to.path === '/admin' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
