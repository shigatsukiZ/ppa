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
import HelpList from '../views/HelpList.vue'
import HelpDetail from '../views/HelpDetail.vue'
import Favorites from '../views/Favorites.vue'
import UserDetail from '../views/UserDetail.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import Settings from '../views/Settings.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import NotificationSettings from '../views/NotificationSettings.vue'
import PrivacySettings from '../views/PrivacySettings.vue'
import HelpFeedback from '../views/HelpFeedback.vue'

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
  { path: '/help-list/:type', component: HelpList },
  { path: '/help/:id', component: HelpDetail },
  { path: '/favorites', component: Favorites },
  { path: '/user', component: UserDetail },
  { path: '/orders', component: OrderList },
  { path: '/order-detail/:orderNum', component: OrderDetail },
  { path: '/settings', component: Settings },
  { path: '/profile-edit', component: ProfileEdit },
  { path: '/notification-settings', component: NotificationSettings },
  { path: '/privacy-settings', component: PrivacySettings },
  { path: '/help-feedback', component: HelpFeedback },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
