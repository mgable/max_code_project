import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './artist.css'

const Artist = (props) => {
	let { artist, showAllGenres,  handleDetailView} = props,
		{name, image, genres, id, popularity } = artist,
		genreName = null,
		artistPopularity = null,
		additionalGenres = null,
		primaryGenre = genres.filter((genre) => genre.is_primary),
		primaryGenreName = null

		if (primaryGenre && primaryGenre.length){
			primaryGenreName = primaryGenre[0].name
		}

	if (showAllGenres) {
		
		let genreNames = genres.map((genre) => genre.name).filter((genre) => genre !== primaryGenreName);

		genreName = genreNames.join(", ");
		artistPopularity  = <Card.Text>Popularity: {popularity}</Card.Text>;
		additionalGenres = <Card.Text>Additional Genres: {genreName}</Card.Text>;
	}

	return (
		<Card key={id}>
			<Card.Img variant="top" src={image} />
			<Card.Body>
				<Card.Title><Link to="/detail?id={id}"><span className="view" onClick={() => handleDetailView(artist)}>{name}</span></Link></Card.Title>
				<Card.Text>Primary Genre:<br /><span className="primary-genre">{primaryGenreName}</span></Card.Text>
				{additionalGenres}
				{artistPopularity}
				<Button variant="primary">Add to favorites</Button>
			</Card.Body>
		</Card>
	);
}

export default Artist;