import VideoPreview from '@/components/VideoPreview';
import TogglerButton from '@/components/TogglerButton';

import { initLocalPreview, finishLocalPreview } from '@/services/room';

export default {
  name: 'UserCameraControls',
  components: {
    VideoPreview,
    TogglerButton,
  },
  data() {
    return {
      togglerActiveTitle: 'Stop preview',
      togglerInActiveTitle: 'Start preview',
    };
  },
  computed: {
    previewTracks() {
      return this.$store.state.room.previewTracks;
    },
    previewError() {
      return this.$store.state.room.previewError;
    },
  },
  methods: {
    showPreview() {
      initLocalPreview();
    },
    hidePreview() {
      finishLocalPreview();
    },
  },
};
