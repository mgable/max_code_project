import React from 'react';
import Search from './Search';
import Detail from './Detail';
import Saved from './Saved';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './view.css';

const View = () => {
	return (
		<div className="component">
		<Router basename="/">
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