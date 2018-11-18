import AudioTracks from '@/components/AudioTracks';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'UserCameraControls',
  components: {
    AudioTracks,
    VideoPreview,
  },
  data() {
    return {
      togglerActiveTitle: 'Stop preview',
      togglerInActiveTitle: 'Start preview',
    };
  },
  computed: {
    audioTracks() {
      return this.$store.getters.localAudioTracks;
    },
    videoTracks() {
      return this.$store.getters.localVideoTracks;
    },
    previewError() {
      return this.$store.state.room.previewError;
    },
  },
};
