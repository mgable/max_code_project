import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { getApi, searchStringToObj } from '../../Helpers';
import { Link } from "react-router-dom";
import { getTextEntered, fetchGenres, setGenres, setSelected, fetchArtists, fetchArtist } from './types';
import { Typeahead } from 'react-bootstrap-typeahead';
import Artist from '../shared/Artist';
import './search.css';

class Search extends Component {

	constructor(props) {
		super(props);
		let { location } = props,
			params = searchStringToObj(location.search);

		if(params.id && !this.props.artists.length){
			this.props.handleGetSelected(params.id)
		}
	}

	addSearch(evt) {
		if (evt && evt[0] && evt[0].id) {
			let id = evt[0].id;
			this.props.history.push({
			    pathname: '/',
			    search: `?id=${id}`
			})
		}
	}

	render() {
		let { handleChange, genres, cache, handleSetSelected, artists, handleDetailView, selectedGenre } = this.props,
			artistListing = artists && artists.length ? artists.map((artist) => <div className="col" key={artist.id}><Artist artist={artist} handleDetailView={handleDetailView} /></div>) : null,
			selected = selectedGenre ? <span>You have selected the <em>{selectedGenre}</em> genre</span> : null;

		return (
			<div className="search col-sm">
				<h1>Search</h1>
				<nav>
					<Link className="favorites-link" to="/saved">View Favorites</Link>
				</nav>
				<div className="search-input">
					<label>Enter a term to search for music genres</label>
					<Typeahead labelKey="name" onChange={(evt) => { handleSetSelected(evt); this.addSearch(evt)} } onInputChange={(evt) => handleChange(cache, evt)} options={genres} id="typeAheadID"/>
				</div>
				<div className="selected-genre">
					{selected}
				</div>
				<div className="search-results">
					<div className="artists">{artistListing}</div>
				</div>
			</div>
		)
	}
}

const getEntered = state => state.Search.entered;
const getGenres = state => state.Search.cache[state.Search.entered] || [];
const getCache = state => state.Search.cache;
const getArtists = state => state.Search.artists;
const getSelectedGenre = state => state.Search.selected && state.Search.selected.name
const hasGenres = (cache, value) => !!(cache[value]);

const mapStateToProps = state => {
	return {
		entered: getEntered(state),
		genres: getGenres(state),
		cache: getCache(state),
		artists: getArtists(state),
		selectedGenre: getSelectedGenre(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleGetSelected: id => {
			if (id){
				dispatch(getApi(fetchArtists(id)));
			}
		},
		handleSetSelected: (evt) => {
			if (evt && Array.isArray(evt) && evt.length){
				let selected = evt[0],
					id = evt[0].id
				if (selected && id){
					dispatch(setSelected(selected))
					dispatch(getApi(fetchArtists(id)));
				}
			}
		},
		handleChange: (cache, value) => {
			dispatch(getTextEntered(value));

			if (hasGenres(cache, value)) {
				dispatch(setGenres(value))
			} else {
				dispatch(getApi(fetchGenres(value)));
			}
		},
		handleDetailView: artistID => {
			dispatch(getApi(fetchArtist(artistID)))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Search);