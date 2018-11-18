export default {
  name: 'AudioTracks',
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    tracks(tracks) {
      if (tracks && tracks.length) {
        this.activateAudio();
      }
    },
  },
  methods: {
    activateAudio() {
      this.$nextTick(this.attachTracks);
    },
    attachTracks() {
      this.tracks.forEach((track) => {
        this.$refs.container.appendChild(track.attach());
      });
    },
  },
};
