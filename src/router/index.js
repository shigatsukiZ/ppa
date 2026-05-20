import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'
import Social from '../views/Social.vue'
import Detail from '../views/Detail.vue'
import Order from '../views/Order.vue'
import Setting from '../views/Setting.vue'
import Search from '../views/Search.vue'
import Location from '../views/Location.vue'
import PostEdit from '../views/PostEdit.vue'
import Chat from '../views/Chat.vue'
import Profile from '../views/Profile.vue'
import ChatDetail from '../views/ChatDetail.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Cart from '../views/Cart.vue'
import Payment from '../views/Payment.vue'

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: Auth },
  { path: '/home', component: Home },
  { path: '/social', component: Social },
  { path: '/detail', component: Detail },
  { path: '/chat', component: Chat },
  { path: '/chat/:name', component: ChatDetail },
  { path: '/cart', component: Cart },
  { path: '/payment', component: Payment },
  { path: '/order', component: Order },
  { path: '/setting', component: Setting },
  { path: '/search', component: Search },
  { path: '/location', component: Location },
  { path: '/post-edit', component: PostEdit },
  { path: '/profile/:name', component: Profile },
  { path: '/product/:id', component: ProductDetail },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
