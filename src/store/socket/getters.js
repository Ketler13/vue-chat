import { callStatuses } from './constants';

export default {
  isIncomingCall(state) {
    return state.incomingCallStatus === callStatuses.INCOMING;
  },
};
