import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import config from '../config';

import { LoadMovie } from '../actions/movie';
import { LoadGenres } from '../actions/genres';

import Loading from './Loading';
import Rating from './Rating';
import ActorList from './ActorList'
import Recommendations from './Recommendations';

import YoutubeIcon from '../assets/imgs/youtube.svg'

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
				<Helmet>
					<title>{movie.title} | Movies</title>
				</Helmet>
				<div className='movie-single'>
					<div className='movie-banner'>
						<LazyLoadImage 
							src={`${config.API_IMAGE.small}/${movie.poster_path}`}
							onLoad={this.imageLoaded}
							alt={movie.poster_path}
						/>
					</div>
					<div className='content row'>
						<div className='column -left'>
							<div className='movie-image'>
								<LazyLoadImage 
									src={`${config.API_IMAGE.medium}/${movie.poster_path}`}
									onLoad={this.imageLoaded}
									alt={movie.poster_path}
								/>
							</div>
							<div className='find-trailers'>
								<a href={`https://www.youtube.com/results?search_query=${movie.title} - Trailer`}>
									<LazyLoadImage 
										src={YoutubeIcon}
										onLoad={this.imageLoaded}
										alt='Find trailers'
									/> 
									Find trailers
								</a>
							</div>
						</div>
						<div className='column -right'>
							<div className='hero'>
								<Rating rating={movie.vote_average} showMax />
								<div className='movie-title'>
									<h1>{movie.title}</h1>
								</div>
								<ul className='movie-genres'>
									{movie.genres && movie.genres.map(item => {
										return (
											<li key={item.id}>{item.name}</li>
										)
									})}
								</ul>
								<ul className='movie-details'>
									{movie.release_date ? (
										<li>
											<div className='detail'>Release date</div>
											<div className='value'>{movie.release_date}</div>
										</li>
									) : ''}
									<li>
										<div className='detail'>Duration</div>
										<div className='value'>{this.convertMinsToHrsMins(movie.runtime)}</div>
									</li>
									{movie.budget ? (
										<li>
											<div className='detail'>Budget</div>
											<div className='value'>$ {this.moneySpace(movie.budget)}</div>
										</li>
									) : ''}
								</ul>
							</div>
							<h2>Overview</h2>
							<div className='movie-overview'>
								{movie.overview}
							</div>
							<ActorList />
							<h2>More details</h2>
							<div className='more-details'>
								{movie.original_title ? (
									<div className='detail-item'>
										<span className='title'>Original title: </span>
										{movie.original_title}
									</div>
								) : ''}
								{movie.revenue ? (
									<div className='detail-item'>
										<span className='title'>Revenue: </span>
										$ {this.moneySpace(movie.revenue)}
									</div>
								) : ''}
								{movie.production_companies ? (
									<div className='detail-item'>
										<span className='title'>Production companies: </span>
										{movie.production_companies.map((company, index) => {
											return (
												<span key={index}>{company.name}{index + 1 !== movie.production_companies.length && ', '}</span>
											)
										})}
									</div>
								) : ''}
								{movie.production_countries ? (
									<div className='detail-item'>
										<span className='title'>Production countries: </span>
										{movie.production_countries.map((country, index) => {
											return (
												<span key={index}>{country.name}{index + 1 !== movie.production_countries.length && ', '}</span>
											)
										})}
									</div>
								) : ''}
								{movie.homepage ? (
									<div className='detail-item'>
										<span className='title'>Homepage: </span>
										<a href={movie.homepage}>{new URL(movie.homepage).hostname}</a>
									</div>
								) : ''}
								{movie.spoken_languages ? (
									<div className='detail-item'>
										<span className='title'>Spoken languages: </span>
										{movie.spoken_languages.map((lang, index) => {
											return (
												<span key={index}>{lang.english_name}{index + 1 !== movie.spoken_languages.length && ', '}</span>
											)
										})}
									</div>
								) : ''}
								{(movie.imdb_id && movie.id) ? (
									<div className='detail-item'>
										<span className='title'>External links: </span>
										<a href={`https://www.imdb.com/title/${movie.imdb_id}`}>IMDb</a>, <a href={`https://www.themoviedb.org/movie/${movie.id}`}>TMDB</a>
									</div>
								) : ''}
							</div>
						</div>
					</div>
				</div>
				<div className='content'>
					<Recommendations />
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadMovie,
		LoadGenres,
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		movie: state.movie.data,
		isFetched: state.movie.isFetched,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movie));