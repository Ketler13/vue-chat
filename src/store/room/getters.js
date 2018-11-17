import {
  ROOM_CONNECTION_DISCONNECTED,
  ROOM_CONNECTION_SUCCESS,
  ROOM_CONNECTION_FAIL,
  ROOM_CONNECTION_PENDING,
  ROLE_USER,
  ROLE_PEER,
} from './constants';

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
  userTracks(state) {
    return state.tracks[ROLE_USER];
  },
  peerTracks(state) {
    return state.tracks[ROLE_PEER];
  },
};
