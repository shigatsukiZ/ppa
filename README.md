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
| `vitest` | ^4.1.7 | devDependency | 单元测试框架 |
| `@vue/test-utils` | — | devDependency | Vue 组件测试工具 |
| `jsdom` | — | devDependency | 浏览器环境模拟 |

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
npm run dev:server   # 或: cd server && npm run dev
# → http://localhost:3001

# 4. 启动前端开发服务器（终端 2）
npm run dev
# → http://localhost:5173

# 5. 构建生产版本
npm run build

# 6. 运行单元测试
npm test
# npm run test:watch  # 监听模式
```

**注意：** 开发时必须同时启动前端 (Vite) 和后端 (Express)，否则商家端/管理端的登录和 API 请求会失败。

---

## 项目结构

```
ppa/
├── index.html                 # 入口 HTML
├── vite.config.js             # Vite 配置（含 /api 代理 → localhost:3001）
├── tailwind.config.js         # Tailwind 配置
├── postcss.config.js
├── vitest.config.js           # Vitest 配置（jsdom 环境）
├── package.json
├── server/
│   ├── index.js               # Express 服务（auth/merchant/admin/search 等全部 API）
│   ├── data.js                # 模拟数据（帖子/用户/商品/商家/订单/分类/标签...）
│   └── package.json
└── src/
    ├── __tests__/
    │   ├── utils.test.js      # 工具函数测试（formatCount/parseCount/paginate/搜索逻辑）
    │   └── BottomNav.test.js  # 组件测试（渲染/显隐）
    ├── main.js                # 应用入口
    ├── App.vue                # 根组件（仅 <router-view />）
    ├── style.css              # 全局样式 + 过渡动画
    ├── stores/
    │   └── auth.js            # 认证状态管理 + API 请求封装
    ├── router/
    │   └── index.js           # 路由定义（Hash 模式，含 PC 端路由）
    ├── layouts/
    │   ├── MerchantLayout.vue # 商家端 PC 布局（侧栏折叠/退出登录）
    │   └── AdminLayout.vue    # 管理端 PC 布局（深色分组导航/退出登录）
    ├── views/
    │   ├── mobile/            # 移动端页面（手机容器展示）
    │   │   ├── Auth.vue       # 登录页（支持测试账号 admin/123456）
    │   │   ├── Home.vue       # 首页（推荐动态流 + 商城 tab）
    │   │   ├── Search.vue     # 搜索 + 推荐 + 热点排行
    │   │   ├── Social.vue     # 发现（附近宠友/专区/互助/朋友）
    │   │   ├── Chat.vue       # 聊天 + 通知（双 Tab）
    │   │   ├── ChatDetail.vue # 聊天详情
    │   │   ├── Profile.vue    # 用户主页
    │   │   ├── Detail.vue     # 帖子详情
    │   │   ├── ProductDetail.vue
    │   │   ├── Cart.vue       # 购物车
    │   │   ├── Payment.vue    # 支付（写入 localStorage）
    │   │   ├── PostEdit.vue   # 发布帖子
    │   │   ├── Order.vue      # 订单详情
    │   │   ├── OrderList.vue  # 订单列表
    │   │   ├── OrderDetail.vue
    │   │   ├── Location.vue   # 位置（腾讯地图占位）
    │   │   ├── Setting.vue    # 账号安全
    │   │   ├── Settings.vue   # 设置页（主页风格）
    │   │   ├── ProfileEdit.vue
    │   │   ├── NotificationSettings.vue
    │   │   ├── PrivacySettings.vue
    │   │   ├── HelpFeedback.vue
    │   │   ├── Favorites.vue  # 我的收藏
    │   │   ├── UserDetail.vue
    │   │   ├── Mall.vue       # 商城入口
    │   │   ├── HelpList.vue   # 互助列表
    │   │   └── HelpDetail.vue # 互助详情
    │   ├── merchant/          # 商家端 PC 页面
    │   │   ├── Login.vue      # 商家登录（merchant / 123456）
    │   │   ├── Dashboard.vue  # 数据概览
    │   │   ├── ProductList.vue# 商品管理（上下架/编辑）
    │   │   ├── OrderList.vue  # 订单管理（筛选/发货）
    │   │   ├── MessageList.vue# 客户消息（回复）
    │   │   ├── ReviewList.vue # 评价管理（回复）
    │   │   └── StoreSettings.vue # 店铺设置
    │   └── admin/             # 管理端 PC 页面
    │       ├── Login.vue      # 管理员登录（admin / admin123）
    │       ├── Dashboard.vue  # 平台仪表盘
    │       ├── UserList.vue   # 用户管理（搜索/封禁）
    │       ├── MerchantList.vue # 商家管理（审核）
    │       ├── ProductAudit.vue # 商品审核（通过/下架）
    │       ├── PostList.vue   # 帖子管理（审核/删除）
    │       ├── OrderList.vue  # 全平台订单
    │       ├── Statistics.vue # 数据统计（7日趋势/分布图）
    │       └── SystemSettings.vue # 系统设置（分类/标签 CRUD）
    └── components/
        ├── BottomNav.vue      # 底部导航
        ├── Sidebar.vue        # 侧边抽屉
        ├── PostCard.vue       # 帖子卡片
        └── WalkCard.vue       # 约遛组件
