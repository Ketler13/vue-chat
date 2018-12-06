import { SET_INCOMING_CALL_STATUS } from '@/store/socket/mutationTypes';
import { callStatuses } from '@/store/socket/constants';
import { initImcomingCallsListening } from '@/services/socket';

export default {
  name: 'IncomingCall',
  computed: {
    incomingCall() {
      return this.$store.getters.isIncomingCall;
    },
  },
  mounted() {
    initImcomingCallsListening();
  },
  methods: {
    acceptCall() {
      this.$store.commit(SET_INCOMING_CALL_STATUS, callStatuses.ACCEPTED);
    },
    declineCall() {
      this.$store.commit(SET_INCOMING_CALL_STATUS, callStatuses.DECLINED);
    },
    finishCall() {
      this.$store.commit(SET_INCOMING_CALL_STATUS, null);
    },
  },
};
