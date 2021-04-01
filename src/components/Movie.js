import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import config from '../config';

import { LoadMovie } from '../actions/movie';
// import { LoadMovieCredits } from '../actions/credits';
import { LoadGenres } from '../actions/genres';

import Loading from './Loading';
import Rating from './Rating';
// import CreditList from '../components/CreditList';
// import ImagesList from '../components/ImagesList';
// import RecommendationsList from '../components/RecommendationsList';

class Movie extends React.Component {
	componentDidMount() {
		const { match, LoadMovie, LoadGenres } = this.props;
		LoadGenres();
		LoadMovie(match.params.movie_id);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadMovie } = this.props;
		if(match.params.movie_id !== nextProps.match.params.movie_id) {
			LoadMovie(nextProps.match.params.movie_id);
		}
	}
	convertMinsToHrsMins = (mins) => {
		let h = Math.floor(mins / 60);
		let m = mins % 60;
		h = h < 10 ? h : h;
		m = m < 10 ? '0' + m : m;
		return `${h}:${m}`;
	}
	moneySpace = (money) => {
		let parts = money.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		return parts.join(".");
	}
	imageLoaded = (e) => {
		e.target.classList.add('-loaded');
	}
	render() {
		const { movie, isFetched } = this.props;

		if(!isFetched) {
			return <Loading />;
		}
		
		return (
			<div className='movie'>
				<h1>{movie.title}</h1>
				<div className="movie-single">
					<div className="movie-single-inner">
                        <Rating rating={movie.vote_average} />
						<div className="movie-poster">
							<img src={`${config.API_IMAGE.medium}/${movie.poster_path}`} onLoad={this.imageLoaded} alt={movie.poster_path}/>
						</div>
						<div className="movie-details">
							<div className="movie-title">
								<span>Title</span>
								{movie.title}
							</div>
							{movie.overview ? (
								<div className="movie-description">
									<span>Overview</span>
									{movie.overview}
								</div>
							) : ''}
							{movie.release_date ? (
								<div className="movie-item">
									<span>Release date</span>
									{movie.release_date}
								</div>
							) : ''}
							{movie.budget ? (
								<div className="movie-item">
									<span>Budget</span>
									$ {this.moneySpace(movie.budget)}
								</div>
							) : ''}
							{movie.revenue ? (
								<div className="movie-item">
									<span>Revenue</span>
									$ {this.moneySpace(movie.revenue)}
								</div>
							) : ''}
							<div className="movie-item">
								<span>Duration</span>
								{this.convertMinsToHrsMins(movie.runtime)}
							</div>
							<ul className="movie-genres">
								{movie.genres && movie.genres.map(item => {
									return (
										<li key={item.id}>{item.name}</li>
									)
								})}
							</ul>
							{/* <CreditList/>
							<ImagesList/> */}
						</div>
					</div>
				</div>
				{/* <Recommendations /> */}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadMovie,
		LoadGenres,
		// LoadMovieCredits
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		movie: state.movie.data,
		isFetched: state.movie.isFetched,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);