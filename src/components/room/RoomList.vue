<template>
  <router-link :to="`/room/${meta.id}`">
    <article class="w-full px-4 py-12 hover:bg-gray-300">
      <div class="text-left">
        <span class="text-xl">{{ meta.owner }}</span
        >님의 {{ meta.title }}번 방
      </div>
    </article>
  </router-link>
</template>

<script>
export default {
  props: ['meta']
}
</script>

<style lang="postcss" scoped>
article::before {
  content: '';
  display: block;
  margin: 1rem 0;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.11);
}
</style>
