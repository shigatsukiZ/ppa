<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const helpData = ref({
  id: Number(route.params.id),
  title: '',
  desc: '',
  location: '',
  time: '',
  reward: '',
  poster: '',
  avatar: '',
  detail: '',
  completed: false,
})

const all = [
  { id: 1, title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '布丁麻麻', avatar: 'https://picsum.photos/200?random=4', detail: '家有两只猫，一只布偶一只英短。每天需要喂食一次、换水、清猫砂。预计每天耗时20分钟。已备好足够猫粮和罐头，放在门口鞋柜上。', completed: false },
  { id: 2, title: '求带家里布偶去绝育', desc: '工作太忙抽不出时间，希望好心人帮忙带猫去宠物医院', location: '成都·锦城大道99号', time: '下周二 14:00', reward: '800 零食 (≈¥8)', poster: '大白姐姐', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/e5aef7fa9bee4ef599275559e228a396.jpg', detail: '布偶猫1岁，已预约好宠物医院。需要帮忙从家里接猫送到医院（步行5分钟），手术后帮忙接回。医院地址已发定位，车费报销。', completed: false },
  { id: 3, title: '猫咪洗澡互助', desc: '我家英短洗澡不太配合，求有经验的朋友帮忙', location: '成都·金融城A座', time: '本周六 10:00', reward: '磨牙棒一盒 + 200 零食', poster: '团子爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/df1301d0ef594fa7bf45eb0ddec652d6.jpg', detail: '英短3岁，性格温和但怕水。需要有给猫洗澡经验的朋友协助。家里有全套洗护用品（宠物香波、吸水毛巾、吹水机）。预计耗时1小时。', completed: false },
  { id: 4, title: '帮忙收猫砂快递', desc: '网购膨润土猫砂太重了，求邻居帮忙搬上楼', location: '成都·南城都汇3期', time: '明天 18:00', reward: '500 零食 (≈¥5)', poster: '泡芙麻麻', avatar: 'https://picsum.photos/200?random=1', detail: '快递预计明天下午到小区快递柜，约20斤重。需要帮忙从小区门口搬到6楼（有电梯）。我在家可以开门接应。', completed: false },
  { id: 5, title: '周末一起遛狗互相照看', desc: '两只狗一起遛更有伴，轮流看护', location: '成都·锦城公园', time: '每周六 16:00', reward: '轮流请咖啡 ☕', poster: '毛球麻麻', avatar: 'https://picsum.photos/200?random=2', detail: '家有金毛一只，性格温顺已绝育。希望找同样养狗的朋友一起遛狗，狗狗有玩伴，人也互相照看。平常去锦城公园草坪区碰头。', completed: false },
  { id: 6, title: '求帮忙带柯基去洗澡', desc: '周末出差，想请人帮忙带毛孩子去宠物店洗白', location: '成都·桐梓林北路', time: '本周日 15:00', reward: '1000 零食 (≈¥10)', poster: '七喜麻麻', avatar: 'https://picsum.photos/200?random=5', detail: '柯基2岁，已预约好离家500m的宠物店。需要帮忙牵狗去店里洗澡（预计1.5小时），然后接回送到家。钥匙放在门口地毯下。', completed: false },
  { id: 7, title: '代遛金毛一周', desc: '家里有急事回老家一周，求靠谱邻居帮忙每天遛狗', location: '成都·翡翠城', time: '每天早晚各一次', reward: '3 罐巅峰罐头 + 2000 零食', poster: '糯米麻麻', avatar: 'https://picsum.photos/200?random=6', detail: '金毛5岁，每天需早晚各遛一次（每次30分钟）。家里有备用钥匙。食物和水已备好，只需遛狗和喂食。狗狗疫苗齐全性格好。', completed: false },
  { id: 8, title: '狗狗训练互助', desc: '家有边牧希望找训犬经验的朋友指导', location: '成都·东湖公园', time: '协商确定', reward: '时薪 500 零食 (≈¥5/时)', poster: '可乐麻麻', avatar: 'https://picsum.photos/200?random=3', detail: '边牧8个月，已学会坐卧等待，想进一步训练随行和拒食。希望找有训犬经验的朋友现场指导。地点在东湖公园草坪，时间可协商。', completed: false },
  { id: 99, title: '周末出差，求邻居代喂猫', desc: '只限本小区认证熟人，报酬：一箱罐头或红包', location: '成都·环球中心E5栋', time: '本周末 全天', reward: '一箱主食罐头（约¥120）', poster: '柯基·短腿 的爸爸', avatar: 'https://modao.cc/agent-py/media/generated_images/2026-04-28/47c70c8d364f42ca9c6ff639ee99413f.jpg', detail: '家有两只猫，一只布偶一只英短。每天需要喂食一次、换水、清猫砂。已备好足够猫粮和罐头，放在门口鞋柜上。预计每天20分钟。只限本小区认证熟人。', completed: false },
]

const data = all.find(h => h.id === Number(route.params.id))
if (data) Object.assign(helpData.value, data)

const navigateMap = () => {
  const encoded = encodeURIComponent(helpData.value.location)
  window.open(`https://uri.amap.com/marker?position=&name=${encoded}`, '_blank')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-white flex flex-col pt-10">
      <header class="shrink-0 flex items-center px-4 h-12 border-b border-[#F0F0F0]">
        <button class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors" @click="router.back()">
          <iconify-icon class="text-gray-500 text-lg" icon="solar:arrow-left-linear"></iconify-icon>
        </button>
        <span class="flex-1 text-center text-sm font-bold text-[#5D4037]">互助详情</span>
        <div class="w-8"></div>
      </header>

      <main class="flex-1 overflow-y-auto custom-scrollbar">
        <div class="px-4 pt-4">
          <div class="flex items-center gap-2.5 mb-3">
            <img :src="helpData.avatar" class="w-10 h-10 rounded-full object-cover"/>
            <div>
              <span class="text-sm font-bold text-[#5D4037]">{{ helpData.poster }}</span>
              <div class="flex items-center gap-1 text-[10px] text-gray-400">
                <iconify-icon icon="solar:map-point-linear"></iconify-icon>
                <span>{{ helpData.location }}</span>
              </div>
            </div>
            <div class="ml-auto">
              <span class="text-[9px] bg-[#E8F5E9] text-green-600 px-2 py-0.5 rounded-full font-bold">{{ helpData.completed ? '已完成' : '进行中' }}</span>
            </div>
          </div>

          <h2 class="text-base font-black text-[#5D4037] mb-2">{{ helpData.title }}</h2>
          <p class="text-xs text-gray-600 leading-relaxed mb-4">{{ helpData.desc }}</p>

          <div class="bg-[#F8F9FA] rounded-2xl p-3 space-y-2 mb-4">
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:clock-circle-linear"></iconify-icon>
              <span class="text-gray-400 w-12 shrink-0">时间</span>
              <span class="text-[#5D4037] font-bold">{{ helpData.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:map-point-linear"></iconify-icon>
              <span class="text-gray-400 w-12 shrink-0">地点</span>
              <span class="text-[#5D4037] font-bold">{{ helpData.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <iconify-icon class="text-gray-400" icon="solar:gift-linear"></iconify-icon>
              <span class="text-gray-400 w-12 shrink-0">报酬</span>
              <span class="text-[#FF85A2] font-bold">{{ helpData.reward }}</span>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="text-xs font-bold text-[#5D4037] mb-2">详细说明</h3>
            <p class="text-xs text-gray-600 leading-relaxed">{{ helpData.detail }}</p>
          </div>

          <div class="flex flex-col gap-2 pb-4">
            <button
              class="w-full py-3 text-xs font-bold rounded-full bg-[#4CAF50] text-white shadow-md flex items-center justify-center gap-2"
              @click="navigateMap">
              <iconify-icon icon="solar:map-point-bold"></iconify-icon>
              导航到 {{ helpData.location }}
            </button>
            <button
              class="w-full py-2.5 text-xs font-bold rounded-full border border-gray-200 text-gray-400"
              @click="router.back()">返回</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
