import Vue from 'vue';

import {
  SET_PREVIEW_TRACKS,
  SET_PREVIEW_ERROR,
  SET_ROOM_CONNECTION_STATUS,
  SET_EXTENSION_STATUS,
  SET_PARTICIPANT_TRACKS,
  REMOVE_PREVIEW_TRACKS,
  SHARE_SCREEN,
  UNSHARE_SCREEN,
} from './mutationTypes';

function detachTracks(tracks) {
  tracks
    .forEach(track => track.detach()
      .forEach(detachedElement => detachedElement.remove()));
}

export default {
  /* eslint-disable no-param-reassign */
  [SET_PREVIEW_TRACKS](state, tracks) {
    state.previewTracks = tracks;
  },
  [SET_PREVIEW_ERROR](state, error) {
    state.previewError = error;
  },
  [SET_ROOM_CONNECTION_STATUS](state, status) {
    state.connectionStatus = status;
  },
  [SET_EXTENSION_STATUS](state, status) {
    state.extensionInstalled = status;
  },
  [SET_PARTICIPANT_TRACKS](state, { role, tracks }) {
    Vue.set(state.tracks, role, tracks);
  },
  [REMOVE_PREVIEW_TRACKS](state) {
    detachTracks(state.previewTracks);
    state.previewTracks = null;
  },
  [SHARE_SCREEN](state) {
    state.screenShared = true;
  },
  [UNSHARE_SCREEN](state) {
    state.screenShared = false;
  },
  /* eslint-denable no-param-reassign */
};
