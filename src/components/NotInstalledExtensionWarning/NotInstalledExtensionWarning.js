import { EXTENSION_ID } from '@/services/constants';

export default {
  name: 'NotInstalledExtensionWarning',
  data() {
    return {
      closedByUser: false,
      link: `https://chrome.google.com/webstore/detail/test-video-capture-app/${EXTENSION_ID}`,
    };
  },
  methods: {
    close() {
      this.closedByUser = true;
    },
  },
};
