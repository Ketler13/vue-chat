import mutations from './mutations';
// import actions from './actions';
import getters from './getters';

import { ROOM_CONNECTION_DISCONNECTED, ROLE_USER, ROLE_PEER } from './constants';

const state = {
  connectionStatus: ROOM_CONNECTION_DISCONNECTED,
  connectionError: false,
  previewTracks: null,
  previewError: null,
  extensionInstalled: false,
  screenShared: false,
  tracks: {
    [ROLE_USER]: [],
    [ROLE_PEER]: [],
  },
};

export default {
  state,
  getters,
  mutations,
  // actions,
};
