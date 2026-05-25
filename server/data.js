// Original search data
export const posts = [
  { id: 1, nickname: '元宝麻麻', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/af35e4b610ad439595e4cfb3ea6b3b9c.jpg', time: '2026.04.28 · 上海', content: '今天元宝学会了握手！🐾 果然是全宇宙最聪明的萨摩耶，晚饭奖励一罐主食罐头~', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/e25afcc619e242d685ac8aa69e479a01.jpg'], likes: '1.2k', comments: '48', views: '5.6k', hasBadge: true },
  { id: 2, nickname: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', time: '昨天 · 成都', content: '锦城公园今天的落日也太美了🌇 大白跑得很开心！捡到一根超粗的树枝当宝贝叼了一路～', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/5900002fc3fe424ebe9f62fdd0fed151.jpg'], likes: '2.1k', comments: '67', views: '8.2k', hasBadge: true },
  { id: 3, nickname: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', time: '2小时前 · 北京', content: '给团子做了自制猫饭，鸡胸肉+蛋黄+胡萝卜，吃得吧唧嘴😋 配方在评论区自取~', images: ['https://modao.cc/agent-py/media/generated_images/2026-04-28/561fd106ba1648fda57739ff44183161.jpg'], likes: '856', comments: '23', views: '3.1k', hasBadge: false },
]

