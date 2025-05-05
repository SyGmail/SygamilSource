<!-- 搜索小组件 -->
<template>
  <div class="flex rounded-3xl shadow shadow-gray-300 items-center px-2 relative">
    <svg class="cursor-pointer" @click="onSearch" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8v2H6zM4 6V4h2v2zm0 8H2V6h2zm2 2H4v-2h2zm8 0v2H6v-2zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm0-8h2v8h-2zm0 0V4h-2v2z"/></svg>
    <input ref="inputDoc" @keydown.enter="onSearch" v-model="keyword" :placeholder="searchHolder" type="text" class="select-none outline-none pl-2 pr-10 flex-1 h-12">

    <img :src="nowEngine.icon" class="size-10 absolute select-none right-2 rounded-full">
    <!-- ############################################################### -->
    <!-- Docker栏 -->
    <aside class="select-none fixed bottom-10 left-0 w-screen flex justify-center">
      <ul ref="ulRef" id="engineList" class="opacity-0 hover:opacity-100 transition flex dark:bg-[#3C3939] rounded-2xl p-2 items-center justify-center dark:outline outline-2 outline-gray-400/10 dark:outline-gray-100/20 max-h-13">
          <nav @click="onChangeEngine(engine)" ref="dockerItems" class="relative z-2 p-1 flex justify-center items-center" v-for="engine in engineList" :key="engine">
            <img :src="engine.icon" class="hover:active:brightness-50 rounded-xl w-full h-full" :class="engine.style">
            <div class="invisible font-light absolute -top-13 w-80 flex justify-center">
              <span class="bg-gray-300 rounded px-2 py-1">{{ engine.title }}</span>
            </div>
          </nav>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
/* 禁止图片拖拽 */
img {
  -webkit-user-drag: none;
}

ul {
  --scale: 1;
  --size: 3rem;
  --move: 3rem;
}

nav {
  width: calc(var(--size) * var(--scale));
  height: calc(var(--size) * var(--scale));
}

img:hover + div {
  visibility: visible;
}
</style>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
// 用户本地数据
const userStore = useUserStore();

// 搜索框
const inputDoc = ref(null);
const ulRef = ref(null)

// 处理悬浮缩放效果
const dockerItems = ref(null);

// 处理Docker栏动画
onMounted(() => {
  dockerItems.value.forEach(nav => {
    nav.addEventListener('mousemove', (e) => {
      // item 为鼠标当前悬浮位置的元素
      const item = e.currentTarget;
      let itemRect = item.getBoundingClientRect();
      let offset = Math.abs((e.clientX - itemRect.left) / itemRect.width);

      const prev = item.previousElementSibling || null;
      const next = item.nextElementSibling || null;
      
      // 最大放大倍率
      const scale = 0.6;
      // 为了使在图标最左边的时候缩放效果最大
      prev?.style.setProperty('--scale', 1 + scale * Math.abs(1 - offset));

      item.style.setProperty('--scale', 1 + scale);

      // 使在图标最右边的时候缩放最大，最左边缩放最小
      next?.style.setProperty('--scale', 1 + scale * offset);
    });
  });
  // 鼠标离开清除放大镜效果
  ulRef.value.addEventListener('mouseleave', () => {
    resetScale();
  })
})

// 将放大倍率重置
function resetScale() {
  dockerItems.value.forEach(nav => {
    nav.style.setProperty('--scale', 1)
  })
}

// input框的提示词
const searchHolder = ref('想搜点什么?')

// 用户输入的搜索词
const keyword = ref('');

// 现在使用的API
let nowEngine = ref({
  title: 'Bing',
  baseUrl: 'https://cn.bing.com/search?q=',
  color: 'red'
})

