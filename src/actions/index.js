import axios from 'axios';

const ROOT_URL = 'http://localhost:3000/api';

// get top twitch channels
export const GET_CHANNELS = 'GET_CHANNELS';
export function getChannels() {
  const request = axios.get('https://api.twitch.tv/kraken/streams?api_version=3&limit=25');
  return {
    type: GET_CHANNELS,
    payload: request,
  };
}

// set the currently active channel
export const SET_CHANNEL = 'SET_CHANNEL';
export function setChannel(channel) {
  const request = axios.post(`${ROOT_URL}/channels/subscribe`, channel);
  return {
    type: SET_CHANNEL,
    payload: request,
  };
}

// set the currently active channel to null
export const UNSET_CHANNEL = 'UNSET_CHANNEL';
export function unsetChannel() {
  return {
    type: UNSET_CHANNEL,
    payload: null,
  };
}

export const GET_TONE = 'GET_TONE';
export function getTone(data) {
  const request = axios.put(`${ROOT_URL}/watson/tone`, data);
  return {
    type: GET_TONE,
    payload: request,
  };
}
