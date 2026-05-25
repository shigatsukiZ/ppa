import express from 'express'
import cors from 'cors'
import {
  posts, users, products, hotTags,
  merchants, admins,
  merchantProducts, addMerchantProduct, updateMerchantProduct,
  merchantOrders, shipOrder,
  getStoreSettings, updateStoreSettings,
  platformUsers, toggleUserBan, searchUsers,
  platformMerchants, verifyMerchant,
  platformPosts, deletePost, auditPost,
  platformOrders,
  getSysSettings, updateSysSettings,
  categories, addCategory, deleteCategory,
  tags, addTag, deleteTag,
  messages, markMessageRead, sendMessageReply,
  reviews, replyReview,
  statistics,
} from './data.js'

const app = express()
app.use(cors())
app.use(express.json())

// ===== Auth =====
app.post('/api/auth/merchant/login', (req, res) => {
  const { username, password } = req.body
  const merchant = merchants.find(m => m.username === username && m.password === password)
  if (!merchant) return res.status(401).json({ error: '用户名或密码错误' })
  const { password: _, ...safe } = merchant
  res.json({ token: 'mock-merchant-token-' + merchant.id, merchant: safe })
})

app.post('/api/auth/admin/login', (req, res) => {
  const { username, password } = req.body
  const admin = admins.find(a => a.username === username && a.password === password)
  if (!admin) return res.status(401).json({ error: '用户名或密码错误' })
  const { password: _, ...safe } = admin
  res.json({ token: 'mock-admin-token-' + admin.id, admin: safe })
})

// ===== Merchant: Dashboard =====
app.get('/api/merchant/dashboard', (req, res) => {
  const totalSales = merchantProducts.reduce((s, p) => s + p.price * p.sales, 0)
  const todayOrders = merchantOrders.filter(o => o.status !== '已取消')
  res.json({
    stats: [
      { label: '今日销售额', value: `¥${totalSales.toLocaleString()}`, change: '+15.3%', up: true },
      { label: '今日订单数', value: String(todayOrders.length), change: '+8.2%', up: true },
      { label: '访客数', value: '1,256', change: '+22.1%', up: true },
      { label: '商品总数', value: String(merchantProducts.length), change: '0%', up: true },
    ],
    recentOrders: merchantOrders.slice(0, 4),
    topProducts: [...merchantProducts].sort((a, b) => b.sales - a.sales).slice(0, 3).map(p => ({
      name: p.name, sales: p.sales, revenue: `¥${(p.price * p.sales).toLocaleString()}`,
    })),
  })
})

// ===== Merchant: Products =====
app.get('/api/merchant/products', (req, res) => {
  const { status, q } = req.query
  let result = [...merchantProducts]
  if (status) result = result.filter(p => p.status === status)
  if (q) result = result.filter(p => p.name.includes(q))
  res.json(result)
})

app.post('/api/merchant/products', (req, res) => {
  const product = addMerchantProduct(req.body)
  res.json(product)
})

app.put('/api/merchant/products/:id', (req, res) => {
  const product = updateMerchantProduct(Number(req.params.id), req.body)
  if (!product) return res.status(404).json({ error: '商品不存在' })
  res.json(product)
})

// ===== Merchant: Orders =====
app.get('/api/merchant/orders', (req, res) => {
  const { status } = req.query
  let result = [...merchantOrders]
  if (status && status !== '全部') result = result.filter(o => o.status === status)
  result.sort((a, b) => b.id.localeCompare(a.id))
  res.json(result)
})

app.put('/api/merchant/orders/:id/ship', (req, res) => {
  const order = shipOrder(req.params.id)
  if (!order) return res.status(404).json({ error: '订单不存在' })
  res.json(order)
})

// ===== Merchant: Store Settings =====
app.get('/api/merchant/settings', (req, res) => {
  res.json(getStoreSettings())
})

app.put('/api/merchant/settings', (req, res) => {
  res.json(updateStoreSettings(req.body))
})

// ===== Merchant: Messages =====
app.get('/api/merchant/messages', (req, res) => {
  res.json(messages)
})

app.put('/api/merchant/messages/:id/read', (req, res) => {
  res.json(markMessageRead(Number(req.params.id)))
})

app.post('/api/merchant/messages/:id/reply', (req, res) => {
  res.json(sendMessageReply(Number(req.params.id), req.body.reply))
})

// ===== Merchant: Reviews =====
app.get('/api/merchant/reviews', (req, res) => {
  res.json(reviews)
})

app.post('/api/merchant/reviews/:id/reply', (req, res) => {
  res.json(replyReview(Number(req.params.id), req.body.reply))
})

// ===== Admin: Auth =====
app.get('/api/admin/check', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token?.startsWith('mock-admin-token-')) return res.status(401).json({ error: '未登录' })
  const admin = admins[0]
  res.json({ admin })
})

