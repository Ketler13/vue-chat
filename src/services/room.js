/* eslint-disable no-use-before-define */
import Video from 'twilio-video';

import store from '@/store';
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
} from '@/store/room/mutationTypes';

import {
  ROOM_CONNECTION_SUCCESS,
  ROOM_CONNECTION_PENDING,
  ROOM_CONNECTION_FAIL,
  ROOM_CONNECTION_DISCONNECTED,
  LOCAL_TRACK,
  REMOTE_TRACK,
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

checkExtension();

// public methods

export function connectToRoom(roomName) {
  if (!connectedToRoom) {
    const { token } = store.state;
    const connectOptions = {
      name: roomName,
      // logLevel: 'debug',
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
    .then(tracks => setParticipantTracks(tracks, LOCAL_TRACK))
    .catch(setPreviewError);
}

export function finishLocalPreview() {
  removeLocalTracks();
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
  activeRoom = room;
  connectedToRoom = true;
  setRoomConnectionStatus(ROOM_CONNECTION_SUCCESS);
  checkExtension();
  if (!store.getters.localVideoTracks.length) {
    handleParticipantTracksAdding(room.localParticipant, LOCAL_TRACK);
  }

  room.participants
    .forEach(participant => handleParticipantTracksAdding(participant, REMOTE_TRACK));

  room.on('participantConnected', onParticipantConnected);
  room.on('trackAdded', onTrackAdded);
  room.on('trackRemoved', onTrackRemoved);
  room.on('participantDisconnected', onParticipantDisconnected);
  room.on('disconnected', onRoomDisconnected);
}

function onRoomConnectionFailed() {
  activeRoom = null;
  connectedToRoom = false;
  setRoomConnectionStatus(ROOM_CONNECTION_FAIL);
}

function onRoomDisconnected() {
  if (previewTracks) {
    previewTracks.forEach(track => track.stop());
  }
  removeLocalTracks();
  removeRemoteTracks();
  activeRoom = null;
}

function handleParticipantTracksAdding(participant, role) {
  const tracks = Array.from(participant.tracks.values());
  setParticipantTracks(tracks, role);
}

function onParticipantConnected(participant) {
  setPeer(participant);
}

function onTrackAdded(track) {
  setParticipantTracks([track], REMOTE_TRACK);
}

function onTrackRemoved(track) {
  removeTrackById(track.name);
}

function onParticipantDisconnected() {
  removePeer();
  removeRemoteTracks();
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
  const [track] = stream.getVideoTracks();
  screenTrack = track;
  activeRoom.localParticipant.publishTrack(screenTrack);
}

function onGetUserScreenFail() {
  removeScreenSharing();
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

function setPeer(peer) {
  store.commit(SET_PEER, peer);
}

function removePeer() {
  store.commit(REMOVE_PEER);
}

function setParticipantTracks(tracks, role) {
  store.commit(SET_TRACKS, { role, tracks });
}

function removeRemoteTracks() {
  store.commit(REMOVE_TRACKS, REMOTE_TRACK);
}

function removeLocalTracks() {
  store.commit(REMOVE_TRACKS, LOCAL_TRACK);
}

function removeTrackById(id) {
  store.commit(REMOVE_TRACK, id);
}

function setScreenSharing() {
  store.commit(SHARE_SCREEN);
}

function removeScreenSharing() {
  store.commit(UNSHARE_SCREEN);
}

window.addEventListener('beforeunload', leaveRoom);
