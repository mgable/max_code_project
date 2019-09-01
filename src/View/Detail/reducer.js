import { ARTIST_RECEIVED, CLEAR_ARTIST, GET_ARTIST } from '../Search/types';

const initialState = {
  artist: null,
  cache: {}
};

const Detail = (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_RECEIVED:
      return setArtist(state, action);
    case CLEAR_ARTIST:
    	return clearArtist(state, action);
    case GET_ARTIST:
      return getArtist(state, action);
    default:
      return state;
  }
};

const getArtist = (state, action) => {
  let id = action.id,
    artist = state.cache[id];

    if (artist){
      return Object.assign({}, state, {artist});
    }

    return state;
}

const clearArtist = (state, action) => {
	return initialState;
}

const setArtist = (state, action) => {
  let artist = action.response.data[0],
    id = artist.id;

  state.cache[id] = artist;

  return Object.assign({}, state, {artist})
}



export default Detail;