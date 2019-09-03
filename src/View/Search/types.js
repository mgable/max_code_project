import {  domain, genresEP, genreSearchEP, artistEP, similarEP } from '../../Helpers/types';

// constants
export const fetchSimilar = artistID => {
	let ep = similarEP.replace("<id>", artistID);

	return {
		ep: `${domain}${ep}`,
		params: {
			method: 'GET'
		},
		type: SIMILAR_RECEIVED,
		container: 'response',
		artistID
	}

}

export const fetchGenres = value => { 
 	return {
		ep: `${domain}${genresEP}`,
		params: {
			data: {q:value, limit: 5},
			method: 'GET'
		},
		type: DATA_RECEIVED,
		container: 'response',
		value
	}
}

export const fetchArtists = artistID => {
	let ep = genreSearchEP.replace("<id>", artistID);

	return {
		ep: `${domain}${ep}`,
		params: {
			method: 'GET'
		},
		type: ARTISTS_RECEIVED,
		container: 'response',
		artistID
	}
}

export const fetchArtist = artistID => {
	let ep = artistEP.replace("<id>", artistID);

	return {
		ep: `${domain}${ep}`,
		params: {
			method: 'GET'
		},
		type: ARTIST_RECEIVED,
		container: 'response',
		artistID
	}
}

// event types
export const TEXT_ENTERED = "TEXT_ENTERED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const SET_GENRES = "SET_GENRES";
export const SET_SELECTED = "SET_SELECTED";
export const ARTISTS_RECEIVED = "ARTISTS_RECEIVED";
export const ARTIST_RECEIVED = "ARTIST_RECEIVED"
export const CLEAR_ARTIST = "CLEAR_ARTIST";
export const GET_ARTIST = "GET_ARTIST";
export const SIMILAR_RECEIVED = "SIMILAR_RECEIVED";
export const GET_SIMILAR = "GET_SIMILAR";

// event creators
export const getSimilar = id => {
	return {type: GET_SIMILAR, id};
}

export const getArtist = id => {
	return {type: GET_ARTIST, id};
}

export const getTextEntered = value => {
	return {type: TEXT_ENTERED, value};
}

export const setGenres = value => {
	return {type: SET_GENRES, value};
}

export const setSelected = selected => {
	return {type: SET_SELECTED, selected};
}

export const clearArtist = () => {
	return {type: CLEAR_ARTIST }
}

