import Vue from 'vue';
import Vuex from 'vuex';

import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

import room from '@/store/room';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  userName: 'My Lord',
  token: null,
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    room,
  },
  strict: debug,
});
