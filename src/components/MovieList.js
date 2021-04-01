import React from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import MovieCard from './MovieCard'
import Loading from './Loading';
import InfoMessage from './InfoMessage'

import { LoadMovies, LoadSearch } from '../actions/movies';
import { LoadGenres } from '../actions/genres';

class MovieList extends React.Component {
    componentDidMount() {
        const { match, LoadMovies, LoadGenres, filter } = this.props;
		LoadGenres();
        LoadMovies(match.params.page, filter);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadGenres, LoadMovies, LoadSearch, filter, searchText } = this.props;
		if(nextProps.filter !== filter || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadGenres();
			if(searchText.length === 0){
				LoadMovies(nextProps.match.params.page, nextProps.filter);
			} else {
				LoadSearch(nextProps.match.params.query, nextProps.match.params.page);
			}
		}
	};
	handlePageChange = (pageNumber) => {
		const { history, LoadMovies, filter, searchText } = this.props;
		LoadMovies(pageNumber, filter);
		pageNumber = pageNumber > 1 ? `/${pageNumber}` : '';
		if (searchText.length === 0) {
			history.push(`${pageNumber}`);
		} else {
			history.push(`/search/${searchText}${pageNumber}`);
		}
	}
    render() {
        const { movies, isFetched } = this.props;

        if(!isFetched) {
			return <Loading />;
		}

		if (movies.results.length > 0) {
			return (
				<div className='movie-list'>
					{movies.results && movies.results.map(movie => (
						<MovieCard key={movie.id} movie={movie}/>
					))}
					{movies.total_results > 20 && (
						<div className='pagination-container'>
							<Pagination
								activePage={movies.page}
								itemsCountPerPage={20}
								totalItemsCount={movies.total_results}
								pageRangeDisplayed={5}
								onChange={this.handlePageChange}
								prevPageText={`Prev`}
								nextPageText={`Next`}
								firstPageText={``}
								lastPageText={``}
							/>
						</div>
					)}
				</div>
			)
		} else {
			return <InfoMessage message='No movies to show...' />;
		}
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadGenres,
		LoadMovies,
		LoadSearch
	}, dispatch
);

const mapStateToProps = (state) => ({
	movies: state.movies.all,
	searchText: state.movies.searchText,
	isFetched: state.movies.isFetched,
	filter: state.movies.filter
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieList));