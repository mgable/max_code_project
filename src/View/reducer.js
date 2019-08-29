import { search, SET_VIEW /*, saved, detail*/ } from './types';
import {  ARTIST_RECEIVED } from './Search/types';

const initialState = {
  view: search
};

const App = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW:
    case ARTIST_RECEIVED:
      return setView(state, action);

    default:
      return state;
  }
};

const setView = (state, action) => {
  let view = action.view;
  if (view !== state.view){
    return Object.assign({}, state, {view})
  }

  return state;
}



export default App;