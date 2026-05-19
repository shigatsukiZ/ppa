import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Social from '../views/Social.vue'
import Mall from '../views/Mall.vue'
import Detail from '../views/Detail.vue'
import Order from '../views/Order.vue'
import Profile from '../views/Profile.vue'
import Setting from '../views/Setting.vue'
import Search from '../views/Search.vue'
import Location from '../views/Location.vue'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: Auth },
  { path: '/home', component: Home },
  { path: '/social', component: Social },
  { path: '/mall', component: Mall },
  { path: '/detail', component: Detail },
  { path: '/order', component: Order },
  { path: '/profile', component: Profile },
  { path: '/setting', component: Setting },
  { path: '/search', component: Search },
  { path: '/location', component: Location },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
