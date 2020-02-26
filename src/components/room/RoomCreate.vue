<template>
  <section class="flex flex-col justify-center items-center h-full">
    <article class="mx-auto create-wrap">
      <div class="text-center">
        만들어진 방이 없습니다.
      </div>
      <button
        @click="createRoom"
        :disabled="disabled"
        class="hover:bg-yellow-300 w-full px-4 py-2 rounded-lg focus:outline-none border-yellow-400 border-2"
      >
        방 만들기
      </button>
    </article>
  </section>
</template>

<script>
// eslint-disable-next-line
import { db } from '@/plugins/firebase'

export default {
  props: ['ip'],
  data: () => ({
    disabled: null
  }),
  methods: {
    async createRoom() {
      this.disabled = true

      db.collection('rooms').add({
        owner: this.ip,
        title: Math.floor(Math.random() * 99999999 + 10000000).toString(),
        messages: []
      })

      this.disabled = false
    }
  }
}
</script>

<style lang="postcss" scoped>
.create-wrap * {
  @apply my-1;
}
</style>
