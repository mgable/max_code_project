import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from './types';

const initialState = {
  favorites: {}
};

const Saved = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return addFavorite(state, action);
    case REMOVE_FAVORITE:
    	return removeFavorite(state, action);
    case SET_FAVORITES:
      return setFavorites(state, action);
    default:
      return state;
  }
};

const addToSessionStorage = value => {
  try {
    let favorites = JSON.stringify(value);
    sessionStorage.favorites = favorites;
  } catch (e) {
    throw new Error ("There was an error saving your favorites: " + e)
  }
}


const setFavorites = (state, action) => {
  var favorites = action.favorites;
  if (favorites){
    try {
      favorites = JSON.parse(favorites);
    } catch (e) {
      throw new Error ("There was an error getting your favorites: " + e)
    }
    return Object.assign({}, state, {favorites});
  }

  return state;
}

const addFavorite = (state, action) => {
  let artist = action.artist;

  if (!state.favorites[artist.id]){
    state.favorites[artist.id] = artist;
    addToSessionStorage(state.favorites)
    return Object.assign({}, state);
  }

  return state;
}

const removeFavorite = (state, action) => {
  let id = action.artist.id;
  if (state.favorites[id]){
    delete state.favorites[id];
    addToSessionStorage(state.favorites)
    return Object.assign({}, state);
  }

  return state;
}

export default Saved;