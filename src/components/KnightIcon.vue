<template>
  <a href="#" class="cursor-pointer select-none">
      <aside class="hidden flex-col items-center absolute -top-10">
        <p class="animate-pulse bg-gray-800 text-white rounded px-2">我是小骑士，今天你有什么想搜的呢...</p>
        <svg class="size-5 animate-bounce dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 16H5v-2h2v-2h2v-2h2V8h2v2h2v2h2v2h2v2h-2v-2h-2v-2h-2v-2h-2v2H9v2H7z"/></svg>
      </aside>
    <img src="../assets/knight.png" alt="HollowKnigh" class="size-50">
  </a>
</template>

<style scoped>
a:hover aside {
  display: flex;
  animation: fade-enter .5s ease-in-out;
}


@keyframes fade-enter {
  from {
    opacity: 0;
  } 
  to {
    opacity: 1;
  }
}
</style>