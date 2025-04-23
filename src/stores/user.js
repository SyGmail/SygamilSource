import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const light = ref(true);
  const quickList = ref([]);
  const nowEngine = ref({})
  return { light, quickList, nowEngine };
}, {
  persist: true
})
