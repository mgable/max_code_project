/* Event Types */
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const SET_FAVORITES = "SET_FAVORITES";

/* Event Creators */
export const removeFavorite = artist => {
	return { type: REMOVE_FAVORITE, artist };
}

export const addFavorite = artist => {
	return { type: ADD_FAVORITE, artist };
}

export const setFavorites = favorites => {
	return {type: SET_FAVORITES, favorites }
}
