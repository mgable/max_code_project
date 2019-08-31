import React from 'react';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from './types';
import Artist from '../shared/Artist';
import Back from '../shared/Back';
import './saved.css';

const Saved = (props) => {
	let { favoriteArtists} = props,
		artists = favoriteArtists.map((artist) => <Artist key={artist.id} artist={artist} />)

	return (
		<div className="saved">
			<Back />
			<div className="search-results">
				<div className="artists">{artists}</div>
			</div>
		</div>
	)
}

const getFavorites = state => state.Saved.favorites;
const getArtists = state => state.Search.artists;
const getFavoriteArtists = state => {
	let favorites = Object.keys(getFavorites(state)).map((key) => parseInt(key, 10)),
		artists = getArtists(state),
		favoriteArtists = artists.filter((artist) => favorites.includes(artist.id));

	console.info(favorites);

	return favoriteArtists;
}

const mapStateToProps = state => {
	return {
		favorites: getFavorites(state),
		artists: getArtists(state),
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
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Saved);