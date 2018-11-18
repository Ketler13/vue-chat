<template>
  <div
    class="media-tracks"
    :class="{ 'with-mock': !videoTracks.length }">
    <div class="video-previews">
      <div
        v-if="!videoTracks.length"
        class="preview-mock">
        <p>Please, click <v-icon color="white">videocam</v-icon> to allow preview</p>
      </div>
      <video-preview
        v-for="(video, index) in videoTracks"
        class="video-preview item"
        :ref="'preview' + index"
        :key="video.name"
        :track="video"
        @scaled="() => updateScaledIndex(index)"
        @descaled="resetScaledIndex"
      />
    </div>
    <audio-tracks :tracks="audioTracks" />
  </div>
</template>

<script src="./MediaTracks.js"></script>
<style scoped lang="scss" src="./MediaTracks.scss"></style>
