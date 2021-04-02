import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';

import MovieCard from './MovieCard';
import Loading from './Loading';

import { LoadStarring } from '../actions/starring';

class Starring extends React.Component {
	componentDidMount() {
		const { match, LoadStarring } = this.props;
		LoadStarring(match.params.page, match.params.actor_id);
	}
	handlePageChange = (pageNumber) => {
		const { match, history, LoadStarring } = this.props;
		LoadStarring(pageNumber, match.params.actor_id);
		pageNumber = pageNumber > 1 ? `/${pageNumber}` : '';
		history.push(`/actor/${match.params.actor_id}${pageNumber}`);
	}
	render() {
		const { movies, pageNumber, total, isFetched } = this.props;

		if(!isFetched)
			return (
				<div className='starring'>
					<h1>Acting</h1>
                    <Loading />
				</div>
			);

		return (
			<div className='starring'>
				<h1>Acting</h1>
				<div className='movie-list'>
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
					{total > 20 && (
						<div className='pagination-container'>
							<Pagination
								activePage={pageNumber}
								itemsCountPerPage={20}
								totalItemsCount={total}
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
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadStarring
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		movies: state.starring.movies,
		pageNumber: state.starring.pageNumber,
		total: state.starring.total,
		isFetched: state.starring.isFetched,
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starring));