<template>
  <ul class="h-fit flex justify-center w-200 flex-wrap select-none">
    <a target="_blank" v-for="item in quickList" :key="item.id" :href="item.url">
      <li class="relative transition size-25 flex flex-col gap-2 justify-center items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#6b6b6b] rounded p-1">
        <h1 v-if="!item.icon" class="transition flex justify-center items-center bg-sky-100 dark:bg-[#004A76] dark:text-white rounded-full p-3 size-15"><span class="text-3xl">
          {{ item.title[0] }}
        </span></h1>
        <img v-else class="size-15" :src="item.icon">
        <span class="transition text-sm dark:text-white">{{item.title}}</span>
        <aside @click.prevent="removeQuickWay(item)" class="hidden absolute -right-2 -top-2 hover:bg-gray-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z"/></svg>
        </aside>
      </li>
    </a>
    <li @click="open" class="transition size-25 flex flex-col gap-2 justify-center items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#6b6b6b] rounded p-1">
      <h1 class="transition flex justify-center items-center bg-sky-100 dark:bg-[#004A76] dark:text-white rounded-full p-3 size-15"><span class="text-3xl">+</span></h1>
      <span class="transition text-sm dark:text-white">添加快捷方式</span>
    </li>
  </ul>
</template>

<style scoped>
li:hover aside {
  display: inline-block;
}

aside {
  animation: .6s fadeEnter ease-in;
}

@keyframes fadeEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<script setup>
import { useUserStore } from '@/stores/user';
import { inject, onMounted, reactive, ref } from 'vue';

const uuid = inject('uuid');
const userStore = useUserStore();


onMounted(() => {
  quickList.value = userStore.quickList;
})

// 快捷方式列表
const quickList = ref([]);


// 开启Modal
const open = inject('openQuickModal')

// 添加快捷方式
function addToQuickList(quickObj) {
  // 添加信息拷贝
  const addInfo = {
    title: quickObj.title,
    url: quickObj.url,
    icon: quickObj.icon,
    id: uuid()
  }

  quickList.value.push(addInfo);
  
  updateUserStore();
}

// 删除快捷方式
function removeQuickWay(quickObj) {
  quickList.value = quickList.value.filter(item => item.id != quickObj.id);
  updateUserStore();
}

// 暴露添加快捷键方法供Modal使用
defineExpose({
  addToQuickList
})

// 更新本地store
function updateUserStore() {
  userStore.quickList = quickList.value;
}
</script>