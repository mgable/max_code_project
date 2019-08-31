import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addFavorite, removeFavorite } from '../Saved/types';


class Favorites extends Component {
	render(){
		let {id, isFavorite , handleAddFavorite, handleRemoveFavorite} = this.props,
		onclick = () => { 
			if (isFavorite){
				handleRemoveFavorite(id);
			} else {
				handleAddFavorite(id);
			}
		};


		return (
			<Button onClick={onclick} variant="primary">favorite me - {id} - am I a favorite? - {isFavorite ? "I am a favorite" : "NOT!"}</Button>
		);
	}
}

const getIsFavorite = (state, props) => state.Saved.favorites[props.id];

const mapStateToProps = (state, ownProps) => {
	return {
		isFavorite: getIsFavorite(state, ownProps),
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
	)(Favorites);