<template>
  <div class="user-room-controls">
    <div class="room-input">
      <label for="userName">
        Name: 
      </label>
      <input
        type="text"
        name="userName"
        class="user-name"
        v-model="userName"/>
      <label for="roomName">
        Room: 
      </label>
      <input
        type="text"
        name="roomName"
        class="room-name"
        v-model="roomName"/>
    </div>
    <div class="room-connect-buttons">
      <button
        v-if="!connected"
        class="connect-button"
        :disabled="isConnectButtondisabled"
        @click="connectToRoom"
      >
        Connect
      </button>
      <button
        v-else
        class="disconnect-button"
      >
        Disconnect
      </button>
    </div>
    <div
      v-if="connected"
      class="room-display-share-button"
    >
      <button class="share-display-toggler">
        Share / Unshare
      </button>
    </div>
  </div>
</template>

<script src="./UserRoomControls.js"></script>
<style scoped lang="scss" src="./UserRoomControls.scss"></style>

