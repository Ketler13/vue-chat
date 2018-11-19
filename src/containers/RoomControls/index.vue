<template>
  <div class="room-controls">
    <v-dialog
      v-if="!connected"
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="#26a69a"
        :disabled="connecting"
        fab
        large
      >
        <v-icon
          color="white"
          :class="{ connecting: connecting }"
        >
          {{ connecting ? 'phone_forwarded' : 'call' }}
        </v-icon>
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
            color="#9fa8da"
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
        v-if="isScreenShared"
        fab
        large
        class="unshare-screen"
        @click="unShareScreen"
      >
        <v-icon>stop_screen_share</v-icon>
      </v-btn>
      <v-btn
        v-else
        fab
        large
        color="info"
        class="share-screen"
        :disabled="!isExtensionInstalled"
        @click="shareScreen"
      >
        <v-icon>screen_share</v-icon>
      </v-btn>
      <v-btn
        fab
        large
        color="#b71c1c"
        @click="leaveRoom"
      >
        <v-icon color="white">call_end</v-icon>
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
