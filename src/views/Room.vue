<template>
  <main class="flex flex-col justify-end items-end p-2 overflow-y-auto">
    <message-wrapper>
      <message
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </message-wrapper>
    <input
      v-model="myMessage"
      :disabled="isDisabled"
      type="text"
      required
      class="w-full px-4 py-2 focus:outline-none focus:border-orange-400 border-gray-400 border-2 rounded message-input"
      placeholder="메세지를 입력하세요."
      @keydown.enter="sendMessage"
    />
  </main>
</template>

<script>
import { firebase, db } from '@/plugins/firebase'

export default {
  data: () => ({
    messages: [],
    myMessage: '',
    isDisabled: false,
    id: null
  }),

  components: {
    MessageWrapper: () =>
      import('@/components/room/message/MessageWrapper.vue'),
    Message: () => import('@/components/room/message/Message.vue')
  },

  async created() {
    await this.$store.dispatch('connectUser')

    const { id } = this.$route.params
    const room = db.collection('rooms').doc(id)
    this.id = id

    // 스냅샷 바인딩
    room.onSnapshot(doc => (this.messages = doc.data().messages))

    room.get().then(doc => {
      if (doc.exists) {
        const users = doc.data().users
        if (
          users.filter(u => u.ipAddr === this.$store.getters.getUserIpAddr)
            .length
        ) {
          return
        } else {
          room.update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              type: 'NOTICE',
              content: `${this.$store.getters.getUserNickname}님이 입장하셨습니다.`,
              date: new Date(),
              owner: null
            }),
            users: firebase.firestore.FieldValue.arrayUnion({
              ipAddr: this.$store.getters.getUserIpAddr,
              nickname: this.$store.getters.getUserNickname
            })
          })
        }
      }
    })
  },

  methods: {
    sendMessage() {
      if (!this.myMessage) return
    }
  },

  // eslint-disable-next-line
  async beforeRouteLeave(to, from, next) {
    const { id } = from.params
    const room = db.collection('rooms').doc(id)

    await room.update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        type: 'NOTICE',
        content: `${this.$store.getters.getUserNickname}님이 퇴장하셨습니다.`,
        date: new Date(),
        owner: null
      }),
      users: firebase.firestore.FieldValue.arrayRemove({
        ipAddr: this.$store.getters.getUserIpAddr,
        nickname: this.$store.getters.getUserNickname
      })
    })

    next()
  }
}
</script>

<style lang="postcss" scoped>
.message-input:disabled {
  @apply bg-gray-300;
}
</style>
