import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/plugins/firebase'

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
    async createRoom({ state }) {
      await db.collection('rooms').add({
        owner: {
          ipAddr: state.user.ipAddr,
          nickname: state.user.nickname
        },
        title: Math.floor(Math.random() * 99999999 + 10000000).toString(),
        messages: []
      })
    }
  }
})
