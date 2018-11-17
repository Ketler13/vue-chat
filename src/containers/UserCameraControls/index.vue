<template>
  <div class="user-camera-controls">
    <video-preview
      class="video-preview"
      :tracks="previewTracks"/>
    <toggler-button
      :activeTitle="togglerActiveTitle"
      :inActiveTitle="togglerInActiveTitle"
      @show="showPreview"
      @hide="hidePreview"/>
  </div>
</template>

<script src="./UserCameraControls.js"></script>
<style scoped lang="scss" src="./UserCameraControls.scss"></style>
