<!-- 搜索小组件 -->
<template>
  <div class="flex rounded-3xl shadow shadow-gray-300 items-center px-2">
    <svg class="cursor-pointer" @click="onSearch" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8v2H6zM4 6V4h2v2zm0 8H2V6h2zm2 2H4v-2h2zm8 0v2H6v-2zm2-2h-2v2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm0-8h2v8h-2zm0 0V4h-2v2z"/></svg>
    <input @keydown.enter="onSearch" v-model="keyword" :placeholder="'使用'+nowEngine.title+'嗖嗖...'" type="text" class="select-none outline-none pl-2 flex-1 h-12">
    <aside>
      <header>
        <svg class="hover:text-red-500 cursor-pointer" @click="showEngine=!showEngine" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 8H5v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2h-2v-2H9v-2H7z"/></svg>
      </header>
      <nav v-show="showEngine">
        <ul id="engineList" class="bg-white shadow outline outline-gray-200 rounded py-2 absolute">
          <li id="engineItem" class="px-2 flex cursor-pointer" v-for="engine in engineList" :key="engine" @click="onChangeEngine(engine)">
            <svg class="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2z"/></svg>
            <span>{{ engine.title }}</span>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<style>
#engineItem:hover svg {
  color: rgb(218, 218, 218);
}
</style>

<script setup>
import { computed, ref } from 'vue';
const showEngine = ref(false);
const keyword = ref('');
let nowEngine = ref({
  title: '谷歌',
  baseUrl: 'https://www.google.com/search?q='
})

const engineList = ref([
  {
    title: 'Bing',
    baseUrl: 'https://cn.bing.com/search?q='
  },
  {
    title: 'Google',
    baseUrl: 'https://www.google.com/search?q='
  },
  {
    title: 'CSDN',
    baseUrl: 'https://so.csdn.net/so/search?q='
  },
  {
    title: 'Bilibili',
    baseUrl: 'https://search.bilibili.com/all?keyword='
  },
  {
    title: '稀土掘金',
    baseUrl: 'https://juejin.cn/search?query='
  },
])

// 按下搜索按钮搜索关键词
async function onSearch(event) {
  open(nowEngine.value.baseUrl+keyword.value)
}

// 切换搜索引擎
function onChangeEngine(engine) {
  nowEngine.value = engine;
  showEngine.value = false;
}

let titleList = ref(['这是Sy开发的小工具哦～', '祝你有美好的一天哦', '给这个repo点个star吧！'])
let idx = 0;

setInterval(() => {
  idx++;
  idx >= titleList.value.length ? idx = 0 : idx; 
  document.title = titleList.value[idx];
}, 3000);
</script>