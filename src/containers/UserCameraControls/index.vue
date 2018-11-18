<template>
  <div class="user-camera-controls">
    <audio-tracks :tracks="audioTracks"/>
    <div
      v-if="!videoTracks.length"
      class="preview-mock">
      <p>Please, click <v-icon color="white">videocam</v-icon> to allow preview</p>
    </div>
    <video-preview
      v-for="video in videoTracks"
      class="video-preview"
      :track="video"/>
  </div>
</template>

<script src="./UserCameraControls.js"></script>
<style scoped lang="scss" src="./UserCameraControls.scss"></style>
