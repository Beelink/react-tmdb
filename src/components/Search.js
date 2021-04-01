import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

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
		return (
            <div className='search'>
                <h1>Search</h1>
                <MovieList />
            </div>
        )
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadSearch,
		ClearSearch
	}, dispatch
);

export default withRouter(connect(null, mapDispatchToProps)(Search));