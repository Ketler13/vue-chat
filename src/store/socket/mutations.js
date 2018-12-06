import { SET_INCOMING_CALL_STATUS } from './mutationTypes';

export default {
  [SET_INCOMING_CALL_STATUS](state, status) {
    state.incomingCallStatus = status;
  },
};
