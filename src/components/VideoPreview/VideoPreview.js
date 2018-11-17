export default {
  name: 'VideoPreview',
  props: {
    tracks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      scaled: false,
    };
  },
  watch: {
    tracks(tracks) {
      if (tracks && tracks.length) {
        this.activateVideo(tracks);
      } else {
        this.deactivateVideo();
      }
    },
  },
  methods: {
    activateVideo() {
      this.$nextTick(this.attachTracks);
    },
    deactivateVideo() {
    },
    attachTracks() {
      this.tracks.forEach((track) => {
        this.$refs.previewContainer.appendChild(track.attach());
      });
    },
    toggleScale() {
      this.scaled = !this.scaled;
      this.$refs.previewContainer.classList.toggle('scaled');
      if (this.scaled) {
        this.subscribeToClickOut();
      } else {
        this.unsubscribeFromClickOut();
      }
    },
    subscribeToClickOut() {
      window.addEventListener('click', this.clickOutSubscriber);
    },
    unsubscribeFromClickOut() {
      window.removeEventListener('click', this.clickOutSubscriber);
    },
    clickOutSubscriber(ev) {
      if (!ev.target.closest('.video-preview')) {
        this.toggleScale();
        this.unsubscribeFromClickOut();
      }
    },
  },
};
