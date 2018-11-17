import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'PeerSection',
  components: {
    VideoPreview,
  },
  computed: {
    peerTracks() {
      return this.$store.getters.peerTracks;
    },
  },
};
