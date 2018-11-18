import Vue from 'vue';

import {
  SET_PREVIEW_ERROR,
  SET_ROOM_CONNECTION_STATUS,
  SET_EXTENSION_STATUS,
  SET_PEER,
  REMOVE_PEER,
  SET_TRACKS,
  REMOVE_TRACKS,
  REMOVE_TRACK,
  SHARE_SCREEN,
  UNSHARE_SCREEN,
} from './mutationTypes';

import { detachTrack, detachTracks } from './trackHelper';

export default {
  /* eslint-disable no-param-reassign */
  [SET_PREVIEW_ERROR](state, error) {
    state.previewError = error;
  },
  [SET_ROOM_CONNECTION_STATUS](state, status) {
    state.connectionStatus = status;
  },
  [SET_EXTENSION_STATUS](state, status) {
    state.extensionInstalled = status;
  },
  [SET_PEER](state, peer) {
    state.peer = peer;
  },
  [REMOVE_PEER](state) {
    state.peer = null;
  },
  [SET_TRACKS](state, { role, tracks }) {
    tracks.forEach((track) => {
      Vue.set(state[role], track.name, track);
    });
  },
  [REMOVE_TRACKS](state, role) {
    detachTracks(Object.values(state[role]));
    state[role] = {};
  },
  [REMOVE_TRACK](state, { role, id }) {
    detachTrack(state[role][id]);
    Vue.delete(state[role], id);
  },
  [SHARE_SCREEN](state) {
    state.screenShared = true;
  },
  [UNSHARE_SCREEN](state) {
    state.screenShared = false;
  },
  /* eslint-denable no-param-reassign */
};
