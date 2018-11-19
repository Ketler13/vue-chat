<template>
  <div
    v-if="!closedByUser"
    class="not-installed-extension-warning"
  >
    <v-icon>warning</v-icon>
    <p>
      You can not share your screen because extension is missing.
      Please
      <a
        :href="link"
        target="blank"
        class="extension-link"
      >
        install it
      </a>
      and refresh page.
    </p>
    <v-icon
      class="close-icon"
      @click="close"
    >
      clear
    </v-icon>
  </div>
</template>

<script src="./NotInstalledExtensionWarning.js"></script>
<style scoped lang="scss" src="./NotInstalledExtensionWarning.scss"></style>
