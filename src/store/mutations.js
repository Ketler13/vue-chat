import { SET_TOKEN } from './mutationTypes';

export default {
  /* eslint-disable no-param-reassign */
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  /* eslint-denable no-param-reassign */
};
