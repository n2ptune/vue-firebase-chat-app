<template>
  <router-link :to="`/room/${meta.id}`">
    <transition name="lift" appear>
      <article class="flex flex-row px-4 w-full py-6 hover:bg-gray-300">
        <div class="self-start">
          <div class="text-xl font-bold">
            <span class="text-left">
              {{ meta.title }}
            </span>
          </div>
          <div class="text-gray-500">
            <fa :icon="['fas', 'user-tie']" class="text-gray-600" />
            {{ meta.owner.nickname }} · {{ meta.users.length }}명 접속중
          </div>
        </div>
        <div class="ml-auto mr-4 self-center">
          <div class="px-4 py-2 rounded-lg bg-yellow-300 font-bold">
            {{ meta.messages }}
          </div>
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
