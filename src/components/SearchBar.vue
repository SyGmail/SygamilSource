<!-- 搜索小组件 -->
<template>
  <div class="flex rounded-3xl shadow shadow-gray-300 items-center px-2">
    <svg class="cursor-pointer" @click="onSearch" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8v2H6zM4 6V4h2v2zm0 8H2V6h2zm2 2H4v-2h2zm8 0v2H6v-2zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm0-8h2v8h-2zm0 0V4h-2v2z"/></svg>
    <input @keydown.enter="onSearch" v-model="keyword" :placeholder="'使用'+nowEngine.title+'嗖嗖...'" type="text" class="select-none outline-none pl-2 flex-1 h-12">
    <aside class="select-none">
      <header>
        <svg id="collapseEngineList" class="hover:text-red-500 cursor-pointer" @click="showEngine=!showEngine" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7z"/></svg>
      </header>
      <Transition enter-active-class="transition" enter-from-class="opacity-0" leave-active-class="transition" leave-to-class="opacity-0">
        <nav v-show="showEngine">
          <!-- 侧边导航栏 -->
          <ul id="engineList" class="max-md:right-0 max-md:opacity-90 max-md:top-0 bg-white shadow outline outline-gray-200 rounded py-2 absolute">
            <nav id="engineItem" class="px-2 flex gap-3 items-center cursor-pointer" v-for="engine in engineList" :key="engine" @click="onChangeEngine(engine)">
              <svg class="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2z"/></svg>
              <img class="size-5" :src="engine.icon">
              <span>{{ engine.title }}</span>
            </nav>
          </ul>
        </nav>
      </Transition>
    </aside>
  </div>
</template>

<style>
#engineItem:hover svg {
  color: rgb(218, 218, 218);
}

#engineItem:hover span {
  color: rgb(68, 140, 168);
}
</style>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';
const userStore = useUserStore();

// 点击任意地点关闭Modal
onMounted(() => {
  document.addEventListener('click', (e) => {
    const clickTarget = e.target;
    if (!clickTarget.closest('#engineList') && !clickTarget.closest('#collapseEngineList')) {
      showEngine.value = false;
    }
  })
})


const showEngine = ref(false);
const keyword = ref('');
let nowEngine = ref({
  title: 'Bing',
  baseUrl: 'https://cn.bing.com/search?q=',
  color: 'red'
})

const engineList = ref([
  {
    title: 'Bing',
    baseUrl: 'https://cn.bing.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=pOADWgX6vV63&format=png&color=000000'
  },
  {
    title: 'Google',
    baseUrl: 'https://www.google.com/search?q=',
    icon: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000'
  },
  {
    title: 'MDN',
    baseUrl: 'https://developer.mozilla.org/zh-CN/search?q=',
    icon: 'https://developer.mozilla.org/favicon.ico'
  },
  {
    title: 'ICONS',
    baseUrl: 'https://igoutu.cn/icons/set/',
    icon: 'https://img.icons8.com/?size=100&id=ayJDJ6xQKgM6&format=png&color=000000'
  },
  {
    title: 'Iconify',
    baseUrl: 'https://icon-sets.iconify.design/?query=',
    icon: 'https://icon-sets.iconify.design/favicon.ico'
  },
  {
    title: 'CSDN',
    baseUrl: 'https://so.csdn.net/so/search?q=',
    icon: 'https://so.csdn.net/favicon.ico'
  },
  {
    title: 'Bilibili',
    baseUrl: 'https://search.bilibili.com/all?keyword=',
    icon: 'https://img.icons8.com/?size=100&id=5E24fZ9ORelo&format=png&color=000000'
  },
  {
    title: '稀土掘金',
    baseUrl: 'https://juejin.cn/search?query=',
    icon: 'https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/apple-touch-icon.png'
  },
  {
    title: 'StackOverFlow',
    baseUrl: 'https://stackoverflow.com/search?q=',
    icon: 'https://stackoverflow.com/favicon.ico'
  },
  {
    title: 'Github',
    baseUrl: 'https://github.com/search?type=repositories&q=',
    icon: 'https://github.com/favicon.ico'
  },
  {
    title: 'IconFinder',
    baseUrl: 'https://www.iconfinder.com/search?q=',
    icon: 'https://www.iconfinder.com/favicon.ico'
  },
  {
    title: 'DuckDuckGo',
    baseUrl: 'https://duckduckgo.com/?t=h_&q=',
    icon: 'https://duckduckgo.com/favicon.ico'
  },
  {
    title: 'Unsplash',
    baseUrl: 'https://unsplash.com/s/photos/',
    icon: 'https://unsplash.com/favicon.ico'
  },
  {
    title: 'Pexels',
    baseUrl: 'https://www.pexels.com/zh-cn/search/',
    icon: 'https://www.pexels.com/favicon.ico'
  },
  {
    title: '开发者搜索',
    baseUrl: 'https://kaifa.baidu.com/searchPage?wd=',
    icon: 'https://baidu.com/favicon.ico'
  },
  {
    title: '知乎',
    baseUrl: 'https://www.zhihu.com/search?type=content&q=',
    icon: 'https://www.zhihu.com/favicon.ico'
  },
  {
    title: 'SimilarSiteSearch',
    baseUrl: 'https://www.similarsitesearch.com/search/?q=',
    icon: 'https://www.similarsitesearch.com/favicon.ico'
  },
  {
    title: 'WikiHow',
    baseUrl: 'https://zh.wikihow.com/wikiHowTo?search=',
    icon: 'https://zh.wikihow.com/favicon.ico'
  },
  {
    title: '抖音',
    baseUrl: 'https://www.douyin.com/root/search/',
    icon: 'https://www.douyin.com/favicon.ico'
  },
  {
    title: 'Google翻译',
    baseUrl: 'https://translate.google.com/?hl=zh-cn&sl=en&tl=zh-CN&op=translate&text=',
    icon: 'https://translate.google.com/favicon.ico'
  },
  {
    title: '百度翻译',
    baseUrl: 'https://fanyi.baidu.com/mtpe-individual/multimodal?query=',
    icon: 'https://fanyi.baidu.com/favicon.ico'
  },
])

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
  showEngine.value = false;
  updateNowEngine();
}

// 刷新存储的nowEngine
function updateNowEngine() {
  userStore.nowEngine = nowEngine.value;
}

let titleList = ref(['这是Sy开发的小工具哦～', '祝你有美好的一天哦', '给这个repo点个star吧！'])
let idx = 0;

setInterval(() => {
  idx++;
  idx >= titleList.value.length ? idx = 0 : idx; 
  document.title = titleList.value[idx];
}, 3000);
</script>