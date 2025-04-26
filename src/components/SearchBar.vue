<!-- 搜索小组件 -->
<template>
  <div class="flex rounded-3xl shadow shadow-gray-300 items-center px-2 relative">
    <svg class="cursor-pointer" @click="onSearch" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8v2H6zM4 6V4h2v2zm0 8H2V6h2zm2 2H4v-2h2zm8 0v2H6v-2zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm0-8h2v8h-2zm0 0V4h-2v2z"/></svg>
    <input @keydown.enter="onSearch" v-model="keyword" :placeholder="searchHolder" type="text" class="select-none outline-none pl-2 pr-10 flex-1 h-12">

    <img :src="nowEngine.icon" class="size-10 absolute select-none right-2 rounded-full">
    <!-- ############################################################### -->
    <!-- Docker栏 -->
    <aside class="opacity-0 scale-80 hover:opacity-100 hover:scale-100 transition select-none fixed bottom-10 left-0 w-screen flex justify-center">
      <ul id="engineList" class="transition-all duration-500 flex dark:bg-[#3C3939] gap-2 rounded-2xl p-2 items-center justify-center dark:outline outline-2 outline-gray-400/10 dark:outline-gray-100/20 max-h-14">
          <nav @click="onChangeEngine(engine)" ref="dockerItems" class="z-2 duration-180 flex justify-center items-center w-10 h-10 transition-all" v-for="engine in engineList" :key="engine">
            <img :src="engine.icon" class="hover:active:brightness-50 transition-all rounded-xl w-10 h-10 duration-180 " :class="engine.style">
            <span class="invisible font-light absolute -top-13 bg-gray-300 rounded px-2 py-1">{{ engine.title }}</span>
          </nav>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
/* 暂时为空 */
nav:hover {
  width: 80px;
  height: 80px;
}

nav:hover img {
  width: 70px;
  height: 70px;
}

.hover_1 {
  width: 60px;
  height: 60px;
}
.hover_2 {
  width: 50px;
  height: 50px;
}

/* 禁止图片拖拽 */
img {
  -webkit-user-drag: none;
}

img:hover + span {
  visibility: visible;
}
</style>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
// 用户本地数据
const userStore = useUserStore();

// 处理悬浮缩放效果
const dockerItems = ref(null);

onMounted(() => {
  dockerItems.value.forEach((item, idx) => {
    // 添加鼠标进入事件
    const pre_2 = dockerItems.value[idx-2];
    const pre_1 = dockerItems.value[idx-1];
    const nex_1 = dockerItems.value[idx+1];
    const nex_2 = dockerItems.value[idx+2];

    item.addEventListener('mouseenter', () => {
      if (pre_2) {
        const child = pre_2.firstChild;
        pre_2.classList.add('hover_2')
        child.classList.add('hover_2')
      }
      if (pre_1) {
        const child = pre_1.firstChild;
        pre_1.classList.add('hover_1')
        child.classList.add('hover_1')
      }
      if (nex_1) {
        const child = nex_1.firstChild;
        nex_1.classList.add('hover_1')
        child.classList.add('hover_1')
      }
      if (nex_2) {
        const child = nex_2.firstChild;
        nex_2.classList.add('hover_2')
        child.classList.add('hover_2')
      }
    })
    // 添加鼠标离开事件
    item.addEventListener('mouseleave', () => {
      if (pre_2) {
        const child = pre_2.firstChild;
        pre_2.classList.remove('hover_2')
        child.classList.remove('hover_2')
      }
      if (pre_1) {
        const child = pre_1.firstChild;
        pre_1.classList.remove('hover_1')
        child.classList.remove('hover_1')
      }
      if (nex_1) {
        const child = nex_1.firstChild;
        nex_1.classList.remove('hover_1')
        child.classList.remove('hover_1')
      }
      if (nex_2) {
        const child = nex_2.firstChild;
        nex_2.classList.remove('hover_2')
        child.classList.remove('hover_2')
      }
    })
  });
})

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
}

// 刷新存储的nowEngine
function updateNowEngine() {
  userStore.nowEngine = nowEngine.value;
}
</script>