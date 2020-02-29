<template>
  <div
    class="my-2"
    :class="
      matchMessage === 'Notice'
        ? 'self-center'
        : matchMessage === 'MyMessage'
        ? 'self-end'
        : 'self-start'
    "
  >
    <component
      class="message"
      :class="matchMessage !== 'Notice' ? 'mx-2' : ''"
      :is="matchMessage"
      :message="message"
      :date="dateToString"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(RelativeTime)

export default {
  props: ['message'],

  components: {
    DiffMessage: () =>
      import('@/components/room/message/types/DiffMessage.vue'),
    MyMessage: () => import('@/components/room/message/types/MyMessage.vue'),
    Notice: () => import('@/components/room/message/types/Notice.vue')
  },

  computed: {
    ...mapGetters({
      ipAddr: 'getUserIpAddr',
      nickname: 'getUserNickname'
    }),
    matchMessage() {
      if (!this.message.owner) {
        return this.message.type === 'NOTICE' ? 'Notice' : ''
      } else {
        return this.message.owner.ipAddr === this.ipAddr &&
          this.message.owner.nickname === this.nickname
          ? 'MyMessage'
          : 'DiffMessage'
      }
    },
    dateToString() {
      const convert = date =>
        new Date(date.seconds * 1000) + date.nanoseconds / 1000000

      return dayjs().to(dayjs(convert(this.message.date)))
    }
  }
}
</script>

<style lang="postcss" scoped>
.message {
  overflow-wrap: break-word;
}
</style>
