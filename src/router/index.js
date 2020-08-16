import Vue from 'vue'
import VueRouter from 'vue-router'

import Sections from '../views/Sections.vue'
import Section from '../views/Section.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },  
  {
    path: '/sections',
    name: 'Sections',
    component: Sections,
    meta: { requiresAuth: true }
  },
  {
    path: "/sections/:id",
    name: "Section",
    component: Section,
    meta: { requiresAuth: true }  
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  { 
    path: '/unauthorized', 
    name: 'Unauthorized', 
    // Unauthorized  
    component: () => import(/* webpackChunkName: "about" */ '../views/Unauthorized.vue')
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)

router.beforeEach((to, from, next) => {
  console.log('In router.beforeEach')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (router.app.$keycloak.authenticated) {
      console.log('authenticated : ' + to)
      next()
    } else {
      const loginUrl = router.app.$keycloak.createLoginUrl()
      console.log('loginUrl : ' + loginUrl)
      window.location.replace(loginUrl)
    }
  } else {
    next()
  }
}) 

export default router
