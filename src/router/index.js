import Vue from 'vue'
import VueRouter from 'vue-router'

import Sections from '../views/Sections.vue'
import Section from '../views/Section.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Sections',
    component: Sections
  },
  {
    path: "/sections/:id",
    name: "Section",
    component: Section
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
