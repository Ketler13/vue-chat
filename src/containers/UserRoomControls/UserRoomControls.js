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
      return false;
    },
    isConnectButtondisabled() {
      return !this.userName || !this.roomName;
    },
  },
  methods: {
    connectToRoom() {
      
    },
  },
};
