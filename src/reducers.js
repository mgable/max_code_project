import { combineReducers } from 'redux';
import App from './View/reducer';
import Search from './View/Search/reducer';
import Detail from './View/Detail/reducer'

const app = combineReducers({
	App,
	Search,
	Detail
});

export default app;