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
