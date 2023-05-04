/*
 * 全局状态机
 */
import Vue from 'vue';
import Vuex from 'vuex';
import menu from './menu';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
    SET_USERNAME (state, data) {
      localStorage.userInfo = JSON.stringify(data);
    }
  },
  actions: {
  },
  modules: {
    menu,
  }
});

export default store;
