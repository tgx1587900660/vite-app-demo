import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/components/Home.vue';

// 创建路由实例对象
const router = createRouter({
  // 指定路由模式为 hash 模式
  history: createWebHistory(),
  // 设置路由对应关系
  routes: [{ path: '/', component: Home }],
});

// 导航守卫
router.beforeEach((to, from, next) => {
  // 如果未声明 next 函数，默认可以访问所有组件
  // 如果声明了 next 函数，则必须调用它，否则所有组件都无法访问
  // next() // 直接放行
  // next(false) // 不跳转
  // next('/home') // 跳到 '/home' 这个 hash 地址

  const token = localStorage.getItem('token');
  if (to.path === '/admin' && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
