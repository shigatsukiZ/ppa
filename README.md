# PPA (Pet Partner App) — 宠物社交平台原型

基于 **Vue 3 (Composition API) + Vite + Tailwind CSS** 构建的宠物主题移动端 SPA 原型，模拟手机容器展示，包含社交动态、即时聊天、搜索发现、商城购物、支付流程、账号管理等模块，配套 Express 搜索 API 服务。

---

## 运行环境要求

| 依赖 | 最低版本 | 说明 |
|------|----------|------|
| Node.js | >= 18 | 运行前端构建与后端服务 |
| npm | >= 9 | 包管理 |
| 现代浏览器 | Chrome / Edge / Firefox 最新版 | 支持 ES Module 和 CSS Grid |
| 操作系统 | macOS / Windows / Linux 均可 | 跨平台 |

---

## 第三方依赖清单

### 前端运行时

| 包名 | 版本 | 类型 | 用途 |
|------|------|------|------|
| `vue` | ^3.5.34 | dependency | 前端框架（Composition API, `<script setup>`） |
| `vue-router` | ^4.6.4 | dependency | 路由管理（Hash 模式） |
| `iconify-icon` | 2.3.0 | CDN | 图标库（Solar 系列，通过 `<script>` 标签引入） |

### 前端开发/构建工具

| 包名 | 版本 | 类型 | 用途 |
|------|------|------|------|
| `vite` | ^8.0.12 | devDependency | 构建工具与开发服务器 |
| `@vitejs/plugin-vue` | ^6.0.6 | devDependency | Vite Vue 3 插件 |
| `tailwindcss` | ^3.4.19 | devDependency | CSS 工具类框架 |
| `postcss` | ^8.5.14 | devDependency | CSS 后处理（Tailwind 依赖） |
| `autoprefixer` | ^10.5.0 | devDependency | CSS 浏览器前缀自动添加 |

### 后端服务

| 包名 | 版本 | 类型 | 用途 |
|------|------|------|------|
| `express` | ^4.21.0 | dependency | HTTP 服务框架 |
| `cors` | ^2.8.5 | dependency | 跨域资源共享中间件 |

### 在线资源（外部服务）

| 资源 | 用途 | 说明 |
|------|------|------|
| picsum.photos | 用户头像占位图 | 在线随机图片服务 |
| modao.cc | 宠物/帖子示例图片 | AI 生成图片 |
| 腾讯地图 JavaScript API | 位置页地图展示 | 需替换 `YOUR_TENCENT_MAP_KEY` |

---

## 快速启动

```bash
# 1. 安装前端依赖
npm install

# 2. 安装后端依赖
cd server && npm install && cd ..

# 3. 启动后端 API（终端 1）
cd server && npm start
# → http://localhost:3001

# 4. 启动前端开发服务器（终端 2）
npm run dev
# → http://localhost:5173

# 5. 构建生产版本
npm run build
```

---

## 项目结构

```
ppa/
├── index.html                 # 入口 HTML
├── vite.config.js             # Vite 配置（含 /api 代理）
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js
├── package.json
├── server/
│   ├── index.js               # Express 服务入口（GET /api/search）
│   ├── data.js                # 模拟数据（帖子/用户/商品/标签）
│   └── package.json
└── src/
    ├── main.js                # 应用入口
    ├── App.vue                # 根组件（仅 <router-view />）
    ├── style.css              # 全局样式 + 过渡动画
    ├── router/
    │   └── index.js           # 路由定义（Hash 模式）
    ├── views/
    │   ├── Auth.vue           # 登录页（支持测试账号 admin/123456）
    │   ├── Home.vue           # 首页（推荐动态流 + 商城 tab：轮播/分类筛选/12商品网格）
    │   ├── Search.vue         # 搜索 + 推荐 + 热点排行
    │   ├── Social.vue         # 发现（附近宠友/专区/互助/你可能认识的朋友）
    │   ├── Chat.vue           # 聊天 + 通知（双 Tab，支持 ?tab=notif 参数）
    │   ├── ChatDetail.vue     # 聊天详情（微信风格气泡）
    │   ├── Profile.vue        # 用户主页
    │   ├── Detail.vue         # 帖子详情（评论区）
    │   ├── ProductDetail.vue  # 商品详情（图片轮播/参数/评价/加购）
    │   ├── Cart.vue           # 购物车（勾选/数量/结算）
    │   ├── Payment.vue        # 支付（微信支付/支付宝，写入 localStorage）
    │   ├── PostEdit.vue       # 发布帖子
    │   ├── Order.vue          # 订单详情（支付成功态）
    │   ├── OrderList.vue      # 订单列表（状态筛选）
    │   ├── OrderDetail.vue    # 订单详情（从列表进入，关联 userId）
    │   ├── Location.vue       # 位置（腾讯地图占位）
    │   ├── Setting.vue        # 账号安全（手机绑定/设备管理/注销）
    │   ├── Settings.vue       # 设置页（主页风格，含各子设置入口）
    │   ├── ProfileEdit.vue    # 编辑个人资料
    │   ├── NotificationSettings.vue # 消息通知设置（开关控制）
    │   ├── PrivacySettings.vue      # 隐私设置
    │   ├── HelpFeedback.vue   # 帮助与反馈（FAQ + 意见提交）
    │   ├── Favorites.vue      # 我的收藏（2 列商品网格）
    │   └── UserDetail.vue     # 用户详情页
    └── components/
        ├── BottomNav.vue      # 底部导航（5项，滚动方向控制显隐）
        ├── Sidebar.vue        # 侧边抽屉（用户信息/宠物档案/动态添加切换）
        ├── PostCard.vue       # 帖子卡片（评论/转发浮窗，广告→商品详情）
        └── WalkCard.vue       # 约遛组件（加入/去地图）
```

