/* constants */
export const domain = 'https://music.musicaudience.info';
export const genresEP = '/api/v1/music/genres';
export const genreSearchEP = '/api/v1/music/genres/<id>/artists'
export const artistEP = '/api/v1/music/artists/<id>'
export const API_KEY = 'apikey f044f26d5e5c4fc185d9a73c0e41'

/* action types */
export const UNSPECIFIED_ERROR = 'UNSPECIFIED_ERROR';
export const PENDING = 'PENDING';
export const GET_API = 'GET_API';
export const SET_PROCESSING = 'SET_PROCESSING';

/* action creators */
export const setProcessing = processing => {
  return { type: SET_PROCESSING, processing };
};


