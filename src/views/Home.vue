<template>
  <main class="py-2">
    <section v-if="!isRoomEmpty">
      <room-list v-for="room in rooms" :key="room.title" :meta="room" />
    </section>
    <room-create v-else />
    <section v-if="loading" class="flex items-center justify-center h-full">
      <LoadingSpinner />
    </section>
  </main>
</template>

<script>
import RoomList from '@/components/room/RoomList.vue'
import RoomCreate from '@/components/room/RoomCreate.vue'
import { db } from '@/plugins/firebase'

export default {
  data: () => ({
    isRoomEmpty: null,
    rooms: [],
    loading: true
  }),

  components: {
    RoomList,
    RoomCreate,
    LoadingSpinner: () => import('@/components/LoadingSpinner.vue')
  },

  async created() {
    await this.$store.dispatch('connectUser')

    db.collection('rooms').onSnapshot(qs => {
      if (qs.empty) {
        this.isRoomEmpty = true
      } else {
        this.isRoomEmpty = false
        const docs = []

        qs.forEach(doc => {
          const { messages, owner, title, createdAt, users } = doc.data()
          const { id } = doc

          docs.push({
            messages: messages.length > 999 ? '999+' : messages.length,
            owner,
            title,
            id,
            createdAt,
            users
          })
        })

        this.rooms = docs
        this.rooms.sort((a, b) => {
          // Date 생성자는 밀리 세컨드 기준 파이어베이스에서 받은
          // 타임스탬프의 초와 나노초를 밀리초로 변환
          const toMillSeconds = (seconds, nano) =>
            new Date(seconds * 1000 + nano / 1000000)

          const [aD, bD] = [
            toMillSeconds(a.createdAt.seconds, a.createdAt.nanoseconds),
            toMillSeconds(b.createdAt.seconds, b.createdAt.nanoseconds)
          ]

          return aD - bD
        })
      }
      this.loading = false
    })
  }
}
</script>
