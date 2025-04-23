import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const light = ref(true);
  const quickList = ref([]);
  return { light, quickList };
}, {
  persist: true
})
