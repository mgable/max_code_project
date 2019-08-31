import { ADD_FAVORITE, REMOVE_FAVORITE } from './types';

const initialState = {
  favorites: {}
};

const Saved = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return addFavorite(state, action);
    case REMOVE_FAVORITE:
    	return removeFavorite(state, action)
    default:
      return state;
  }
};

const addFavorite = (state, action) => {
  let id = action.id;

  if (!state.favorites[id]){
    state.favorites[id] = true;
    console.info("I just ADDED a favorite", id);
  }

  return Object.assign({}, state);
}

const removeFavorite = (state, action) => {
  let id = action.id;
  if (state.favorites[id]){
    delete state.favorites[id];
    console.info("I just removed a favorite", id);
  }

  return Object.assign({}, state);
}



export default Saved;