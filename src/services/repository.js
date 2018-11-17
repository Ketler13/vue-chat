import axios from 'axios';

/* eslint-disable-next-line import/prefer-default-export */
export function getToken(userName) {
  const BASE_PART = 'https://us-central1-vchat-59d2d.cloudfunctions.net/api/token';
  const IDENTITY_PART = `identity=${encodeURIComponent(userName)}`;
  const url = `${BASE_PART}?${IDENTITY_PART}`;
  return axios.get(url)
    .then(data => data.data.token);
}
