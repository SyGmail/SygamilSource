<template>
  <div class="absolute left-5 top-5 text-sm text-white flex gap-2">
    <span @click="ifUserOpen = !ifUserOpen" class="bg-[#004A76] rounded-2xl select-none cursor-pointer px-2">书单/待办</span>
    <Transition enter-active-class="transition" enter-from-class="opacity-0 bg-[#004A76]/0" leave-active-class="transition" leave-to-class="opacity-0 bg-[#004A76]/0">
      <input v-if="ifUserOpen" @keydown.enter="addBook" type="text"
        class="origin-left w-30 text-gray-300 bg-[#004A76] rounded-2xl px-2 outline-none pr-2" v-model="bookInput" placeholder="输入内容...">
    </Transition>
    <Transition enter-active-class="transition" enter-from-class="opacity-0" leave-active-class="transition" leave-to-class="opacity-0">
      <ul v-if="ifShowList && ifUserOpen" id="bookList"
        class="resize min-h-fit min-w-fit z-5 max-h-120 overflow-auto w-fit absolute top-8 bg-gray-100 outline outline-gray-300 shadow rounded flex flex-col text-black">
        <TransitionGroup enter-active-class="transition" enter-from-class="-translate-x-5 opacity-0" leave-active-class="transition" leave-to-class="opacity-0 -translate-x-5">
          <li v-for="book in bookList" :key="book.id"
            class="select-none border-b py-1 border-gray-300 flex justify-between px-2 last:border-none">
            <p class="flex-1 block">{{ '《' + book.title + '》' }}</p>
            <aside class="cursor-pointer">
              <!-- 已读 -->
              <svg v-if="book.read" class="text-green-600" @click="setRead(book)" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M5 3H3v18h18V3zm0 2h14v14H5zm4 7H7v2h2v2h2v-2h2v-2h2v-2h2V8h-2v2h-2v2h-2v2H9z" />
              </svg>
              <!-- 未读 -->
              <svg v-else @click="setRead(book)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 3h18v18H3zm16 16V5H5v14z" />
              </svg>
            </aside>
          </li>
        </TransitionGroup>
      </ul>
    </Transition>
    <!-- 清空按钮 -->
    <footer v-if="ifShowClear&&ifUserOpen" @click="clearRead"
      class="absolute -right-10 -top-1 cursor-pointer hover:bg-gray-600 p-1 hover:text-green-400 transition rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M18 6h2v2h-2zm-2 4V8h2v2zm-2 2v-2h2v2zm-2 2h2v-2h-2zm-2 2h2v-2h-2zm-2 0v2h2v-2zm-2-2h2v2H6zm0 0H4v-2h2z" />
      </svg>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { computed, inject, onMounted, ref, watch } from 'vue';

const userStore = useUserStore();
const uuid = inject('uuid')

const bookInput = ref('')
const bookList = ref([])

// 是否用户点击了按钮打开书单
const ifUserOpen = ref(false)

// 防止空数组显示出错
const ifShowList = computed(() => {
  return bookList.value.length > 0
})

const ifShowClear = computed(() => {
  return ifShowList && bookList.value.find(item => item.read)
})

onMounted(() => {
  bookList.value = userStore.bookList;
})

watch(bookList, () => {
  updateBook();
})

// 将书本设置为已读
function setRead(book) {
  const book_index = bookList.value.findIndex(item => item == book)
  bookList.value[book_index].read = !bookList.value[book_index].read;
}

// 添加书本
function addBook() {
  bookList.value.push({
    id: uuid(),
    title: bookInput.value,
    read: false
  })
  bookInput.value = '';
}

// 清空已读书籍
function clearRead() {
  bookList.value = bookList.value.filter(item => item.read == false)
}

// 更新Pinia的bookList数据
function updateBook() {
  userStore.bookList = bookList.value;
}
</script>

<style scoped>
#bookList {
  scrollbar-width: none;
}
</style>