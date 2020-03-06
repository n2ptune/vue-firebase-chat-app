<template>
  <div>
    <div class="diff-message-wrap max-w-xs md:max-w-md px-4 py-2 rounded-lg">
      <div class="meta text-left text-sm text-white-600 mb-1">
        {{ message.owner.nickname }} · {{ dateToString }}
      </div>
      <div class="text-white">{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(RelativeTime)

export default {
  props: ['message'],

  computed: {
    dateToString() {
      const convert = date =>
        new Date(date.seconds * 1000) + date.nanoseconds / 1000000

      return dayjs().to(dayjs(convert(this.message.date)))
    }
  }
}
</script>

<style lang="postcss" scoped>
.diff-message-wrap {
  background-color: rgb(33, 35, 161);
}
.text-white-600 {
  color: rgba(255, 255, 255, 0.6);
}
</style>
