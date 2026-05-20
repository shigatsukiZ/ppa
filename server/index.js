import express from 'express'
import cors from 'cors'
import { posts, users, products, hotTags } from './data.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase()
  if (!q) {
    return res.json({ posts: [], users: [], products: [], tags: [] })
  }

  const matchedPosts = posts.filter(p =>
    p.content.toLowerCase().includes(q) ||
    p.nickname.toLowerCase().includes(q)
  )

  const matchedUsers = users.filter(u =>
    u.name.toLowerCase().includes(q) ||
    u.desc.toLowerCase().includes(q)
  )

  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(q)
  )

  const matchedTags = hotTags.filter(t =>
    t.toLowerCase().includes(q)
  )

  res.json({
    posts: matchedPosts,
    users: matchedUsers,
    products: matchedProducts,
    tags: matchedTags,
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
