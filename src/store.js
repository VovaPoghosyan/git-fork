import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    repo: [],
    user: [],
  },
  mutations: {
    SET_REPO: (state, payload) => {
      state.repo.unshift(payload);
    },

  },
  actions: {

  },
  getters: {
    REPO: state => {
      return state.repo;
    },
  }
})