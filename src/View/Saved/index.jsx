import React from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from './types';
import Artist from '../shared/Artist';
import Back from '../shared/Back';
import { getApi } from '../../Helpers';
import { fetchArtist } from '../Search/types';
import './saved.css';

const Saved = (props) => {
	let { favoriteArtists, handleDetailView } = props,
		artists = favoriteArtists.map((artist) => <Artist key={artist.id} artist={artist} handleDetailView={handleDetailView} />)

	return (
		<div className="saved">
			<h1>Favorites</h1>
			<nav>
				<Back />
			</nav>
			<div className="search-results">
				<div className="artists">{artists}</div>
			</div>
		</div>
	);
}

const getFavorites = state => state.Saved.favorites;
const getFavoriteArtists = state =>  Object.values(getFavorites(state))

const mapStateToProps = state => {
	return {
		favoriteArtists: getFavoriteArtists(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleRemoveFavorite: id => {
			dispatch(removeFavorite(id))
		},
		handleAddFavorite: id => {
			dispatch(addFavorite(id))
		},
		handleDetailView: artistID => {
			dispatch(getApi(fetchArtist(artistID)))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Saved);