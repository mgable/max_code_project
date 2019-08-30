import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { getApi, searchStringToObj } from '../../Helpers';
import { getTextEntered, fetchGenres, setGenres, setSelected, fetchArtists, fetchArtist } from './types';
import { Link } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';
import Artist from '../shared/Artist';
import './search.css';

class Search extends Component {

	constructor(props) {
		super(props);
		let { location } = props,
			params = searchStringToObj(location.search);

		if(params.id && !this.props.artists.length){
			this.props.handleSetSelected(true, params.id)
		}
	}

	addSearch(id) {
		// window.location.search = `id=${id}`
		this.props.history.push({
		    pathname: '/',
		    search: "?" + `id=${id}`
		})
	}

	render() {
		let { handleChange, genres, cache, handleSetSelected, artists, handleDetailView } = this.props,
			artistListing = artists && artists.length ? artists.map((artist) => <div className="col-sm-12 col-md-4 col-lg-3" key={artist.id}><Artist artist={artist} handleDetailView={handleDetailView} /></div>) : null;
		return (
			<div className="search">
				<div className="search-input  col-sm">
					<label>Enter a search term</label>
					<Typeahead labelKey="name" onChange={(evt) => { handleSetSelected(evt[0], evt[0].id); this.addSearch(evt[0].id)} } onInputChange={(evt) => handleChange(cache, evt)} options={genres} id="typeAheadID"/>
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
const hasGenres = (cache, value) => !!(cache[value]);

const mapStateToProps = state => {
	return {
		entered: getEntered(state),
		genres: getGenres(state),
		cache: getCache(state),
		artists: getArtists(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleSetSelected: (selected, id) => {
			if (selected){
				dispatch(setSelected(selected))
				dispatch(getApi(fetchArtists(id)));
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
		handleDetailView: artist => {
			dispatch(getApi(fetchArtist(artist.id)))
		}
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Search);

