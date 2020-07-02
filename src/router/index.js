import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/Home'
  },

  {
    path: '/Public',
    component: () => import('../views/viewsPublic.vue'),

    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('../views/public/Home.vue')
      },
      {
        path: '/Login',
        name: 'Login',
        component: () => import('../views/public/Login.vue')
      },
      {
        path: '/Register',
        name: 'Register',
        component: () => import('../views/public/Register.vue')
      }

    ]
  },
  {
    path: '/Private',
    component: () => import('../views/viewsPrivate.vue'),

    children: [
      {
        path: '/Feed',
        name: 'Feed',
        component: () => import('../views/private/Feed.vue')
      },
      {
        path: '/Event',
        name: 'Event',
        component: () => import('../views/private/Event.vue')
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
