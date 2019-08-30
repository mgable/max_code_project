import React from 'react';
import { connect } from 'react-redux';

const Saved = (props) => {
	let { foo } = props;
	return (
		<div className="saved">
			I am saved {foo}
		</div>
	)
}



const mapStateToProps = state => {
	return {

	};
};

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Saved);