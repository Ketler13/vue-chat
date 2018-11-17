<template>
  <div class="peer-section">
    <div class="video-wrapper">
      <video-preview
        class="camera-preview"
        :tracks="peerTracks"/>
    </div>
  </div>
</template>

<script src="./PeerSection.js"></script>
<style scoped lang="scss" src="./PeerSection.scss"></style>