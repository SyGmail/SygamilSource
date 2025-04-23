<template>
  <main class="w-full h-full transition pt-20 flex flex-col items-center ">
    <ThemeSwitch />
    <KnightIcon class="transition hover:scale-90 active:scale-100" />
    <SearchBar class="mt-5 w-1/2 max-md:min-w-80 max-w-150 dark:bg-white" />
    <QuickWay class="mt-10" ref="quickWayRef" />
    <Teleport to="body">
      <main v-if="showQuickWayModal" class="w-screen h-screen absolute left-0 top-0">
        <aside class="max-md:w-6/7 shadow-2xl w-120 h-80 bg-white gap-3 outline rounded p-3 outline-gray-100 absolute left-1/2 top-1/2 -translate-1/2 flex flex-col">
          <p>添加快捷方式</p>
          <nav>
            <p class="text-sm">名称</p>
            <input @keydown.enter="closeQuickModal" v-model="addInfo.title" class="px-2 text-sm transition h-8 w-full border-blue-600 border-b focus:border-b-2 outline-none bg-[#E1E3E1] rounded-tl rounded-tr" type="text">
          </nav>
          <nav>
            <p class="text-sm">网址</p>
            <input @keydown.enter="closeQuickModal" v-model="addInfo.url" class="px-2 text-sm transition h-8 w-full border-blue-600 border-b focus:border-b-2 outline-none bg-[#E1E3E1] rounded-tl rounded-tr" type="text">
          </nav>
          <nav>
            <p class="text-sm">图标</p>
            <input @keydown.enter="closeQuickModal" v-model="addInfo.icon" class="px-2 text-sm transition h-8 w-full border-blue-600 border-b focus:border-b-2 outline-none bg-[#E1E3E1] rounded-tl rounded-tr" type="text">
          </nav>
          <div class="absolute right-5 bottom-5 flex gap-2">
            <button @click="justCloseModal" class="outline outline-blue-200 cursor-pointer hover:bg-gray-100 text-blue-700 rounded-4xl text-sm py-2 px-4">取消</button>
            <button :disabled="disableAdd" @click="closeQuickModal" class="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:brightness-100 cursor-pointer hover:brightness-130 text-white rounded-4xl text-sm py-2 px-4 bg-blue-700">确定</button>
          </div>
        </aside>
      </main>
    </Teleport>
  </main>
  
</template>

<script setup>
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import KnightIcon from '@/components/KnightIcon.vue';
import SearchBar from '@/components/SearchBar.vue';
import QuickWay from '@/components/QuickWay.vue';

import { reactive, ref, watch, provide, computed, onMounted } from 'vue';
const addInfo = reactive({
  title: '',
  url: '',
  icon: ''
})

const quickWayRef = ref(null)

const disableAdd = computed(() => {
  for (let value of Object.values(addInfo)) {
    if (value == '') return true;
  }
  return false;
})


const showQuickWayModal = ref(false);
watch(showQuickWayModal, (newVal) => {
  // 显示Modal 虚化背景
  if (newVal == true) {
    document.querySelector('#app').classList.add('brightness-50')
  } else {
    document.querySelector('#app').classList.remove('brightness-50')
  }
}, {
  immediate: true
})

// 打开Modal
function openQuickModal() {
  showQuickWayModal.value = true;
}

// 仅仅关闭但不添加
function justCloseModal() {
  showQuickWayModal.value = false;
  addInfo.title = ''
  addInfo.url = ''
  addInfo.icon = ''
}

// 关闭Modal
function closeQuickModal() {
  showQuickWayModal.value = false;
  // 防止对象的引用为空
  quickWayRef.value.addToQuickList(addInfo)

  addInfo.title = ''
  addInfo.url = ''
  addInfo.icon = ''
}

provide('openQuickModal', openQuickModal)
provide('closeQuickModal', closeQuickModal)
</script>