import {  domain, genresEP, genreSearchEP, artistEP } from '../../Helpers/types';
import {  detail } from '../types';

// constants
export const fetchGenres = value =>
 { 
 	return {
		ep: `${domain}${genresEP}`,
		params: {
			data: {q:value},
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
		artistID,
		view: detail
	}
}

// event types
export const TEXT_ENTERED = "TEXT_ENTERED";
export const DATA_RECEIVED = "DATA_RECEIVED";
export const SET_GENRES = "SET_GENRES";
export const SET_SELECTED = "SET_SELECTED";
export const ARTISTS_RECEIVED = "ARTISTS_RECEIVED";
export const ARTIST_RECEIVED = "ARTIST_RECEIVED"

// event creators
export const getTextEntered = value => {
	return {type:TEXT_ENTERED, value}
}

export const setGenres = value => {
	return {type: SET_GENRES, value }
}

export const setSelected = selected => {
	return {type: SET_SELECTED, selected}
}

