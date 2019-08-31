import { DATA_RECEIVED, TEXT_ENTERED, SET_GENRES, SET_SELECTED, ARTISTS_RECEIVED } from './types';

const initialState = {
  selected: null,
  entered: "",
  genres: [],
  cache: {},
  artists: []
};

const Genres = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_ENTERED:
      return textEntered(state, action);
    case DATA_RECEIVED:
      return setDataRecevied(state, action);
    case ARTISTS_RECEIVED:
      return setArtistReceived(state, action);
    case SET_GENRES:
      return setGenres(state, action);
    case SET_SELECTED:
      return setSelected(state, action);
    default:
      return state;
  }
};

const setArtistReceived = (state, action) => {
  let artists = action.response.data;
  return Object.assign({}, state, {artists})
}

const setSelected = (state, action) => {
  let selected = action.selected;
  if (state.selected !== selected){
    return Object.assign({}, state, {selected});
  }

  return state;
}

const setGenres = (state, action) => {
  let key = action.value,
    genres = state.cache[key];
  return Object.assign({}, state, {genres})
}

const setDataRecevied = (state, action) => {
  let genres = action.response.data, 
    cache = Object.assign({}, state.cache, {[action.value]: genres})
  return Object.assign({}, state, {genres, cache})
}

const textEntered = (state, action) => {
  let entered = action.value;
  if (entered !== state.entered){
    return Object.assign({}, state, {entered})
  }

  return state
}

export default Genres;