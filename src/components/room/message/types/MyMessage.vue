<template>
  <div class="">
    <div class="my-message-wrap max-w-md px-4 py-2 rounded-lg">
      <div class="meta text-right text-sm text-white-600 mb-1">
        {{ message.owner.nickname }} · {{ dateToString }}
      </div>
      <div class="text-white text-right">{{ message.content }}</div>
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
.my-message-wrap {
  background-color: rgb(40, 158, 40);
}
.text-white-600 {
  color: rgba(255, 255, 255, 0.6);
}
</style>
