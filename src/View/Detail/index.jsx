import React, {Component} from 'react';
import { connect } from 'react-redux';
import Artist from '../shared/Artist';
import Back from '../shared/Back';
import { getApi } from '../../Helpers';
import { fetchArtist, clearArtist, getArtist as getArtistFromCache } from '../Search/types';
import { Link } from "react-router-dom";
import './detail.css';

class Detail extends Component {

	constructor(props){
		super(props);

		if(props.match && props.match.params && props.match.params.id){
			let id = props.match.params.id
			if (props.cache[id]){
				// get artist from cache
				props.handleGetArtistFromCache(id)
			} else {
				// request new artist from server
				props.handleGetArtist(id);
			}
		} else {
			throw new Error("No artist id was supplied!")
		}
	}

	componentWillUnmount(){
		this.props.handleClearArtist();
	}
	
	render(){
		let { artist } = this.props

		if (artist) {
			return (
				<div className="detail">
					<h1>Details</h1>
					<nav>
						<Back />&nbsp;|&nbsp;
						<Link className="favorites-link" to="/saved">View Favorites</Link>
					</nav>
					<div className="search-results">
						<Artist artist={artist} showAllGenres={true}  />
					</div>
				</div>
			);
		}

		return null;
	}
}

const getArtist = state => state.Detail.artist;
const getCache = state => state.Detail.cache;

const mapStateToProps = state => {
	return {
		artist: getArtist(state),
		cache: getCache(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleGetArtist: id => {
			dispatch(getApi(fetchArtist(id)));
		},
		handleClearArtist: () => {
			dispatch(clearArtist());
		},
		handleGetArtistFromCache: id => {
			dispatch(getArtistFromCache(id));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Detail);