import { AUDIO, VIDEO } from './constants';

export const isAudio = track => track.kind === AUDIO;
export const isVideo = track => track.kind === VIDEO;

export const detachTrack = track => track && track.detach()
  .forEach(detachedElement => detachedElement.remove());

export const detachTracks = tracks => tracks.forEach(detachTrack);
