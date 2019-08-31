import { combineReducers } from 'redux';
import Search from './View/Search/reducer';
import Detail from './View/Detail/reducer'

const app = combineReducers({
	Search,
	Detail
});

export default app;