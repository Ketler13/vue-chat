export default {
  name: 'TogglerButton',
  props: {
    activeTitle: String,
    inActiveTitle: String,
  },
  data() {
    return {
      active: false,
      title: this.inActiveTitle,
    };
  },
  methods: {
    toggle() {
      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    },
    show() {
      this.$emit('show');
      this.active = true;
      this.title = this.activeTitle;
    },
    hide() {
      this.$emit('hide');
      this.active = false;
      this.title = this.inActiveTitle;
    },
  },
};
