<template>
  <header
    class="flex relative items-center w-full h-16 px-4 py-6 border-gray-300 border"
  >
    <div class="text-xl mr-auto">
      {{ name }}
    </div>
    <div class="ml-auto" v-if="$route.path === '/'">
      <button
        @click="setModal"
        class="focus:outline-none px-4 py-2 hover:bg-gray-300 rounded-lg"
      >
        방 만들기
      </button>
    </div>
    <modal name="create-room" :adaptive="true" :max-width="400" height="auto">
      <div class="py-4">
        <div class="text-lg border-b px-4 pb-4 border-gray-300 modal-header">
          방 만들기
        </div>
        <div class="mt-4 px-4">
          <label for="roomTitle" class="block">제목</label>
          <input
            v-model="roomTitle"
            type="text"
            name="roomTitle"
            required
            placeholder="방 제목을 입력하세요. (최대 30자)"
            maxlength="30"
            class="focus:outline-none pt-2 px-2 pb-1 text-gray-600 border-b border-gray-400 w-full"
          />
          <button
            class="w-full my-4 p-2 border-2 focus:outline-none create-btn"
            :class="roomTitle ? 'border-orange-400' : ''"
            @click="createRoom"
            :disabled="!roomTitle"
          >
            방 만들기
          </button>
        </div>
      </div>
    </modal>
  </header>
</template>

<script>
export default {
  data: () => ({
    roomTitle: ''
  }),
  computed: {
    name() {
      return this.$route.name === 'Home' ? 'Home' : '채팅방'
    }
  },
  methods: {
    setModal() {
      this.modal
        ? this.$modal.hide('create-room')
        : this.$modal.show('create-room')
    },
    async createRoom() {
      const title = this.roomTitle
      this.roomTitle = ''

      await this.$store.dispatch('createRoom', { title })

      this.$modal.hide('create-room')
    }
  }
}
</script>

<style lang="postcss" scoped>
.create-btn:disabled {
  @apply text-gray-400;
}
</style>