```

---

## 路由表

| 路径 | 视图 | 说明 |
|------|------|------|
| `/` | — | 重定向到 `/auth` |
| `/auth` | Auth | 登录/注册（测试账号 admin/123456） |
| `/home` | Home | 首页（推荐动态流 + 商城 tab） |
| `/search` | Search | 搜索 + 推荐 + 热点 |
| `/social` | Social | 发现（附近宠友/专区/互助） |
| `/chat` | Chat | 聊天列表 + 通知 Tab |
| `/chat/:name` | ChatDetail | 与指定用户的聊天详情 |
| `/profile/:name` | Profile | 指定用户的个人主页 |
| `/detail` | Detail | 帖子详情 |
| `/product/:id` | ProductDetail | 商品详情 |
| `/cart` | Cart | 购物车 |
| `/payment` | Payment | 支付 |
| `/post-edit` | PostEdit | 发布新帖子 |
| `/order` | Order | 订单详情（支付成功态） |
| `/orders` | OrderList | 订单列表 |
| `/order-detail/:orderNum` | OrderDetail | 订单详情（从列表进入） |
| `/location` | Location | 附近位置（腾讯地图） |
| `/setting` | Setting | 账号安全设置 |
| `/settings` | Settings | 设置页 |
| `/profile-edit` | ProfileEdit | 编辑个人资料 |
| `/notification-settings` | NotificationSettings | 消息通知设置 |
| `/privacy-settings` | PrivacySettings | 隐私设置 |
| `/help-feedback` | HelpFeedback | 帮助与反馈 |
| `/favorites` | Favorites | 我的收藏 |
| `/user` | UserDetail | 用户详情页 |

### 商家端路由（PC）

| 路径 | 说明 |
|------|------|
| `/merchant` | 重定向到 `/merchant/dashboard` |
| `/merchant/dashboard` | 数据概览 |
| `/merchant/products` | 商品管理 |
| `/merchant/orders` | 订单管理 |
| `/merchant/messages` | 客户消息 |
| `/merchant/reviews` | 评价管理 |
| `/merchant/settings` | 店铺设置 |

测试账号：`merchant` / `123456`

### 管理端路由（PC）

| 路径 | 说明 |
|------|------|
| `/admin` | 重定向到 `/admin/dashboard` |
| `/admin/dashboard` | 平台仪表盘 |
| `/admin/users` | 用户管理 |
| `/admin/merchants` | 商家管理 |
| `/admin/product-audit` | 商品审核 |
| `/admin/posts` | 帖子管理 |
| `/admin/orders` | 全平台订单 |
| `/admin/statistics` | 数据统计 |
| `/admin/settings` | 系统设置 |

测试账号：`admin` / `admin123`

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

后端 Express 服务运行在 `localhost:3001`，Vite 开发服务器代理 `/api` 请求。

### 认证

| 方法 | 路径 | 说明 | 测试账号 |
|------|------|------|----------|
| POST | `/api/auth/merchant/login` | 商家端登录 | `merchant` / `123456` |
| POST | `/api/auth/admin/login` | 管理端登录 | `admin` / `admin123` |

**请求体：** `{ "username": "merchant", "password": "123456" }`

**成功响应：** `{ "token": "mock-merchant-token-1", "merchant": { "id": 1, "name": "...", ... } }`

**失败响应：** `{ "error": "用户名或密码错误" }`

### 商家端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/merchant/dashboard` | 数据概览（销售额/订单/访客/商品数 + 近期待处理 + 热销 Top 3） |
| GET | `/api/merchant/products` | 商品列表（支持 `?status=上架&q=关键词` 筛选） |
| POST | `/api/merchant/products` | 添加商品 |
| PUT | `/api/merchant/products/:id` | 更新商品（上下架） |
| GET | `/api/merchant/orders` | 订单列表（支持 `?status=待发货` 筛选） |
| PUT | `/api/merchant/orders/:id/ship` | 发货操作 |
| GET | `/api/merchant/messages` | 客户消息列表 |
| PUT | `/api/merchant/messages/:id/read` | 标记消息已读 |
| POST | `/api/merchant/messages/:id/reply` | 回复消息 |
| GET | `/api/merchant/reviews` | 评价列表 |
| POST | `/api/merchant/reviews/:id/reply` | 回复评价 |
| GET | `/api/merchant/settings` | 获取店铺设置 |
| PUT | `/api/merchant/settings` | 更新店铺设置 |

