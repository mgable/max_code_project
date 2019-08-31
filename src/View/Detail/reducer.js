import { ARTIST_RECEIVED, CLEAR_ARTIST } from '../Search/types';

const initialState = {
  artist: null
};

const Detail = (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_RECEIVED:
      return setArtist(state, action);
    case CLEAR_ARTIST:
    	return clearArtist(state, action)
    default:
      return state;
  }
};

const clearArtist = (state, action) => {
	return initialState;
}

const setArtist = (state, action) => {
  let artist = action.response.data[0];
  return Object.assign({}, state, {artist})
}



export default Detail;