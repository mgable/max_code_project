import { combineReducers } from 'redux';
import Search from './View/Search/reducer';
import Detail from './View/Detail/reducer';
import Saved from './View/Saved/reducer';

const app = combineReducers({
	Search,
	Detail,
	Saved
});

export default app;