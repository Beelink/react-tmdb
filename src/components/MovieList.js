import React from 'react';
//import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import MovieCard from './MovieCard'

import { LoadMovies, LoadSearchMovies } from '../actions/movies';
import { LoadGenres } from '../actions/genres';

class MovieList extends React.Component {
    componentDidMount() {
        const { match, LoadMovies, LoadGenres, filter } = this.props;
		LoadGenres();
        LoadMovies(match.params.page, filter);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadGenres, LoadMovies, LoadSearchMovies, filter, searchText } = this.props;
		if(nextProps.filter !== filter || nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page){
			LoadGenres();
			if(searchText.length === 0){
				LoadMovies(nextProps.match.params.page, nextProps.filter);
			} else {
				LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
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

        if(!isFetched)
			return (
				<div className="movie-list">
					<div className="loading"></div>
				</div>
			);

		return (
			<div className="movie-list">
				{movies.results && movies.results.map(movie => (
					<MovieCard key={movie.id} movie={movie}/>
				))}
				<div className="pagination-container">
					<Pagination
						activePage={movies.page}
						itemsCountPerPage={20}
						totalItemsCount={movies.total_results}
						pageRangeDisplayed={5}
						onChange={this.handlePageChange}
						prevPageText={``}
						nextPageText={``}
						firstPageText={``}
						lastPageText={``}
					/>
				</div>
			</div>
		)
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadGenres,
		LoadMovies,
		LoadSearchMovies
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.movies.all,
		searchText: state.movies.searchText,
		isFetched: state.movies.isFetched,
		filter: state.movies.filter
	}
}

// MovieList.propTypes = {
//     movies: PropTypes.arrayOf(PropTypes.object),
//     isFetched: PropTypes.bool
// }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieList));