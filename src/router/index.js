import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../views/mobile/Auth.vue'
import Home from '../views/mobile/Home.vue'
import Social from '../views/mobile/Social.vue'
import Detail from '../views/mobile/Detail.vue'
import Order from '../views/mobile/Order.vue'
import Setting from '../views/mobile/Setting.vue'
import Search from '../views/mobile/Search.vue'
import Location from '../views/mobile/Location.vue'
import PostEdit from '../views/mobile/PostEdit.vue'
import Chat from '../views/mobile/Chat.vue'
import Profile from '../views/mobile/Profile.vue'
import ChatDetail from '../views/mobile/ChatDetail.vue'
import ProductDetail from '../views/mobile/ProductDetail.vue'
import Cart from '../views/mobile/Cart.vue'
import Payment from '../views/mobile/Payment.vue'
import HelpList from '../views/mobile/HelpList.vue'
import HelpDetail from '../views/mobile/HelpDetail.vue'
import Favorites from '../views/mobile/Favorites.vue'
import UserDetail from '../views/mobile/UserDetail.vue'
import OrderList from '../views/mobile/OrderList.vue'
import OrderDetail from '../views/mobile/OrderDetail.vue'
import Settings from '../views/mobile/Settings.vue'
import ProfileEdit from '../views/mobile/ProfileEdit.vue'
import NotificationSettings from '../views/mobile/NotificationSettings.vue'
import PrivacySettings from '../views/mobile/PrivacySettings.vue'
import HelpFeedback from '../views/mobile/HelpFeedback.vue'
import MerchantLayout from '../layouts/MerchantLayout.vue'
import MDashboard from '../views/merchant/Dashboard.vue'
import MProductList from '../views/merchant/ProductList.vue'
import MOrderList from '../views/merchant/OrderList.vue'
import MMessageList from '../views/merchant/MessageList.vue'
import MReviewList from '../views/merchant/ReviewList.vue'
import MStoreSettings from '../views/merchant/StoreSettings.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import ADashboard from '../views/admin/Dashboard.vue'
import AUserList from '../views/admin/UserList.vue'
import AMerchantList from '../views/admin/MerchantList.vue'
import AProductAudit from '../views/admin/ProductAudit.vue'
import APostList from '../views/admin/PostList.vue'
import AOrderList from '../views/admin/OrderList.vue'
import AStatistics from '../views/admin/Statistics.vue'
import ASystemSettings from '../views/admin/SystemSettings.vue'
import ATagManager from '../views/admin/TagManager.vue'
import ACategoryManager from '../views/admin/CategoryManager.vue'

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
  {
    path: '/merchant',
    component: MerchantLayout,
    children: [
      { path: '', redirect: '/merchant/dashboard' },
      { path: 'dashboard', component: MDashboard },
      { path: 'products', component: MProductList },
      { path: 'orders', component: MOrderList },
      { path: 'messages', component: MMessageList },
      { path: 'reviews', component: MReviewList },
      { path: 'settings', component: MStoreSettings },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: ADashboard },
      { path: 'users', component: AUserList },
      { path: 'merchants', component: AMerchantList },
      { path: 'product-audit', component: AProductAudit },
      { path: 'posts', component: APostList },
      { path: 'orders', component: AOrderList },
      { path: 'statistics', component: AStatistics },
      { path: 'settings', component: ASystemSettings },
      { path: 'tags', component: ATagManager },
      { path: 'categories', component: ACategoryManager },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
