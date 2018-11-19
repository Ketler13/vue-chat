import {
  connectToRoom,
  leaveRoom,
  shareScreen,
  unShareScreen,
  initLocalPreview,
  finishLocalPreview,
} from '@/services/room';

export default {
  name: 'RoomControls',
  data() {
    return {
      dialog: false,
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
    isLocalPreviewStarted() {
      return !!this.$store.getters.localTracks.length;
    },
    isExtensionInstalled() {
      return this.$store.state.room.extensionInstalled;
    },
  },
  methods: {
    connectToRoom() {
      this.dialog = false;
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
    togglePreview() {
      if (this.isLocalPreviewStarted) {
        finishLocalPreview();
      } else {
        initLocalPreview();
      }
    },
  },
};
