import AudioTracks from '@/components/AudioTracks';
import VideoPreview from '@/components/VideoPreview';

export default {
  name: 'MediaTracks',
  components: {
    AudioTracks,
    VideoPreview,
  },
  data() {
    return {
      scaledIndex: null,
    };
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
  mounted() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    updateScaledIndex(index) {
      this.scaledIndex = index;
    },
    resetScaledIndex() {
      this.scaledIndex = null;
    },
    onKeyDown(ev) {
      const canBeScaled = !Number.isNaN(this.scaledIndex) && this.videoTracks.length > 1;
      if (ev.keyCode === 37 && canBeScaled) {
        this.scalePrevItem();
      } else if (ev.keyCode === 39 && canBeScaled) {
        this.scaleNextItem();
      }
    },
    scalePrevItem() {
      const indexToScale = !this.scaledIndex
        ? this.videoTracks.length - 1
        : (this.scaledIndex || 0) - 1;

      this.scaleItem(indexToScale);
    },
    scaleNextItem() {
      const indexToScale = this.scaledIndex === this.videoTracks.length - 1
        ? 0
        : (this.scaledIndex || 0) + 1;

      this.scaleItem(indexToScale);
    },
    scaleItem(indexToScale) {
      const scaledTrack = this.$refs[`preview${this.scaledIndex}`][0];
      const trackToScale = this.$refs[`preview${indexToScale}`][0];
      this.scaledIndex = indexToScale;
      scaledTrack.toggleScale();
      this.$nextTick(trackToScale.toggleScale);
    },
  },
};
