/* Event Types */
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

/* Event Creators */
export const removeFavorite = id => {
	return { type: REMOVE_FAVORITE, id };
}

export const addFavorite = id => {
	return { type: ADD_FAVORITE, id };
}