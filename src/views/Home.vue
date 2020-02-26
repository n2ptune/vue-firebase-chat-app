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
// eslint-disable-next-line
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
    /**
     * @get Cloudflare 서비스로 아이피 가져옴
     */
    const { data } = await this.$axios.get(
      'https://www.cloudflare.com/cdn-cgi/trace'
    )

    // 받은 문자열에서 아이피만 자르기
    const ip = data
      .split('ip=')[1]
      .split('ts=')[0]
      .trim()

    db.collection('users')
      .where('ipAddr', '==', ip)
      .get()
      .then(async qs => {
        // 유저 객체 받아서 스토어에 커밋
        const storeMutate = user => this.$store.commit('setUser', user)

        if (qs.empty) {
          // 최초 사용자
          const { data: dummy } = await this.$axios.get(
            'https://uinames.com/api/?region=australia'
          )
          const nickname = `${dummy.surname} ${dummy.name}`

          db.collection('users')
            .add({
              ipAddr: ip,
              nickname
            })
            .then(() => storeMutate({ ipAddr: ip, nickname }))
        } else {
          // 기존 사용자면 그대로 저장
          qs.forEach(doc => storeMutate(doc.data()))
        }
      })

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
  }
}
</script>
