<template>
  <div class="incoming-call">
    <v-dialog
      v-model="incomingCall"
      content-class="incoming-call-notifier"
      width="300"
      :persistent="true"
    >
      <v-layout column align-center justify-space-between>
        <div class="incoming-call-title">Incoming call</div>
        <div class="incoming-call-actions">
          <v-btn
            fab
            large
            color="#26a69a"
            @click="acceptCall"
          >
            <v-icon color="white">call</v-icon>
          </v-btn>
          <v-btn
            fab
            large
            color="#b71c1c"
            @click="declineCall"
          >
            <v-icon color="white">call_end</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-dialog>
  </div>
</template>

<script src="./IncomingCall.js"></script>
<style scoped lang="scss" src="./IncomingCall.scss"></style>
