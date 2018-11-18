<template>
  <div class="media-tracks">
    <div class="video-previews">
      <div
        v-if="!videoTracks.length"
        class="preview-mock">
        <p>Please, click <v-icon color="white">videocam</v-icon> to allow preview</p>
      </div>
      <video-preview
        v-for="video in videoTracks"
        class="video-preview"
        :key="video.name"
        :track="video"/>
    </div>
    <audio-tracks :tracks="audioTracks" />
  </div>
</template>

<script src="./MediaTracks.js"></script>
<style scoped lang="scss" src="./MediaTracks.scss"></style>
