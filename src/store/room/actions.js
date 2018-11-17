import { SET_EXTENSION_STATUS } from './mutationTypes';
import { GET_EXTENSION_STATUS } from './actionTypes';
import { checkExtension } from '@/services/extension';

export default {
  [GET_EXTENSION_STATUS]({ commit }) {
    return checkExtension()
      .then(status => commit(SET_EXTENSION_STATUS, status));
  },
};
