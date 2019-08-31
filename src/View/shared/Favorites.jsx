import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addFavorite, removeFavorite } from '../Saved/types';


class Favorites extends Component {
	render(){
		let {artist, isFavorite , handleAddFavorite, handleRemoveFavorite} = this.props,
		onclick = () => { 
			if (isFavorite){
				handleRemoveFavorite(artist);
			} else {
				handleAddFavorite(artist);
			}
		};

		return (
			<Button onClick={onclick} variant="primary">favorite me - {artist.id} - am I a favorite? - {isFavorite ? "I am a favorite" : "NOT!"}</Button>
		);
	}
}

const getIsFavorite = (state, props) => state.Saved.favorites[props.artist.id];

const mapStateToProps = (state, ownProps) => {
	return {
		isFavorite: getIsFavorite(state, ownProps),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		handleRemoveFavorite: artist => {
			dispatch(removeFavorite(artist))
		},
		handleAddFavorite: artist => {
			dispatch(addFavorite(artist))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Favorites);