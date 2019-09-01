import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addFavorite, removeFavorite } from '../../Saved/types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import './favorite.css';

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

		if (isFavorite){
			return <Button className="favorite" title="I am a favorite" onClick={onclick} variant="primary"><FontAwesomeIcon icon={faHeart} /></Button>
		} else {
			return <Button title="I am NOT a favorite" onClick={onclick} variant="primary"><FontAwesomeIcon icon={faHeart} /></Button>
		}
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