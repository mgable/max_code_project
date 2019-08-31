import React from 'react';
import Search from './Search';
import Detail from './Detail';
import Saved from './Saved';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const View = () => {
	return (
		<div className="component">
		<Router>
			<Switch>
				<Route path="/saved" exact component={Saved} />
				<Route path="/detail/:id" exact component={Detail} />
				<Route path="/:id?" exact component={Search} />
			</Switch>
		</Router>
		</div>
	)
}
export default View