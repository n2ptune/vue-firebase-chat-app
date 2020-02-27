import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/plugins/firebase'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },

  getters: {
    getUserIpAddr: state => state.user.ipAddr,
    getUserNickname: state => state.user.nickname
  },

  actions: {
    async createRoom({ state }, { title }) {
      await db.collection('rooms').add({
        owner: {
          ipAddr: state.user.ipAddr,
          nickname: state.user.nickname
        },
        title,
        messages: [],
        users: [],
        createdAt: new Date()
      })
    },

    async connectUser({ state, commit }) {
      if (state.user) return
      /**
       * @get Cloudflare 서비스로 아이피 가져옴
       */
      const { data } = await axios.get(
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
          const storeMutate = async user => await commit('setUser', user)

          if (qs.empty) {
            // 최초 사용자
            const { data: dummy } = await axios.get(
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
    }
  }
})
