import MediaTracks from '@/containers/MediaTracks';
import RoomControls from '@/containers/RoomControls';
import NotInstalledExtensionWarning from '@/components/NotInstalledExtensionWarning';

export default {
  name: 'MainView',
  components: {
    MediaTracks,
    RoomControls,
    NotInstalledExtensionWarning,
  },
  computed: {
    extensionInstalled() {
      return this.$store.state.room.extensionInstalled;
    },
  },
};
