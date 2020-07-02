import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/public/Home.vue')
    // children: [{

    //   path: '/Login',
    //   component: () => import('../views/public/Login.vue')
    // }]
  },
  {

    path: '/Login',
    name: 'Login',
    component: () => import('../views/public/Login.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
