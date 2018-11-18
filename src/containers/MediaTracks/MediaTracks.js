import AudioTracks from '@/components/AudioTracks';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'MediaTracks',
  components: {
    AudioTracks,
    VideoPreview,
  },
  computed: {
    audioTracks() {
      const { localAudioTracks, remoteAudioTracks } = this.$store.getters;
      return localAudioTracks.concat(remoteAudioTracks);
    },
    videoTracks() {
      const { localVideoTracks, remoteVideoTracks } = this.$store.getters;
      return localVideoTracks.concat(remoteVideoTracks);
    },
  },
};
