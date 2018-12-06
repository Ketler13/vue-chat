import MediaTracks from '@/containers/MediaTracks';
import RoomControls from '@/containers/RoomControls';
import NotInstalledExtensionWarning from '@/components/NotInstalledExtensionWarning';
import IncomingCall from '@/containers/IncomingCall';

export default {
  name: 'MainView',
  components: {
    MediaTracks,
    RoomControls,
    NotInstalledExtensionWarning,
    IncomingCall,
  },
  computed: {
    extensionInstalled() {
      return this.$store.state.room.extensionInstalled;
    },
  },
};