export const users = [
  { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享', avatar: 'https://picsum.photos/200?random=1', followers: '12.3w' },
  { name: '毛球麻麻', desc: '两只柯基的快乐生活', avatar: 'https://picsum.photos/200?random=2', followers: '8.5w' },
  { name: '可乐麻麻', desc: '金毛控 | 训练教程分享', avatar: 'https://picsum.photos/200?random=3', followers: '6.2w' },
  { name: '布丁麻麻', desc: '猫狗双全的人生赢家', avatar: 'https://picsum.photos/200?random=4', followers: '15.7w' },
  { name: '七喜麻麻', desc: '哈士奇搞笑日常', avatar: 'https://picsum.photos/200?random=5', followers: '21.0w' },
  { name: '糯米麻麻', desc: '英短繁育 | 猫咪知识科普', avatar: 'https://picsum.photos/200?random=6', followers: '4.3w' },
]

export const products = [
  { name: '高钙羊乳肉垫冻干', price: '29.9', sales: '2k+', tag: '自营' },
  { name: '元宝定制猫抓板', price: '88.0', sales: '800+', tag: '联名' },
  { name: '萨摩耶泪痕清理液', price: '48.0', sales: '1.5k+', tag: '热销' },
  { name: '耐咬大骨头', price: '19.9', sales: '3.2k+', tag: '爆款' },
  { name: '猫咪驱虫药内外同驱', price: '68.0', sales: '5k+', tag: '推荐' },
  { name: '宠物益生菌', price: '39.9', sales: '4.1k+', tag: '自营' },
]

export const hotTags = ['猫罐头', '狗粮', '驱虫药', '宠物玩具', '宠物衣服', '美容工具', '宠物推车', '猫砂', '化毛膏', '冻干', '宠物保险', '宠物摄影']

// ----- Merchant & Admin data -----
let nextId = (start = 1) => { let i = start; return () => i++ }

export const merchants = [
  { id: 1, username: 'merchant', password: '123456', name: '宠物食光官方旗舰店', logo: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg', desc: '专注宠物健康食品与用品，所有商品均为正品保障。', openTime: '09:00', closeTime: '22:00', shipping: '满 99 包邮', status: '营业中' },
]

export const admins = [
  { id: 1, username: 'admin', password: 'admin123', nickname: '超级管理员' },
]

// Merchant products
export let merchantProducts = []
const mProdId = nextId(100)
const prodNames = ['天然无谷猫粮 鸡肉配方', '狗狗磨牙棒 大号耐咬', '宠物智能饮水机', '猫咪逗猫棒 羽毛款', '高钙羊乳肉垫冻干', '元宝定制猫抓板', '萨摩耶泪痕清理液', '耐咬大骨头', '猫咪驱虫药内外同驱', '宠物益生菌', '宠物旅行包 便携款', '猫咪自动喂食器', '狗狗雨衣 S号', '宠物指甲剪套装', '猫咪沐浴露 低敏配方', '狗狗发声玩具 小黄鸭', '宠物床 四季通用', '猫砂盆 全封闭式', '狗狗牵引绳 防爆冲', '宠物湿巾 80抽']
const prodPrices = [128, 39.9, 199, 19.9, 29.9, 88, 48, 19.9, 68, 39.9, 159, 299, 79, 25, 55, 15, 189, 129, 69, 12]
const prodStocks = [56, 200, 32, 0, 150, 80, 45, 300, 120, 90, 20, 15, 60, 100, 40, 250, 30, 25, 70, 500]
const prodSales = [128, 96, 72, 210, 65, 180, 43, 320, 88, 155, 22, 35, 50, 110, 30, 280, 18, 20, 48, 400]
const prodStatuses = ['上架', '上架', '上架', '下架', '上架', '上架', '上架', '上架', '上架', '上架', '下架', '上架', '上架', '上架', '下架', '上架', '下架', '上架', '上架', '上架']
const prodTags = ['自营', '热销', '推荐', '爆款', '自营', '联名', '热销', '爆款', '推荐', '自营', '新品', '推荐', '热销', '自营', '新品', '爆款', '推荐', '自营', '热销', '自营']
for (let i = 0; i < prodNames.length; i++) {
  merchantProducts.push({
    id: mProdId(),
    name: prodNames[i],
    price: prodPrices[i],
    stock: prodStocks[i],
    sales: prodSales[i],
    status: prodStatuses[i],
    img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg',
    tag: prodTags[i],
  })
}

export function addMerchantProduct(p) {
  p.id = mProdId()
  merchantProducts.push(p)
  return p
}

export function updateMerchantProduct(id, data) {
  const idx = merchantProducts.findIndex(p => p.id === id)
  if (idx !== -1) Object.assign(merchantProducts[idx], data)
  return merchantProducts[idx]
}

// Merchant orders
export let merchantOrders = []
const mOrdId = nextId(1000)
const statuses = ['待付款', '待发货', '待收货', '已完成', '已取消']
const customers = ['大白姐姐', '团子爸爸', '泡芙麻麻', '毛球麻麻', '可乐麻麻', '布丁麻麻', '七喜麻麻', '糯米麻麻']
for (let i = 1; i <= 15; i++) {
  merchantOrders.push({
    id: `PPA202605${String(i).padStart(2, '0')}-${String(mOrdId()).padStart(3, '0')}`,
    customer: customers[i % customers.length],
    total: `¥${(Math.random() * 200 + 20).toFixed(1)}`,
    items: Math.floor(Math.random() * 3) + 1,
    status: statuses[i % statuses.length],
    time: [`${i * 10} 分钟前`, `${i} 小时前`, '昨天', '3 天前'][i % 4],
    img: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/ec5ee2ae3e934ec7b45e52eed03ae4a7.jpg',
  })
}

export function shipOrder(id) {
  const o = merchantOrders.find(o => o.id === id)
  if (o && o.status === '待发货') o.status = '待收货'
  return o
}

// Store settings (mutable)
let storeSettings = {
  name: '宠物食光官方旗舰店',
  logo: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/780130498ee74a7e8482055417afa470.jpg',
  desc: '专注宠物健康食品与用品，所有商品均为正品保障。',
  openTime: '09:00',
  closeTime: '22:00',
  shipping: '满 99 包邮',
}
export function getStoreSettings() { return storeSettings }
export function updateStoreSettings(s) { Object.assign(storeSettings, s); return storeSettings }

// Platform users
export let platformUsers = []
const pUserId = nextId(1)
const userNames = ['元宝麻麻', '大白姐姐', '团子爸爸', '泡芙麻麻', '毛球麻麻', '可乐麻麻', '布丁麻麻', '七喜麻麻', '糯米麻麻', '奶茶麻麻', '豆豆粑粑', '花花姐姐']
for (let i = 0; i < userNames.length; i++) {
  platformUsers.push({
    id: pUserId(),
    name: userNames[i],
    phone: `138****${String(1234 + i * 111).slice(0, 4)}`,
    posts: Math.floor(Math.random() * 300) + 10,
    followers: `${(Math.random() * 15 + 1).toFixed(1)}w`,
    status: i === 3 ? '封禁' : '正常',
    registerTime: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    avatar: `https://picsum.photos/200?random=${i + 1}`,
  })
}

export function toggleUserBan(id) {
  const u = platformUsers.find(u => u.id === id)
  if (u) u.status = u.status === '正常' ? '封禁' : '正常'
  return u
}

export function searchUsers(q) {
  if (!q) return platformUsers
  return platformUsers.filter(u => u.name.includes(q) || u.phone.includes(q))
}

// Platform merchants
export let platformMerchants = []
const pMerId = nextId(1)
const merNames = ['宠物食光官方旗舰店', '喵星人宠物用品', '汪星人百货', '宠物之家', '爱宠驿站', '毛孩子乐园']
for (let i = 0; i < merNames.length; i++) {
  platformMerchants.push({
    id: pMerId(),
    name: merNames[i],
    contact: `138****${String(5678 + i * 222).slice(0, 4)}`,
    products: Math.floor(Math.random() * 100) + 10,
    sales: `¥${(Math.random() * 50 + 1).toFixed(0)}w`,
    status: i < 3 ? '已入驻' : '待审核',
    applyTime: `2026-0${Math.floor(i / 3) + 4}-${String((i % 3) * 10 + 1).padStart(2, '0')}`,
  })
}

export function verifyMerchant(id) {
  const m = platformMerchants.find(m => m.id === id)
  if (m && m.status === '待审核') m.status = '已入驻'
  return m
}

// Platform posts
export let platformPosts = []
const pPostId = nextId(1)
for (let i = 1; i <= 20; i++) {
  platformPosts.push({
    id: pPostId(),
    author: userNames[i % userNames.length],
    title: [`我家毛孩子的日常`, '宠物好物推荐', '养宠经验分享', '带宠出行攻略'][i % 4],
    content: `这是第 ${i} 篇帖子内容，分享我们家的毛孩子日常...`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    status: i === 5 ? '待审核' : (i === 8 ? '已驳回' : '已发布'),
    time: `${i} 小时前`,
    reportCount: Math.floor(Math.random() * 5),
  })
}

export function deletePost(id) {
  platformPosts = platformPosts.filter(p => p.id !== id)
  return platformPosts
}

export function auditPost(id, action) {
  const p = platformPosts.find(p => p.id === id)
  if (p && p.status === '待审核') p.status = action === 'approve' ? '已发布' : '已驳回'
  return p
}

// Platform orders
export let platformOrders = []
const pOrdId = nextId(10000)
for (let i = 1; i <= 20; i++) {
  platformOrders.push({
    id: `ORD${2026050000 + i}`,
    user: userNames[i % userNames.length],
    merchant: merNames[i % merNames.length],
    total: `¥${(Math.random() * 500 + 30).toFixed(1)}`,
    status: ['待付款', '待发货', '待收货', '已完成', '已退款'][i % 5],
    time: `2026-05-${String(i).padStart(2, '0')}`,
    items: Math.floor(Math.random() * 4) + 1,
  })
}

// System settings (mutable)
let sysSettings = {
  siteName: 'PPA 宠物社交平台',
  announcement: '系统将于每周三凌晨 2:00-4:00 进行维护升级。',
  userRegister: true,
  merchantApply: true,
  auditPost: true,
}
export function getSysSettings() { return sysSettings }
export function updateSysSettings(s) { Object.assign(sysSettings, s); return sysSettings }

// Categories & Tags (mutable)
export let categories = [
  { name: '猫粮', parent: '猫' },
  { name: '狗粮', parent: '狗' },
  { name: '零食', parent: '通用' },
  { name: '玩具', parent: '通用' },
  { name: '日用品', parent: '通用' },
  { name: '保健品', parent: '通用' },
]
export function addCategory(c) { categories.push(c); return categories }
export function deleteCategory(name) { categories = categories.filter(c => c.name !== name); return categories }

export let tags = ['猫罐头', '狗粮', '驱虫药', '宠物玩具', '宠物衣服', '美容工具', '宠物推车', '猫砂', '化毛膏', '冻干']
export function addTag(t) { tags.push(t); return tags }
export function deleteTag(t) { tags = tags.filter(tg => tg !== t); return tags }

// Messages
export let messages = []
const msgId = nextId(1)
const msgContents = ['你好，请问这款猫粮有货吗？', '我想咨询一下退换货政策', '什么时候能发货呀？', '这个产品还有优惠活动吗？', '收到货了，质量很好！']
for (let i = 1; i <= 8; i++) {
  messages.push({
    id: msgId(),
    customer: customers[i % customers.length],
    content: msgContents[i % msgContents.length],
    time: `${i * 15} 分钟前`,
    unread: i < 4,
    avatar: `https://picsum.photos/200?random=${i + 20}`,
  })
}
export function markMessageRead(id) {
  const m = messages.find(m => m.id === id)
  if (m) m.unread = false
  return messages
}
export function sendMessageReply(id, reply) {
  const m = messages.find(m => m.id === id)
  if (m) m.reply = reply
  return messages
}

// Reviews
export let reviews = []
const revId = nextId(1)
const reviewContents = ['非常好用，推荐！', '还不错，物流很快', '质量一般般吧', '性价比很高', '包装很好，很满意', '和描述一致', '回购多次了']
for (let i = 1; i <= 10; i++) {
  reviews.push({
    id: revId(),
    customer: customers[i % customers.length],
    product: prodNames[i % prodNames.length],
    content: reviewContents[i % reviewContents.length],
    rating: Math.floor(Math.random() * 2) + 4,
    time: `${i * 3} 天前`,
    reply: i % 3 === 0 ? '感谢您的支持！' : '',
  })
}
export function replyReview(id, reply) {
  const r = reviews.find(r => r.id === id)
  if (r) r.reply = reply
  return reviews
}

// Statistics data
export const statistics = {
  dailyActiveUsers: [846, 1023, 958, 1120, 1342, 1289, 1456],
  dailyOrders: [48, 62, 55, 71, 89, 83, 102],
  dailyRevenue: [12890, 15230, 14800, 18920, 22340, 21560, 26100],
  weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  categoryDistribution: [
    { name: '猫粮', value: 35 },
    { name: '狗粮', value: 25 },
    { name: '零食', value: 18 },
    { name: '玩具', value: 12 },
    { name: '日用品', value: 10 },
  ],
  deviceDistribution: [
    { name: 'iOS', value: 48 },
    { name: 'Android', value: 42 },
    { name: '其他', value: 10 },
  ],
}
