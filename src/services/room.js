/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import store from '@/store';
import {
  SET_PREVIEW_TRACKS,
  SET_PREVIEW_ERROR,
  SET_ROOM_CONNECTION_STATUS,
  SET_EXTENSION_STATUS,
  SET_PARTICIPANT_TRACKS,
  REMOVE_PREVIEW_TRACKS,
  SHARE_SCREEN,
  UNSHARE_SCREEN,
} from '@/store/room/mutationTypes';
import {
  ROOM_CONNECTION_SUCCESS,
  ROOM_CONNECTION_PENDING,
  ROOM_CONNECTION_FAIL,
  ROOM_CONNECTION_DISCONNECTED,
  ROLE_USER,
  ROLE_PEER,
} from '@/store/room/constants';

import { EXTENSION_ID } from '@/services/constants';
import { isChrome, isFirefox } from '@/services/browser';

const isBrowserChrome = isChrome();
const isBrowserFirefox = isFirefox();
const previewTracks = null;

let extensionInstalled = false;
let activeRoom = null;
let connectedToRoom = false;
let screenTrack = null;

// public methods

export function connectToRoom(roomName) {
  if (!connectedToRoom) {
    const { token } = store.state;
    const connectOptions = {
      name: roomName,
      logLevel: 'debug',
    };

    if (previewTracks) {
      connectOptions.tracks = previewTracks;
    }

    resetPreviewError();
    setRoomConnectionStatus(ROOM_CONNECTION_PENDING);

    return Video.connect(token, connectOptions)
      .then(onRoomJoined)
      .catch(onRoomConnectionFailed);
  }

  return Promise.reject();
}

export function initLocalPreview() {
  const promise = previewTracks
    ? Promise.resolve(previewTracks)
    : Video.createLocalTracks();

  return promise
    .then(setPreviewTracks)
    .catch(setPreviewError);
}

export function finishLocalPreview() {
  removePreviewTracks();
}

export function leaveRoom() {
  if (activeRoom) {
    activeRoom.disconnect();
    activeRoom = null;
    connectedToRoom = false;
    setRoomConnectionStatus(ROOM_CONNECTION_DISCONNECTED);
    resetPreviewError();
  }
}

export function shareScreen() {
  return getUserScreen()
    .then(onGetUserScreenSuccess)
    .catch(onGetUserScreenFail);
}

export function unShareScreen() {
  removeScreenSharing();
  activeRoom.localParticipant.unpublishTrack(screenTrack);
  screenTrack = null;
}

// private methods

function onRoomJoined(room) {
  console.log(room.participants);
  activeRoom = room;
  connectedToRoom = true;
  setRoomConnectionStatus(ROOM_CONNECTION_SUCCESS);
  checkExtension();
  handleParticipantTracksAdding(room.localParticipant, ROLE_USER);

  room.participants
    .forEach(participant => handleParticipantTracksAdding(participant, ROLE_PEER));

  room.on('participantConnected', onParticipantConnected);
  room.on('trackAdded', onTrackAdded);
  room.on('trackRemoved', onTrackRemoved);
  room.on('participantDisconnected', onParticipantDisconnected);

  // Once the LocalParticipant leaves the room, detach the Tracks
  // of all Participants, including that of the LocalParticipant.
  room.on('disconnected', onRoomDisconnected);
}

function onRoomConnectionFailed(err) {
  console.log(err);
  activeRoom = null;
  connectedToRoom = false;
  setRoomConnectionStatus(ROOM_CONNECTION_FAIL);
}

function onRoomDisconnected() {
  console.log('Left');
  if (previewTracks) {
    previewTracks.forEach(track => track.stop());
  }
  detachParticipantTracks(activeRoom.localParticipant);
  activeRoom.participants.forEach(detachParticipantTracks);
  activeRoom = null;
}

function handleParticipantTracksAdding(participant, role) {
  const tracks = Array.from(participant.tracks.values());
  setParticipantTracks(tracks, role);
}

// function handleParticipantTracksRemoving(participant) {
//   var tracks = Array.from(participant.tracks.values());
//   setParticipantTracks(tracks);
// }

function onParticipantConnected(participant) {
  console.log(participant.identity);
}

function onTrackAdded(track, participant) {
  console.log(participant.identity + ' added track: ' + track.kind);
  setParticipantTracks([track], ROLE_PEER);
}

function onTrackRemoved(track, participant) {
  console.log(participant.identity + ' removed track: ' + track.kind);
  // detachTracks([track]);
}

function onParticipantDisconnected(participant) {
  log("Participant '" + participant.identity + "' left the room");
  detachParticipantTracks(participant);
}

function getUserScreen() {
  if (!canShareScreen()) {
    return false;
  }

  if (isBrowserChrome) {
    return getChromeScreen();
  }

  if (isBrowserFirefox) {
    return getFirefoxScreen();
  }

  return false;
}

function getChromeScreen() {
  return createChromeExtensionPromise()
    .then(onChromeExtensionSuccess);
}

function getFirefoxScreen() {
  return window.navigator.mediaDevices.getUserMedia({
    video: {
      mediaSource: 'screen',
    },
  });
}

function createChromeExtensionPromise() {
  return new Promise((resolve, reject) => {
    const request = {
      sources: ['window', 'screen', 'tab'],
    };
    window.chrome.runtime.sendMessage(EXTENSION_ID, request, (response) => {
      if (response && response.type === 'success') {
        resolve({ streamId: response.streamId });
      } else {
        reject(new Error('Could not get stream'));
      }
    });
  });
}

function onChromeExtensionSuccess(response) {
  return window.navigator.mediaDevices.getUserMedia({
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: response.streamId,
      },
    },
  });
}

function onGetUserScreenSuccess(stream) {
  setScreenSharing();
  screenTrack = stream.getVideoTracks()[0];
  activeRoom.localParticipant.publishTrack(screenTrack);
}

function onGetUserScreenFail(error) {
  removeScreenSharing();
  console.error('onGetUserScreenFail', error);
}

function checkExtension() {
  const promise = new Promise((resolve) => {
    const onResponse = (response) => {
      const isInstalled = Boolean(response);
      extensionInstalled = isInstalled;
      resolve(isInstalled);
    };
    window.chrome.runtime.sendMessage(EXTENSION_ID, 'version', onResponse);
  });

  return promise.then(setExtensionStatus);
}

function canShareScreen() {
  return extensionInstalled && (isBrowserChrome || isBrowserFirefox);
}

// store interactors

function setPreviewTracks(tracks) {
  store.commit(SET_PREVIEW_TRACKS, tracks);
}

function removePreviewTracks() {
  store.commit(REMOVE_PREVIEW_TRACKS);
}

function setPreviewError() {
  store.commit(SET_PREVIEW_ERROR, true);
}

function resetPreviewError() {
  store.commit(SET_PREVIEW_ERROR, false);
}

function setRoomConnectionStatus(status) {
  store.commit(SET_ROOM_CONNECTION_STATUS, status);
}

function setExtensionStatus(status) {
  store.commit(SET_EXTENSION_STATUS, status);
}

function setParticipantTracks(tracks, role) {
  store.commit(SET_PARTICIPANT_TRACKS, { role, tracks });
}

function setScreenSharing() {
  store.commit(SHARE_SCREEN);
}

function removeScreenSharing() {
  store.commit(UNSHARE_SCREEN);
}

window.addEventListener('beforeunload', leaveRoom);
