import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './components/Home.vue'
import Movie from './components/Movie.vue'
import About from './components/About.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/movie',
      component: Movie
    },
    {
      path: '/about',
      component: About
    }
  ]
})

export default router