---

## 路由表

| 路径 | 视图 | 说明 |
|------|------|------|
| `/` | — | 重定向到 `/auth` |
| `/auth` | Auth | 登录/注册（测试账号 admin/123456） |
| `/home` | Home | 首页（推荐动态流 + 商城 tab，支持 `?tab=mall` 参数） |
| `/search` | Search | 搜索 + 推荐 + 热点 |
| `/social` | Social | 发现（附近宠友/专区/互助） |
| `/chat` | Chat | 聊天列表 + 通知 Tab（支持 `?tab=notif` 参数） |
| `/chat/:name` | ChatDetail | 与指定用户的聊天详情 |
| `/profile/:name` | Profile | 指定用户的个人主页 |
| `/detail` | Detail | 帖子详情（评论区） |
| `/product/:id` | ProductDetail | 商品详情（轮播/参数/评价/加购） |
| `/cart` | Cart | 购物车（勾选/数量/结算） |
| `/payment` | Payment | 支付（微信支付/支付宝） |
| `/post-edit` | PostEdit | 发布新帖子 |
| `/order` | Order | 订单详情（支付成功态） |
| `/orders` | OrderList | 订单列表（状态筛选） |
| `/order-detail/:orderNum` | OrderDetail | 订单详情（从列表进入） |
| `/location` | Location | 附近位置（腾讯地图） |
| `/setting` | Setting | 账号安全设置 |
| `/settings` | Settings | 设置页（主页风格） |
| `/profile-edit` | ProfileEdit | 编辑个人资料 |
| `/notification-settings` | NotificationSettings | 消息通知设置 |
| `/privacy-settings` | PrivacySettings | 隐私设置 |
| `/help-feedback` | HelpFeedback | 帮助与反馈 |
| `/favorites` | Favorites | 我的收藏 |
| `/user` | UserDetail | 用户详情页 |

---

## 组件文档

### BottomNav.vue

底部固定导航栏，5 个入口：首页 / 搜索 / **发布(+)** / 发现 / 聊天。

- 发布按钮居中放大，粉底白字圆形，非 `-mt-4` 上移方案
- 整体 `rounded-[28px]` 四角圆角 + `border` 浮动效果
- 当前路由高亮（使用 `router.currentRoute`）
- 支持 `:hidden` prop，所有页面统一「上滑浮出，下滑隐藏」
- `transition-transform duration-300` 平滑过渡

### Sidebar.vue

从左侧滑入的抽屉面板。

- 用户头像及信息区域点击跳转 `/user`
- 宠物卡片容器支持 `snap-x snap-mandatory` 平滑吸附 + 鼠标拖拽滚动
- 点击「添加」动态新增宠物卡片
- 点击「点击切换」将该卡设为当前身份（高亮）
- 我的订单 → `/orders` | 我的收藏 → `/favorites` | 消息中心 → `/chat?tab=notif` | 账号安全 → `/setting`
- 「元宝的专属好物」商品点击 → `/product/:id`

### WalkCard.vue

约遛活动卡片，内嵌于 PostCard 中取代位置行。

- 显示标题/地点/时间/发起人/距离
- 「加入」按钮 → `emit('join')`
- 「去地图」按钮 → `emit('view-map')`
- 加入后状态切换为「已加入 ✓」

---

## API 文档

### `GET /api/search?q={keyword}`

搜索接口，由 Express 服务运行在 `localhost:3001`，Vite 开发服务器代理 `/api` 请求。

**请求示例：**

```
GET /api/search?q=元宝
```

**响应格式：**

