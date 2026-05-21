import express from 'express'
import cors from 'cors'
import { posts, users, products, hotTags } from './data.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase()
  const page = Math.max(1, parseInt(req.query.page) || 1)
  const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize) || 10))

  if (!q) {
    return res.json({ posts: [], users: [], products: [], tags: [], page, pageSize, total: 0 })
  }

  const matchPosts = posts.filter(p =>
    p.content.toLowerCase().includes(q) ||
    p.nickname.toLowerCase().includes(q)
  )
  const matchUsers = users.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.desc.toLowerCase().includes(q)
  )
  const matchProducts = products.filter(p =>
    p.name.toLowerCase().includes(q)
  )
  const matchTags = hotTags.filter(t =>
    t.toLowerCase().includes(q)
  )

  const paginate = (arr) => {
    const start = (page - 1) * pageSize
    return arr.slice(start, start + pageSize)
  }

  res.json({
    posts: paginate(matchPosts),
    users: paginate(matchUsers),
    products: paginate(matchProducts),
    tags: paginate(matchTags),
    page,
    pageSize,
    total: matchPosts.length + matchUsers.length + matchProducts.length + matchTags.length,
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
