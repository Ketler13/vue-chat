export default {
  name: 'VideoPreview',
  props: {
    track: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      scaled: false,
      containerStyles: null,
      videoStyles: null,
    };
  },
  mounted() {
    this.attachTrack();
  },
  methods: {
    attachTrack() {
      this.$refs.previewContainer.appendChild(this.track.attach());
    },
    toggleScale() {
      this.scaled = !this.scaled;
      // this.$refs.previewContainer.classList.toggle('scaled');
      if (this.scaled) {
        this.scaleVideo();
        this.subscribeToClickOut();
        this.subscribeToEsc();
      } else {
        this.descaleVideo();
        this.unsubscribeFromClickOut();
        this.unsubscribeFromEsc();
      }
    },
    subscribeToClickOut() {
      window.addEventListener('click', this.clickOutSubscriber);
    },
    subscribeToEsc() {
      window.addEventListener('keydown', this.escSubscriber);
    },
    unsubscribeFromClickOut() {
      window.removeEventListener('click', this.clickOutSubscriber);
    },
    unsubscribeFromEsc() {
      window.removeEventListener('keydown', this.escSubscriber);
    },
    clickOutSubscriber(ev) {
      if (!ev.target.closest('.video-preview')) {
        this.toggleScale();
        this.unsubscribeFromClickOut();
      }
    },
    escSubscriber(ev) {
      if (ev.keyCode === 27) {
        this.toggleScale();
        this.unsubscribeFromClickOut();
      }
    },
    scaleVideo() {
      const container = this.$refs.previewContainer;
      const video = this.$el.querySelector('video');

      if (!this.scaleStyles) {
        this.calulateScaleStyles();
      }

      container.classList.add('scaled');

      Object.entries(this.containerStyles)
        .forEach(([property, value]) => {
          container.style[property] = value;
        });

      Object.entries(this.videoStyles)
        .forEach(([property, value]) => {
          video.style[property] = value;
        });
      this.$emit('scaled');
    },
    descaleVideo() {
      this.$refs.previewContainer.classList.remove('scaled');
      this.$refs.previewContainer.style = '';
      this.$el.querySelector('video').style.transform = '';
      this.$emit('descaled');
    },
    calulateScaleStyles() {
      const { innerWidth, innerHeight } = window;
      const maxwWidth = innerWidth * 0.9;
      const maxHeight = innerHeight * 0.9;
      const { width: realWidth, height: realHeight } = this.track.dimensions;
      const windowRatio = innerWidth / innerHeight;
      const trackRatio = realWidth / realHeight;
      const scaleByHeight = windowRatio > trackRatio;

      let computedWidth = realWidth;
      let computedHeight = realHeight;
      let scale = 1;

      if (scaleByHeight) {
        scale = maxHeight / realHeight;
        computedHeight = maxHeight;
        computedWidth = realWidth * scale;
      } else {
        scale = maxwWidth / realWidth;
        computedWidth = maxwWidth;
        computedHeight = realHeight * scale;
      }

      scale = Math.max(scale, 1);

      const left = (innerWidth - computedWidth) / 2;
      const right = left;
      const top = (innerHeight - computedHeight) / 2;
      const bottom = top;

      this.containerStyles = {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
        width: `${computedWidth}px`,
        height: `${computedHeight}px`,
        zIndex: '20',
      };

      this.videoStyles = {
        transform: `scale(${scale})`,
      };
    },
  },
};