```json
{
  "posts": [
    {
      "id": 1,
      "nickname": "元宝麻麻",
      "avatar": "https://...",
      "time": "2026.04.28 · 上海",
      "content": "今天元宝学会了握手！...",
      "images": ["https://..."],
      "likes": "1.2k",
      "comments": "48",
      "views": "5.6k",
      "hasBadge": true
    }
  ],
  "users": [
    { "name": "泡芙麻麻", "desc": "布偶猫日常 ...", "avatar": "https://...", "followers": "12.3w" }
  ],
  "products": [
    { "name": "高钙羊乳肉垫冻干", "price": "29.9", "sales": "2k+", "tag": "自营" }
  ],
  "tags": ["猫罐头", "狗粮"]
}
```

**搜索逻辑（服务端筛选）：**

| 字段 | 匹配对象 | 匹配字段 |
|------|----------|----------|
| `posts` | 帖子数据 | content, nickname |
| `users` | 用户数据 | name, desc |
| `products` | 商品数据 | name |
| `tags` | 热搜标签 | 标签名称 |

返回 4 类结果分别分页；`q` 为空时返回全部空数组。

---

## 数据流 & 存储设计

### localStorage 键

| Key | 用途 | 格式 |
|-----|------|------|
| `ppa_chats` | 聊天列表（预置 + 关注用户合并） | `[{name, avatar, preview, time, unread}]` |
| `ppa_draft` | 发布草稿 | `{content, images}` |
| `ppa_new_posts` | 新增帖子数据 | `[{content, images, ...}]` |
| `ppa_orders` | 订单列表（关联 userId） | `[{userId, orderNum, name, price, status, time, ...}]` |
| `payTotal` (session) | 支付金额 | `"388.0"` |
| `cartItems` (session) | 购物车结算商品 | `[{id, name, price, qty, img}]` |
| `orderInfo` (session) | 订单信息 | `{name, spec, qty, price, total, img, orderNum}` |

### 聊天数据流

1. 页面初始化时加载 `defaultChats`（预置聊天项）
2. 从 localStorage `ppa_chats` 恢复已关注用户
3. 合并去重后渲染聊天列表
4. 搜索页点击「关注」→ `localStorage.ppa_chats` 追加 → 跳转 ChatDetail

### 购物支付流程

1. 商城 tab → 商品网格 / 广告帖点击 → `/product/:id`
2. ProductDetail「加入购物车」→ 本地计数，「立即购买」→ sessionStorage → `/payment`
3. Cart 结算 → sessionStorage `cartItems` + `payTotal` → `/payment`
4. Payment 选择微信/支付宝 → 确认支付（模拟 1.8s）→ 写入 `localStorage.ppa_orders`（关联 userId）→ `/order`
5. Order 展示支付成功状态 + 订单详情
6. 侧栏「我的订单」→ `/orders`（状态筛选列表）→ 点击 → `/order-detail/:orderNum`

### 路由策略

- 使用 `createWebHashHistory`，URL 格式为 `/#/path`
- 组件内导航使用 `router.push('/path')`

---

## 设计约定

| 约定 | 标准值 |
|------|--------|
| 手机容器 | `w-[375px] h-[812px] rounded-[40px] overflow-hidden border-[8px] border-white` |
| 弹窗背景遮罩 | `.overlay` class: `fixed inset-0 bg-black bg-opacity-40` |
| 底部弹出面板 | `.sheet` class: `rounded-[32px]` 四角圆角 |
| 矩形元素圆角 | 统一四角圆角（无单角特殊处理） |
| 卡片阴影 | `.creamy-shadow`: `0 4px 15px rgba(255, 133, 162, 0.15)` |
| 主色调 | 粉色 `#FF85A2`、深褐 `#5D4037`、浅蓝 `#A7C7E7` |
| 底部栏显隐 | `transition-transform duration-300` + `translate-y-full` / `translate-y-0` |
| 购物支付 | sessionStorage 跨页传递数据，模拟支付 1.8s 延时 |

---

## 已知限制

- 腾讯地图 API Key 为占位符 `YOUR_TENCENT_MAP_KEY`，需替换真实密钥
- 后端 API 使用静态模拟数据，无真实数据库
- 搜索接口仅支持单关键词匹配，不支持分页
- 用户认证为前端模拟（admin/123456 预设账号），无真实登录验证
- 图片资源均来自 picsum.photos 和 modao.cc 在线服务
- 购物支付为模拟（1.8s 延时），无真实网关对接
- 订单数据存储在 localStorage，仅模拟当前用户「元宝麻麻」

---

## 后续规划

- [ ] 替换腾讯地图 API Key
- [ ] 对接真实登录/验证码/支付 API
- [ ] 搜索接口增加分页参数
- [ ] 扩展 Tailwind 主题色配置
- [ ] 添加单元测试（Vitest）
- [ ] 订单系统接入真实后端
