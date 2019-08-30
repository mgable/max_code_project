import React from 'react';
import { connect } from 'react-redux';
import { detail, saved } from './types';
import Search from './Search';
import Detail from './Detail';
import Saved from './Saved';
import { BrowserRouter as Router, Route } from "react-router-dom";


const View = () => {

	return (
		<div className="component">
			<Router>
				<Route path="/:id?" exact component={Search} />
				<Route path="/detail/:id" component={Detail} />
				<Route path="/saved" component={Saved} />
			</Router>
		</div>
	)
}

const getView = state => state.App.view;
const getArtist = state => state.Search.artist;

const mapStateToProps = state => {
	return {
		view: getView(state),
		artist: getArtist(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// handleSetSelected: selected => {
		// 	if (selected && selected.length){
		// 		dispatch(setSelected(selected[0]))
		// 		dispatch(getApi(fetchArtists(selected[0].id)));
		// 	}
		//}
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(View);

