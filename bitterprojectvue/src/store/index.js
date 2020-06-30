import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8iLCJwYXNzd29yZCI6ImRlbW8iLCJpYXQiOjE1OTMwODMyODV9.Yba1nIUQARMOFs4ynSmW6VckripQYntKxqM1FoTjmkg'
      token: localStorage.token,
      userid: localStorage.userid
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
