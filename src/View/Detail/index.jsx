import React, {Component} from 'react';
import { connect } from 'react-redux';
import Artist from '../shared/Artist';
import Back from '../shared/Back';
import { getApi } from '../../Helpers';
import { fetchArtist, clearArtist, getArtist as getArtistFromCache, getSimilar as getSimilarFromCache, fetchSimilar } from '../Search/types';
import { Link } from "react-router-dom";
import './detail.css';

class Detail extends Component {

	constructor(props){
		super(props);

		if(props.match && props.match.params && props.match.params.id){
			let id = props.match.params.id
			if (props.cache[id]){
				// get artist from cache
				props.handleGetArtistFromCache(id);
				props.handleGetSimiliarFromCache(id);
			} else {
				// request new artist from server
				props.handleGetArtist(id);
				props.handleGetSimiliar(id);
			}
		} else {
			throw new Error("No artist id was supplied!")
		}
	}

	componentWillUnmount(){
		this.props.handleClearArtist();
	}
	
	render(){
		let { artist } = this.props,
			related = this.props.similar.map((artist) => <Artist key={artist.id} artist={artist} />)

		if (artist) {
			return (
				<div className="details">
					<h1>Details</h1>
					<nav>
						<Back />&nbsp;|&nbsp;
						<Link className="favorites-link" to="/saved">View Favorites</Link>
					</nav>
					<div className="row">
						<div className="detail col-sm-6">
							<div className="search-results">
								<Artist artist={artist} showAllGenres={true}  />
							</div>
						</div>

						<div className="related col-sm-6">
							<div className="artists">
								<h4>Related Artists</h4>
								{related}
							</div>
						</div>
					</div>
				</div>
			);
		}

		return null;
	}
}

const getArtistID = state => state.Detail.artist && state.Detail.artist.id;
const getArtist = state => state.Detail.artist;
const getCache = state => state.Detail.cache;
const getSimilarArtists = state => state.Detail.similar.filter((artist) =>  artist.id !== getArtistID(state));

const mapStateToProps = state => {
	return {
		artist: getArtist(state),
		similar: getSimilarArtists(state),
		cache: getCache(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleGetSimiliar: id => {
			dispatch(getApi(fetchSimilar(id)));
		},
		handleGetSimiliarFromCache: id => {
			console.info("I am  getting", id)
			dispatch(getSimilarFromCache(id));
		},
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