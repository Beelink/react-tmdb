import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoadSearchMovies, ClearSearchText } from '../actions/movies';

import MovieList from './MovieList';

class Search extends React.Component {
	componentDidMount() {
		const { match, LoadSearchMovies } = this.props;
		console.log(1, this.props)
		LoadSearchMovies(match.params.query, match.params.page);
	}
	componentWillReceiveProps(nextProps) {
		const { match, LoadSearchMovies } = this.props;
		if(nextProps.match.params.query !== match.params.query || nextProps.match.params.page !== match.params.page) {
			LoadSearchMovies(nextProps.match.params.query, nextProps.match.params.page);
		}
	}
	componentWillUnmount(){
		this.props.ClearSearchText();
	}
	render(){
		return (
            <div className='search'>
                <h1>Search</h1>
                <MovieList />
            </div>
        )
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		LoadSearchMovies,
		ClearSearchText
	},
	dispatch
);

export default withRouter(connect(null, mapDispatchToProps)(Search));