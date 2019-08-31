import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Favorites from './Favorites';
import './artist.css'

const Artist = (props) => {
	if (props.artist){
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
			additionalGenres = genreName ? <Card.Text>Additional Genres: {genreName}</Card.Text> : null;
		}

		if(handleDetailView){
			var link = <Card.Title><Link to={"/detail/" + id}><span className="view" onClick={() => handleDetailView(artist.id)}>{name}</span></Link></Card.Title>
		}

		return (
			<Card key={id}>
				<Card.Img variant="top" src={image} />
				<Card.Body>
					{link}
					<Card.Text>Primary Genre:<br /><span className="primary-genre">{primaryGenreName}</span></Card.Text>
					{additionalGenres}
					{artistPopularity}
					<Favorites id={artist.id} />
				</Card.Body>
			</Card>
		);
	}

	return null;
}

export default Artist;