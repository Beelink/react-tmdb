import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MovieCard from './MovieCard';
import Loading from './Loading';

import { LoadRecommendations } from '../actions/recommendations';

class Recommendations extends React.Component {
	componentDidMount() {
		const { match, LoadRecommendations } = this.props;
		LoadRecommendations(match.params.movie_id);
	}
	render() {
		const { recommendations, isFetched } = this.props;

		if(!isFetched)
			return (
				<div className="recommendations">
					<h1>Recommendations</h1>
                    <Loading />
				</div>
			);

		return (
			<div className='recommendations'>
				{recommendations.results && recommendations.results.length > 0 && (
					<div className='recommendations-inner'>
						<h1>Recommendations</h1>
						<div className='movie-list'>
                            {recommendations.results && recommendations.results.map(movie => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </div>
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadRecommendations
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		recommendations: state.recommendations.all,
		isFetched: state.recommendations.isFetched
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recommendations));