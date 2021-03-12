import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
  },
  mutations: {
    setToken(state, data) {
      state.accessToken = data;
    },
    removeToken(state, data) {
      state.accessToken = data;
    },
  },
  actions: {},
  modules: {},
});
