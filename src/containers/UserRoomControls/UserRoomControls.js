import {
  connectToRoom,
  leaveRoom,
  shareScreen,
  unShareScreen,
} from '@/services/room';

export default {
  name: 'UserRoomControls',
  data() {
    return {
      userName: 'Lemmy Killmister',
      roomName: 'PeerToPeer',
    };
  },
  computed: {
    connected() {
      return this.$store.getters.isConnectionToRoomSucceed;
    },
    connecting() {
      return this.$store.getters.isConnectionToRoomPending;
    },
    failed() {
      return this.$store.getters.isConnectionToRoomFailed;
    },
    disconnected() {
      return this.$store.getters.isDisconnectedFromRoom;
    },
    isConnectButtondisabled() {
      return this.connecting || !this.userName || !this.roomName;
    },
    isScreenShared() {
      return this.$store.state.room.screenShared;
    },
  },
  methods: {
    connectToRoom() {
      return connectToRoom(this.roomName);
    },
    leaveRoom() {
      return leaveRoom();
    },
    shareScreen() {
      return shareScreen();
    },
    unShareScreen() {
      return unShareScreen();
    },
  },
};
