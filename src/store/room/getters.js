import {
  ROOM_CONNECTION_DISCONNECTED,
  ROOM_CONNECTION_SUCCESS,
  ROOM_CONNECTION_FAIL,
  ROOM_CONNECTION_PENDING,
  LOCAL_TRACK,
  REMOTE_TRACK,
} from './constants';

import { isAudio, isVideo } from './trackHelper';

export default {
  isConnectionToRoomSucceed(state) {
    return state.connectionStatus === ROOM_CONNECTION_SUCCESS;
  },
  isConnectionToRoomFailed(state) {
    return state.connectionStatus === ROOM_CONNECTION_FAIL;
  },
  isConnectionToRoomPending(state) {
    return state.connectionStatus === ROOM_CONNECTION_PENDING;
  },
  isDisconnectedFromRoom(state) {
    return state.connectionStatus === ROOM_CONNECTION_DISCONNECTED;
  },
  localTracks(state) {
    return Object.values(state[LOCAL_TRACK]);
  },
  remoteTracks(state) {
    return Object.values(state[REMOTE_TRACK]);
  },
  localAudioTracks(state, { localTracks = [] }) {
    return localTracks.filter(isAudio);
  },
  localVideoTracks(state, { localTracks = [] }) {
    return localTracks.filter(isVideo);
  },
  remoteAudioTracks(state, { remoteTracks = [] }) {
    return remoteTracks.filter(isAudio);
  },
  remoteVideoTracks(state, { remoteTracks = [] }) {
    return remoteTracks.filter(isVideo);
  },
};
