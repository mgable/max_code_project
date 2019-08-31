import React, {Component} from 'react';
import { connect } from 'react-redux';
import Artist from '../shared/Artist'
import { Link } from "react-router-dom";
import { getApi } from '../../Helpers';
import { fetchArtist, clearArtist } from '../Search/types';
import './detail.css';

class Detail extends Component {

	constructor(props){
		super(props);
		if(props.match && props.match.params && props.match.params.id && !this.props.artists){
			props.handleGetArtist(props.match.params.id)
		}
	}
	
	render(){
		let { artist, handleClearArtist, genre } = this.props,
			{ id = false } = (genre || {}),
			linkTo = id ? "/?id=" + id : "/";

		if (artist) {
			return (
				<div className="detail">
					<Link to={linkTo}><div onClick={handleClearArtist} >Back to Search</div></Link>
					<Artist artist={artist} showAllGenres={true}  />
				</div>
			);
		}

		return null;
	}
}

const getArtist = state => state.Detail.artist;
const getGenre = state => state.Search.selected;

const mapStateToProps = state => {
	return {
		artist: getArtist(state),
		genre: getGenre(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleGetArtist: id => {
			dispatch(getApi(fetchArtist(id)))
		},
		handleClearArtist: () => {
			dispatch(clearArtist());
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Detail);