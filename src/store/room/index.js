import mutations from './mutations';
// import actions from './actions';
import getters from './getters';

import {
  ROOM_CONNECTION_DISCONNECTED,
  LOCAL_TRACK,
  REMOTE_TRACK,
} from './constants';

const state = {
  connectionStatus: ROOM_CONNECTION_DISCONNECTED,
  connectionError: false,
  previewError: null,
  extensionInstalled: true,
  screenShared: false,
  peer: null,
  [LOCAL_TRACK]: {},
  [REMOTE_TRACK]: {},
};

export default {
  state,
  getters,
  mutations,
  // actions,
};
