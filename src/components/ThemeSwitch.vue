<template>
  <main class="absolute right-10 top-10 cursor-pointer dark:text-white transition" @click="changeTheme">
    <div v-if="!light">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2h8v2h-2v2h-2V4H6zM4 6V4h2v2zm0 10H2V6h2zm2 2H4v-2h2zm2 2H6v-2h2zm10 0v2H8v-2zm2-2v2h-2v-2zm-2-4h2v4h2v-8h-2v2h-2zm-6 0v2h6v-2zm-2-2h2v2h-2zm0 0V6H8v6z"/></svg>
    </div>
    <div v-else>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 0h-2v4h2zM0 11v2h4v-2zm24 0v2h-4v-2zM13 24h-2v-4h2zM8 6h8v2H8zM6 8h2v8H6zm2 10v-2h8v2zm10-2h-2V8h2zm2-14h2v2h-2zm0 2v2h-2V4zm2 18h-2v-2h2zm-2-2h-2v-2h2zM4 2H2v2h2v2h2V4H4zM2 22h2v-2h2v-2H4v2H2z"/></svg>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';


const userStore = useUserStore();
const light = ref(false);

onMounted(() => {  
  light.value = userStore.light;
  updateHtmlDoc();
})

// 切换主题颜色
function changeTheme() {
  light.value = !light.value;
  userStore.light = light.value;
  console.log(userStore.light);
  
  const htmlDoc = document.getElementsByTagName('html')[0]
  light.value ? htmlDoc.classList.remove('dark') : htmlDoc.classList.add('dark')
}

// 刷新html的主题类
function updateHtmlDoc() {
  const htmlDoc = document.getElementsByTagName('html')[0]
  light.value ? htmlDoc.classList.remove('dark') : htmlDoc.classList.add('dark')
}
</script>