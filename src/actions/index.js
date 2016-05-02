import axios from 'axios';

// get top twitch channels
export const GET_CHANNELS = 'GET_CHANNELS';
export function getChannels() {
  const request = axios.get('https://api.twitch.tv/kraken/streams?api_version=3&limit=10');
  return {
    type: GET_CHANNELS,
    payload: request,
  };
}

// set the currently active channel
export const SET_CHANNEL = 'SET_CHANNEL';
export function setChannel(channel) {
  return {
    type: SET_CHANNEL,
    payload: channel,
  };
}

export const GET_MESSAGE = 'GET_MESSAGE';
export function getMessage(data) {
  return {
    type: GET_MESSAGE,
    payload: data,
  };
}
