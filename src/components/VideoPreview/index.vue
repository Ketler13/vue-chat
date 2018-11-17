<template>
  <div
    class="video-preview"
    ref="previewContainer"
  >
    <button
      class="scale-toggler"
      @click="toggleScale"
    >
      <span class="toggler-title left">{{ scaled ? '🡒 🡐' : '🡐 🡒' }}</span>
      <span class="toggler-title right">{{ scaled ? '🡒 🡐' : '🡐 🡒' }}</span>
    </button>
  </div>
</template>

<script src="./VideoPreview.js"></script>
<style scoped lang="scss" src="./VideoPreview.scss"></style>
