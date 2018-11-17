export default {
  name: 'AppHeader',
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
};
