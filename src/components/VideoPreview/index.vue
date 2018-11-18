<template>
  <div
    class="video-preview"
    ref="previewContainer"
    @dblclick="toggleScale"
  >
    <v-btn
      class="scale-toggler"
      absolute
      color="transparent"
      :icon="true"
      small
      fab
      @click="toggleScale"
    >
      <v-icon v-if="scaled">fullscreen_exit</v-icon>
      <v-icon v-else>zoom_out_map</v-icon>
    </v-btn>
  </div>
</template>

<script src="./VideoPreview.js"></script>
<style scoped lang="scss" src="./VideoPreview.scss"></style>