// ===== Admin: Dashboard =====
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    stats: [
      { label: 'DAU', value: '12,846', change: '+8.3%', color: 'text-blue-500' },
      { label: '商家数', value: String(platformMerchants.length), change: '+12.5%', color: 'text-green-500' },
      { label: '商品数', value: String(merchantProducts.length), change: '+5.7%', color: 'text-purple-500' },
      { label: '交易额(日)', value: '¥89,230', change: '+15.2%', color: 'text-[#FF85A2]' },
    ],
    recentActivity: [
      { user: platformUsers[0]?.name || '用户', action: '注册了新账号', time: '2 分钟前' },
      { user: platformUsers[1]?.name || '用户', action: '发布了一篇帖子', time: '5 分钟前' },
      { user: platformUsers[2]?.name || '用户', action: '提交了一笔订单', time: '12 分钟前' },
      { user: merchants[0]?.name || '商家', action: '上架了 3 件商品', time: '20 分钟前' },
    ],
  })
})

// ===== Admin: Users =====
app.get('/api/admin/users', (req, res) => {
  const { q } = req.query
  res.json(q ? searchUsers(q) : platformUsers)
})

app.put('/api/admin/users/:id/ban', (req, res) => {
  const user = toggleUserBan(Number(req.params.id))
  if (!user) return res.status(404).json({ error: '用户不存在' })
  res.json(user)
})

// ===== Admin: Merchants =====
app.get('/api/admin/merchants', (req, res) => {
  const { status } = req.query
  let result = [...platformMerchants]
  if (status) result = result.filter(m => m.status === status)
  res.json(result)
})

app.put('/api/admin/merchants/:id/verify', (req, res) => {
  const merchant = verifyMerchant(Number(req.params.id))
  if (!merchant) return res.status(404).json({ error: '商家不存在' })
  res.json(merchant)
})

// ===== Admin: Product Audit =====
app.get('/api/admin/products', (req, res) => {
  const { status } = req.query
  let result = [...merchantProducts]
  if (status) result = result.filter(p => p.status === status)
  res.json({ products: result, total: result.length })
})

app.put('/api/admin/products/:id/audit', (req, res) => {
  const product = updateMerchantProduct(Number(req.params.id), req.body)
  res.json(product)
})

// ===== Admin: Posts =====
app.get('/api/admin/posts', (req, res) => {
  const { status } = req.query
  let result = [...platformPosts]
  if (status) result = result.filter(p => p.status === status)
  res.json(result)
})

app.delete('/api/admin/posts/:id', (req, res) => {
  res.json(deletePost(Number(req.params.id)))
})

app.put('/api/admin/posts/:id/audit', (req, res) => {
  const post = auditPost(Number(req.params.id), req.body.action)
  if (!post) return res.status(404).json({ error: '帖子不存在' })
  res.json(post)
})

// ===== Admin: Orders =====
app.get('/api/admin/orders', (req, res) => {
  const { status } = req.query
  let result = [...platformOrders]
  if (status) result = result.filter(o => o.status === status)
  res.json(result)
})

// ===== Admin: Statistics =====
app.get('/api/admin/statistics', (req, res) => {
  res.json(statistics)
})

// ===== Admin: System Settings =====
app.get('/api/admin/settings', (req, res) => {
  res.json(getSysSettings())
})

app.put('/api/admin/settings', (req, res) => {
  res.json(updateSysSettings(req.body))
})

// ===== Admin: Categories =====
app.get('/api/admin/categories', (req, res) => {
  res.json(categories)
})

app.post('/api/admin/categories', (req, res) => {
  const { name, parent } = req.body
  if (!name) return res.status(400).json({ error: '分类名称不能为空' })
  res.json(addCategory({ name, parent: parent || '通用' }))
})

app.delete('/api/admin/categories/:name', (req, res) => {
  res.json(deleteCategory(req.params.name))
})

// ===== Admin: Tags =====
app.get('/api/admin/tags', (req, res) => {
  res.json(tags)
})

app.post('/api/admin/tags', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: '标签名称不能为空' })
  res.json(addTag(name))
})

app.delete('/api/admin/tags/:tag', (req, res) => {
  res.json(deleteTag(req.params.tag))
})

// ===== Original Search =====
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase()
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 10))

  if (!q) {
    return res.json({ posts: [], users: [], products: [], tags: [], page, pageSize, total: 0 })
  }

  const matchPosts = posts.filter(p =>
    p.content.toLowerCase().includes(q) || p.nickname.toLowerCase().includes(q)
  )
  const matchUsers = users.filter(u =>
    u.name.toLowerCase().includes(q) || u.desc.toLowerCase().includes(q)
  )
  const matchProducts = products.filter(p => p.name.toLowerCase().includes(q))
  const matchTags = hotTags.filter(t => t.toLowerCase().includes(q))

  const paginate = (arr, start, size) => arr.slice(start, start + size)
  const start = (page - 1) * pageSize

  res.json({
    posts: paginate(matchPosts, start, pageSize),
    users: paginate(matchUsers, start, pageSize),
    products: paginate(matchProducts, start, pageSize),
    tags: paginate(matchTags, start, pageSize),
    page, pageSize,
    total: matchPosts.length + matchUsers.length + matchProducts.length + matchTags.length,
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