### 管理端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/admin/dashboard` | 平台仪表盘（DAU/商家/商品/交易额 + 最新动态） |
| GET | `/api/admin/users` | 用户列表（支持 `?q=关键词` 搜索） |
| PUT | `/api/admin/users/:id/ban` | 封禁/解封用户 |
| GET | `/api/admin/merchants` | 商家列表（支持 `?status=待审核` 筛选） |
| PUT | `/api/admin/merchants/:id/verify` | 审核通过商家入驻 |
| GET | `/api/admin/products` | 商品列表（审核用） |
| PUT | `/api/admin/products/:id/audit` | 审核商品（通过/下架） |
| GET | `/api/admin/posts` | 帖子列表（支持 `?status=待审核` 筛选） |
| PUT | `/api/admin/posts/:id/audit` | 审核帖子（approve/reject） |
| DELETE | `/api/admin/posts/:id` | 删除帖子 |
| GET | `/api/admin/orders` | 全平台订单（支持 `?status=待付款` 筛选） |
| GET | `/api/admin/statistics` | 数据统计（7日趋势/分类分布/设备分布） |
| GET | `/api/admin/settings` | 获取系统设置 |
| PUT | `/api/admin/settings` | 更新系统设置 |
| GET | `/api/admin/categories` | 获取分类列表 |
| POST | `/api/admin/categories` | 添加分类 |
| DELETE | `/api/admin/categories/:name` | 删除分类 |
| GET | `/api/admin/tags` | 获取标签列表 |
| POST | `/api/admin/tags` | 添加标签 |
| DELETE | `/api/admin/tags/:tag` | 删除标签 |

### 搜索 API

`GET /api/search?q={keyword}&page={page}&pageSize={pageSize}`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `q` | — | 搜索关键词（必填） |
| `page` | 1 | 页码，从 1 开始 |
| `pageSize` | 10 | 每页条数，最大 50 |

**请求示例：**

```
GET /api/search?q=元宝&page=1&pageSize=10
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

返回 4 类结果分别分页；`q` 为空时返回空数组及 `page`/`pageSize`/`total` 元信息。

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
- 所有 API 使用静态模拟数据，无真实数据库（数据流向：`server/data.js` → Express → fetch → Vue）
- 用户认证为前端模拟，无真实 JWT / Session 验证
- 图片资源均来自 picsum.photos 和 modao.cc 在线服务
- 购物支付为模拟（1.8s 延时），无真实网关对接
- 订单数据存储在 `localStorage.ppa_orders`，仅模拟当前用户「元宝麻麻」
- 商家端和管理端需**同时启动 API 服务器**才能登录及使用功能

---

## 后续规划

- [ ] 替换腾讯地图 API Key
- [ ] 对接真实登录/验证码/支付 API
- [ ] 扩展 Tailwind 主题色配置
- [ ] 添加更多单元测试（Vitest）—— 现有 19 个测试通过
- [ ] 订单系统接入真实后端
