import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const Back = (props) => {
	let {genre} = props,
		id = genre && genre.id,
		linkTo = id ? "/?id=" + id : "/";
	return (
		<Link to={linkTo}>Back to Search</Link>
	);
	
}

const getGenre = state => state.Search.selected;

const mapStateToProps = state => {
	return {
		genre: getGenre(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Back);


