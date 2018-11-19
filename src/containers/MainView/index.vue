<template>
  <div class="main-view">
    <media-tracks class="media-tracks" />
    <room-controls class="room-controls" />
    <not-installed-extension-warning v-if="!extensionInstalled" />
  </div>
</template>

<script src="./MainView.js"></script>
<style scoped lang="scss" src="./MainView.scss"></style>
