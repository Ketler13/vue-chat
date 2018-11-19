export default {
  name: 'NotInstalledExtensionWarning',
  data() {
    return {
      closedByUser: false,
      link: 'https://chrome.google.com/webstore/detail/test-video-capture-app/cmmhaddbgehdnhadjajelhilfmjelcmj',
    };
  },
  methods: {
    close() {
      this.closedByUser = true;
    },
  },
};
