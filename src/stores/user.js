import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const light = ref(true);
  const quickList = ref([]);
  const nowEngine = ref({
    title: 'Bing',
    baseUrl: 'https://cn.bing.com/search?q=',
    color: 'red'
  })
  return { light, quickList, nowEngine };
}, {
  persist: true
})
