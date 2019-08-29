import React from 'react';
import { connect } from 'react-redux';
import { detail, saved } from './types';
import Search from './Search';
import Detail from './Detail';


const View = props => {
	let { view } = props;
	var component = null;

	if (view === detail){
		component = <Detail />
	} else if (view === saved) {
		component = <div>saved</div>
	} else {
		component = <Search />
	}

	return (
		<div className="component">
			{component}
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

