import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoadGenres } from '../actions/genres';

import config from '../config';

class MovieCard extends React.Component {
	imageLoaded = (e) => {
		e.target.classList.add('-loaded');
	};
	render() {
		const { movie, genres, isFetched } = this.props;

		return (
			<div className="movie-card">
				<div className={`movie-rating ${movie.vote_average >= 7 && '-positive'}`}>{movie.vote_average}</div>
				<Link to={`/movie/${movie.id}`} className="movie-image">
					{movie.poster_path && (
						<img src={`${config.API_IMAGE.small}/${movie.poster_path}`} onLoad={this.imageLoaded} alt={movie.poster_path} />
					)}
				</Link>
				<Link to={`/movie/${movie.id}`} className="movie-title">{movie.title}</Link>
				<ul className="movie-genres">
					{isFetched && movie.genre_ids.map((id, index) => {
						const item = genres.filter(genre => genre.id === id);
						//if (item.length > 0) 
							return (
								<li key={id}>{isFetched && item.shift().name}{index + 1 !== movie.genre_ids.length && ', '}</li>
							)
						//return null;
					})}
				</ul>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadGenres
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		genres: state.genres.all,
		isFetched: state.genres.isFetched
	};
};

// MovieCard.propTypes = {
//     genres: PropTypes.object.isRequired,
//     isFetched: PropTypes.bool.isRequired
// }

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);