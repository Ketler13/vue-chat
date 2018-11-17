<template>
  <div id="app">
    <app-header />
    <main-view />
  </div>
</template>

<script>
import { GET_TOKEN } from '@/store/actionTypes';
import NotInstalledExtensionWarning from '@/components/NotInstalledExtensionWarning';
import AppHeader from '@/containers/AppHeader';
import MainView from '@/containers/MainView';

export default {
  components: {
    NotInstalledExtensionWarning,
    AppHeader,
    MainView,
  },
  created() {
    this.getToken();
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
  },
  methods: {
    getToken() {
      return this.$store.dispatch(GET_TOKEN);
    },
  },
};
</script>

<style src="@/assets/styles/reset.css"></style>
<style lang="scss" src="@/assets/styles/common.scss"></style>
