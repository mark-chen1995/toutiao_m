import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/local_storage'

Vue.use(Vuex)
const TOKEN_KEY = 'toutiao_token'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 持久化
      setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
