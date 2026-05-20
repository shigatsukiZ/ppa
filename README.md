###### Goal

- 基于Vue 3 SPA完成宠物社交App原型，包含搜索API、用户主页、聊天详情、侧边栏交互，并完善圆角一致性。
Constraints & Preferences
- 新增路由：/profile/:name（用户主页）、/chat/:name（聊天详情）。
- 搜索接入后端API（GET /api/search?q=），Vite代理到 localhost:3001。
- 搜索页的推荐/热点tab、聊天页tab、通知页tab全部可切换。
- 底部栏5项（首页/搜索/+发布/发现/聊天），发布按钮居中突出显示（粉色圆形+白色+号，无-mt-4上移）。
- 底部栏四角圆角（rounded-[28px] + px-3 pb-3浮动）。
- 所有矩形元素均使用四角圆角（移除ChatDetail单角rounded-br-[4px]/rounded-bl-[4px]）。
- 多图片网格每张图独立rounded-xl圆角。
- 侧边栏头像改为圆形（rounded-full）。

  ###### Progress

  ###### Done
- 搜索框功能化：点击展开为真实 <input> + 取消按钮，Enter触发API搜索，结果分帖子/用户/商品/标签四类展示。
- 创建 server/ 后端：Express + CORS + 模拟数据（帖子/用户/商品/热搜标签），GET /api/search?q= 返回筛选结果，Vite proxy /api → localhost:3001。
- 新增路由：/profile/:name（Profile.vue）、/chat/:name（ChatDetail.vue）。
- 创建 Profile.vue：可复用用户主页（头像/简介/粉丝数/帖子数 + 帖子/动态/赞过tab + 发消息/关注按钮）。
- 创建 ChatDetail.vue：微信风格聊天页（灰色背景、左右气泡对齐、自动回复、底部输入条 + 发送按钮）。
- 搜索页推荐内容（4条卡片）→ 点击 /detail；用户行（推荐关注 + 搜索结果）→ 点击 Profile。
- 搜索页「关注」按钮 → 添加至 localStorage ppa_chats + 跳转 ChatDetail。
- Chat.vue 合并通知：标题栏改为「聊天/通知」双tab切换，通知tab展示5条模拟通知。
- Chat.vue 搜索改为切换模式，仅过滤当前聊天列表（name + preview）。
- Chat.vue 聊天项可点击 → 打开 /chat/:name ChatDetail。
- Chat.vue 初始化合并 defaultChats + localStorage 已关注用户。
- 移除 Home.vue / Search.vue 独立FAB浮动按钮。
- 移除BottomNav通知角标和红点，改为5项（home/search/+/social/chat）。
- 发布按钮居中放大：粉色bg-[#FF85A2]圆形 + <span>+</span>白色大号文字（替换iconify-icon），移除 -mt-4，水平垂直居中。
- BottomNav改为rounded-[28px]四角圆角 + px-3 pb-3 + 内嵌shadow + border浮动底栏。
- PostCard多图片网格每张图独立rounded-xl overflow-hidden，单张 col-span-2 全宽。
- PostCard新增avatar-click emit，Home.vue处理跳转 /profile/:name；头像和昵称均变为可点击。
- ChatDetail聊天气泡改为 rounded-[18px] 四角圆角，移除单角特殊处理。
- Home.vue手机容器新增 overflow-hidden（此前缺少导致圆角未裁剪内容）。
- Profile.vue手机容器改为 overflow-hidden + 内部 <main class="flex-1 overflow-y-auto">。
- Search.vue「热点」tab展示站内Top 10热帖排行（序号/头像/内容/互动数据/热度值），前3名粉色高亮。
- Setting.vue页面可交互（待完善具体交互逻辑）。
- Sidebar.vue头像改为 rounded-full 圆形。
- Sidebar.vue「我的宠物档案」可点击交互（待完善跳转目标）。

  ###### In Progress
- (none)

  ###### Blocked
- 腾讯地图 API 密钥为占位符（YOUR_TENCENT_MAP_KEY），需替换为真实密钥。
- 后端API仅含模拟数据，无真实数据库。
Key Decisions
- 关注/聊天列表通过 localStorage 存储合并，无需后端即可演示交互流程。
- 发布按钮使用 <span>+</span> 纯文本代替 iconify-icon，避免图标加载问题。
- 手机容器统一加 overflow-hidden 确保 rounded-[40px] 正确裁剪内容。
- 「热点」使用前端静态数据而非API，减少依赖。
- 搜索API使用模拟数据服务端，通过代理转发，便于后续对接真实数据库。

  ###### Next Steps
1. 替换腾讯地图 YOUR_TENCENT_MAP_KEY 为真实 API Key。
2. 对接真实登录/验证码/支付 API。
3. 可选项：扩展 tailwind.config.js 主题色。
4. Setting.vue 补充完整交互（修改手机号、设备管理操作等）。
5. Sidebar「我的宠物档案」跳转目标页面。
6. 初始本地启动：终端1 cd server && npm start，终端2 npm run dev。

  ###### Critical Context
- Vite proxy 将 /api 转发到 localhost:3001，需后端运行。
- localStorage key：ppa_chats（聊天列表）、ppa_draft（草稿）、ppa_new_posts（新帖）。
- 路由使用 createWebHashHistory，需用 router.push() 导航。
- iconify-icon 已配置 compilerOptions.isCustomElement。
- 所有手机容器统一 rounded-[40px] overflow-hidden border-[8px] border-white。
- build 产出 ~47 modules，JS 215 kB，CSS 33 kB。
Relevant Files
- src/views/Search.vue：可点击的推荐/热点tab + 搜索功能 + 用户关注 + Top10热帖排行。
- src/views/Chat.vue：聊天+通知双tab，搜索仅过滤聊天列表，项可点击→ChatDetail。
- src/views/ChatDetail.vue：微信风格聊天详情页（气泡双向对齐、自动回复）。
- src/views/Profile.vue：可复用用户主页（信息+帖子列表+关注/发消息）。
- src/views/Setting.vue：账号安全页，需完善交互。
- src/components/BottomNav.vue：5图标底栏（+发布居中突出），四角圆角浮动。
- src/components/Sidebar.vue：头像改为rounded-full圆形，宠物档案可点击。
- src/components/PostCard.vue：多图独立rounded-xl圆角，头像/昵称可点击→Profile。
- server/index.js + server/data.js：搜索API后端（Express + 模拟数据）。
- vite.config.js：含/api代理配置。
- src/style.css：.sheet类已用rounded-[32px]全圆角。