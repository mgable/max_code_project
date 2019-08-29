import React from 'react';
import { connect } from 'react-redux';
import Artist from '../shared/Artist'
import {setView, search} from '../types';
import './detail.css';

const Detail = (props) => {
	let { artist, handleSetView} = props;
	return (
		<div className="detail">
			<div onClick={() => handleSetView() }>Back to Search</div>
			<Artist artist={artist} handleDetailView={() => console.info("CLICKED")} showAllGenres={true}  />
		</div>
	)
}

const getArtist = state => state.Detail.artist;

const mapStateToProps = state => {
	return {
		artist: getArtist(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleSetView: () => {
			dispatch(setView(search))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Detail);