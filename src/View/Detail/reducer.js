import { ARTIST_RECEIVED, CLEAR_ARTIST, GET_ARTIST, SIMILAR_RECEIVED, GET_SIMILAR } from '../Search/types';

const initialState = {
  artist: null,
  similar: [],
  cache: {},
  similarCache: {}
};

const Detail = (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_RECEIVED:
      return setArtist(state, action);
    case CLEAR_ARTIST:
    	return clearArtist(state, action);
    case GET_ARTIST:
      return getArtist(state, action);
    case SIMILAR_RECEIVED:
      return setRelatedArtists(state, action);
    case GET_SIMILAR:
      return getSimilarArtist(state, action);
    default:
      return state;
  }
};

const getSimilarArtist = (state, action) => {
  console.info("xxx", state, action)
  let id = action.id,
    similar = state.similarCache[id];

    return Object.assign({}, state, {similar})
}

const setRelatedArtists = (state, action) => {
  let similar = action.response.data,
    id = action.artistID;

  state.similarCache[id] = similar;

  return Object.assign({}, state, {similar})
}

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