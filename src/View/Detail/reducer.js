// import { search, detail, saved } from '../types';
import { ARTIST_RECEIVED } from '../Search/types';

const initialState = {
  artist: null
};

const Detail = (state = initialState, action) => {
  switch (action.type) {
    case ARTIST_RECEIVED:
      return setArtist(state, action);

    default:
      return state;
  }
};

const setArtist = (state, action) => {
  let artist = action.response.data[0];
  return Object.assign({}, state, {artist})
}



export default Detail;