import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About'
import ProductList from "../views/ProductList"
import TheTodo from "../views/Todo"
import Calendar from "../views/Calendar"
import Settings from "../views/Settings"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product-list',
    name: 'Product List',
    component: ProductList
  },
  {
    path: '/todo',
    name: 'Todo',
    component: TheTodo
  },

  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },

  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
