<template>
  <router-link :to="`/room/${meta.id}`">
    <transition name="lift" appear>
      <article class="px-4 w-full py-6 hover:bg-gray-300">
        <div class="text-xl font-bold">
          <span class="text-left">
            {{ meta.title }}
          </span>
        </div>
        <div class="text-gray-500">
          <fa :icon="['fas', 'crown']" class="text-gray-600" />
          {{ meta.owner.nickname }}님의 방
        </div>
      </article>
    </transition>
  </router-link>
</template>

<script>
export default {
  props: ['meta']
}
</script>

<style lang="postcss" scoped>
.lift-enter-active {
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.45s ease-in-out, opacity 0.45s ease-out;
}
.lift-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
