<template>
  <router-link :to="`/room/${meta.id}`">
    <article class="px-4 w-full py-6 hover:bg-gray-300">
      <div class="text-left">
        <span class="text-xl">{{ meta.owner.nickname }}</span
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

<style lang="postcss" scoped></style>