// 引擎列表
const engineList = ref([
  {
    title: 'Bing',
    baseUrl: 'https://cn.bing.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=pOADWgX6vV63&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Google',
    baseUrl: 'https://www.google.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'MDN',
    baseUrl: 'https://developer.mozilla.org/zh-CN/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=111036&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Youtube',
    baseUrl: 'https://www.youtube.com/results?search_query=',
    icon: 'https://img.icons8.com/?size=100&id=19318&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'ICONS',
    baseUrl: 'https://igoutu.cn/icons/set/',
    icon: 'https://img.icons8.com/?size=100&id=ayJDJ6xQKgM6&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Iconify',
    baseUrl: 'https://icon-sets.iconify.design/?query=',
    icon: 'https://icon-sets.iconify.design/favicon.ico',
    style: 'bg-white'
  },
  {
    title: 'CSDN',
    baseUrl: 'https://so.csdn.net/so/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=5fWjhaY3fUDf&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Bilibili',
    baseUrl: 'https://search.bilibili.com/all?keyword=',
    icon: 'https://img.icons8.com/?size=100&id=5E24fZ9ORelo&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: '稀土掘金',
    baseUrl: 'https://juejin.cn/search?query=',
    icon: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png',
    style: 'bg-white'
  },
  {
    title: 'StackOverFlow',
    baseUrl: 'https://stackoverflow.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=56934&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Github',
    baseUrl: 'https://github.com/search?type=repositories&q=',
    icon: 'https://img.icons8.com/?size=100&id=48708&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'IconFinder',
    baseUrl: 'https://www.iconfinder.com/search?q=',
    icon: 'https://www.iconfinder.com/favicon.ico',
    style: 'bg-white'
  },
  {
    title: 'DuckDuckGo',
    baseUrl: 'https://duckduckgo.com/?t=h_&q=',
    icon: 'https://img.icons8.com/?size=100&id=Z9gtYQGWdiV1&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Unsplash',
    baseUrl: 'https://unsplash.com/s/photos/',
    icon: 'https://img.icons8.com/?size=100&id=e4ush6qx3Z1D&format=png&color=000000',
    style: 'outline-1 outline-white bg-white'
  },
  {
    title: 'Pexels',
    baseUrl: 'https://www.pexels.com/zh-cn/search/',
    icon: 'https://img.icons8.com/?size=100&id=748&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: '开发者搜索',
    baseUrl: 'https://kaifa.baidu.com/searchPage?wd=',
    icon: 'https://baidu.com/favicon.ico',
    style: 'bg-white'
  },
  {
    title: '知乎',
    baseUrl: 'https://www.zhihu.com/search?type=content&q=',
    icon: 'https://img.icons8.com/?size=100&id=DVtS4lF5-eqh&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'SimilarSiteSearch',
    baseUrl: 'https://www.similarsitesearch.com/search/?q=',
    icon: 'https://img.icons8.com/?size=100&id=119854&format=png&color=000000',
    style: 'bg-[#0076C6]'
  },
  {
    title: 'WikiHow',
    baseUrl: 'https://zh.wikihow.com/wikiHowTo?search=',
    icon: 'https://zh.wikihow.com/favicon.ico',
    style: 'bg-[#92B874]'
  },
  {
    title: '抖音',
    baseUrl: 'https://www.douyin.com/root/search/',
    icon: 'https://img.icons8.com/?size=100&id=71197&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: 'Google翻译（英翻中）',
    baseUrl: 'https://translate.google.com/?hl=zh-cn&sl=en&tl=zh-CN&op=translate&text=',
    icon: 'https://img.icons8.com/?size=100&id=13647&format=png&color=000000',
    style: 'bg-white'
  },
  {
    title: '百度翻译（英翻中）',
    baseUrl: 'https://fanyi.baidu.com/mtpe-individual/multimodal?query=',
    icon: 'https://img.icons8.com/?size=100&id=13495&format=png&color=000000',
    style: 'bg-white'
  },
])

// 挂载时加载用户上一次选择的引擎
onMounted(() => {
  nowEngine.value = userStore.nowEngine;
})

// 按下搜索按钮搜索关键词
async function onSearch() {
  open(nowEngine.value.baseUrl+keyword.value)
}

// 切换搜索引擎
function onChangeEngine(engine) {
  nowEngine.value = engine;
  updateNowEngine();
  inputDoc.value.focus()
}

// 刷新存储的nowEngine
function updateNowEngine() {
  userStore.nowEngine = nowEngine.value;
}
</script>