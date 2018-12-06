import axios from 'axios';

/* eslint-disable-next-line import/prefer-default-export */
export function getToken(userName) {
  const BASE_PART = '/token';
  const IDENTITY_PART = `identity=${encodeURIComponent(userName)}`;
  const url = `${BASE_PART}?${IDENTITY_PART}`;
  return axios.get(url)
    .then(data => data.data.token);
}
