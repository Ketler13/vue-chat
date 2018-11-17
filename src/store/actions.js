import { getToken } from '@/services/repository';
import { SET_TOKEN } from './mutationTypes';
import { GET_TOKEN } from './actionTypes';

export default {
  [GET_TOKEN]({ commit, state }) {
    return getToken(state.userName)
      .then(token => commit(SET_TOKEN, token));
  },
};
