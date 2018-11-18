<template>
  <div class="room-controls">
    <v-dialog
      v-if="!connected"
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="#304ffe"
        fab
        large
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Connect to room
        </v-card-title>

        <v-card-text>
          <v-text-field
            type="text"
            class="user-name"
            label="Name: "
            :value="userName"/>
          <v-text-field
            type="text"
            class="room-name"
            disabled
            label="Room"
            :value="roomName"/>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            @click="connectToRoom"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      v-else
      class="connected-buttons"
    >
      <v-btn
        fab
        large
        color="warning"
        @click="leaveRoom"
      >
        <v-icon>clear</v-icon>
      </v-btn>
      <v-btn
        fab
        large
        v-if="isScreenShared"
        class="unshare-screen"
        @click="unShareScreen"
      >
        <v-icon>stop_screen_share</v-icon>
      </v-btn>
      <v-btn
        fab
        large
        v-else
        color="info"
        class="share-screen"
        @click="shareScreen"
      >
        <v-icon>screen_share</v-icon>
      </v-btn>
    </div>
    <div class="preview-toggler-wrapper">
      <v-btn
        fab
        large
        @click="togglePreview"
      >
        <v-icon>{{ isLocalPreviewStarted ? 'videocam_off' : 'videocam' }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script src="./RoomControls.js"></script>
<style scoped lang="scss" src="./RoomControls.scss"></style>
