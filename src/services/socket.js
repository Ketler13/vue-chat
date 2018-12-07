/* eslint-disable no-use-before-define, import/prefer-default-export */

import io from 'socket.io-client';

import store from '@/store';
import { SET_INCOMING_CALL_STATUS } from '@/store/socket/mutationTypes';
import { callStatuses } from '@/store/socket/constants';
import { connectToRoom, leaveRoom } from '@/services/room';

const socket = io('/operators');
const operatorId = socket.id;
// const socket = io.connect('/operators');

export function initImcomingCallsListening() {
  socket.on('incoming call', onIncomingCall);
  socket.on('room created', goToRoom);
}

export function onCallFinished() {
  console.log('finish call');
  socket.emit('finish call');
}

function onIncomingCall({ customerId }) {
  console.log('incoming call', customerId);

  return notifyAboutIncomingCall()
    .then(() => onCallAccepted(customerId))
    .catch(() => onCallDeclined(customerId));
}

function goToRoom(roomName) {
  return connectToRoom(roomName)
    .then(() => {
      socket.emit('operator joined room');
      socket.on('customer disconnected', leaveRoom);
    });
}

function onCallAccepted(customerId) {
  socket.emit('accept call', { query: { customerId } });
}

function onCallDeclined(customerId) {
  socket.emit('call declined', { operatorId, customerId });
}

// store interactors

function notifyAboutIncomingCall() {
  store.commit(SET_INCOMING_CALL_STATUS, callStatuses.INCOMING);
  return new Promise((resolve, reject) => {
    const unwatch = store.watch(
      state => state.socket.incomingCallStatus,
      (value) => {
        unwatch();
        if (value === callStatuses.ACCEPTED) {
          resolve();
        } else {
          reject();
        }
      },
    );
  });
}
