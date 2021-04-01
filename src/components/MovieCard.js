import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { LoadGenres } from '../actions/genres';

import emptySmall from '../assets/imgs/empty-movie.png';

import config from '../config';

import Rating from './Rating';

class MovieCard extends React.Component {
	imageLoaded = (e) => {
		e.target.classList.add('-loaded');
	};
	render() {
		const { movie, genres, isFetched } = this.props;

		return (
			<div className='movie-card'>
				<Rating rating={movie.vote_average} />
				<Link to={`/movie/${movie.id}`} className={`movie-image ${movie.poster_path || '-empty'}`}>
					{movie.poster_path ? (
						<LazyLoadImage 
							src={`${config.API_IMAGE.small}/${movie.poster_path}`}
							onLoad={this.imageLoaded} 
							alt={movie.poster_path} 
						/>
					) : <LazyLoadImage 
							src={emptySmall}
							onLoad={this.imageLoaded}
							alt='No image'
						/>
					}
				</Link>
				<Link to={`/movie/${movie.id}`} className='movie-title'>{movie.title}</Link>
				<ul className='movie-genres'>
					{isFetched && movie.genre_ids.map((id, index) => {
						const item = genres.filter(genre => genre.id === id);
						if (item.length > 0) 
							return (
								<li key={id}>{isFetched && item.shift().name}{index + 1 !== movie.genre_ids.length && ', '}</li>
							)
						return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);