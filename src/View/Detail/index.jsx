import React, {Component} from 'react';
import { connect } from 'react-redux';
import Artist from '../shared/Artist';
import Back from '../shared/Back';
import { getApi } from '../../Helpers';
import { fetchArtist, clearArtist } from '../Search/types';
import { Link } from "react-router-dom";
import './detail.css';

class Detail extends Component {

	constructor(props){
		super(props);
		if(props.match && props.match.params && props.match.params.id && !this.props.artists){
			props.handleGetArtist(props.match.params.id)
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
					<div class="search-results">
						<Artist artist={artist} showAllGenres={true}  />
					</div>
				</div>
			);
		}

		return null;
	}
}

const getArtist = state => state.Detail.artist;

const mapStateToProps = state => {
	return {
		artist: getArtist(state)
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