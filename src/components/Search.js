import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import { LoadSearch, ClearSearch } from '../actions/movies';

import MovieList from './MovieList';

class Search extends React.Component {
	componentDidMount() {
		const { match, LoadSearch } = this.props;
		LoadSearch(match.params.query, match.params.page);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadSearch } = this.props;
		if(nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page) {
			LoadSearch(nextProps.match.params.query, nextProps.match.params.page);
		}
	}
	componentWillUnmount() {
		this.props.ClearSearch();
	}
	render() {
		const { searchText } = this.props;
		return (
            <div className='search'>
				<Helmet>
					<title>Search: {searchText} | Movies</title>
				</Helmet>
				<div className='content'>
					<h1>Search: {searchText}</h1>
					<MovieList />
				</div>
            </div>
        )
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadSearch,
		ClearSearch
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		searchText: state.movies.searchText
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));