<template>
  <main class="py-2">
    <section v-if="!isRoomEmpty">
      <room-list v-for="room in rooms" :key="room.title" :meta="room" />
    </section>
    <room-create v-else />
  </main>
</template>

<script>
import RoomList from '@/components/room/RoomList.vue'
import RoomCreate from '@/components/room/RoomCreate.vue'
import { db } from '@/plugins/firebase'

export default {
  data: () => ({
    isRoomEmpty: null,
    rooms: []
  }),

  components: {
    RoomList,
    RoomCreate
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
          const { message, owner, title, createdAt } = doc.data()
          const { id } = doc

          docs.push({ message, owner, title, id, createdAt })
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
    })
  }
}
</script>

<style lang="postcss"></style>
