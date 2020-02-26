<template>
  <main class="px-4 py-2">
    <section v-if="!isRoomEmpty">
      <room-list v-for="room in rooms" :key="room.title" :meta="room" />
    </section>
    <room-create :ip="ip" v-else />
  </main>
</template>

<script>
import RoomList from '@/components/room/RoomList.vue'
import RoomCreate from '@/components/room/RoomCreate.vue'
// eslint-disable-next-line
import { db } from '@/plugins/firebase'

export default {
  data: () => ({
    isRoomEmpty: null,
    rooms: [],
    ip: null
  }),
  components: {
    RoomList,
    RoomCreate
  },
  async created() {
    db.collection('rooms').onSnapshot(qs => {
      if (qs.empty) {
        this.isRoomEmpty = true
      } else {
        this.isRoomEmpty = false
        const docs = []

        qs.forEach(doc => {
          const { message, owner, title } = doc.data()
          const { id } = doc

          docs.push({ message, owner, title, id })
        })

        this.rooms = docs
      }
    })

    /**
     * @get ip from cloudflare tace
     */
    const { data } = await this.$axios.get(
      'https://www.cloudflare.com/cdn-cgi/trace'
    )

    // eslint-disable-next-line
    const ip = data
      .split('ip=')[1]
      .split('ts=')[0]
      .trim()

    this.ip = ip
  }
}
</script>
