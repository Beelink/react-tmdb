import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { LoadSearchMovies } from '../actions/movies';

class SearchBar extends React.Component {
    searchInputChange = (e) => {
		const { history } = this.props;
		let value = e.target.value;
		if(value.length > 0) {
			history.push(`/search/${value}`);
		} else {
			history.push(`/`);
		}
	}
    render() {
        const { searchText } = this.props;
        return (
            <div className='search-bar'>
                <input type='text' placeholder='Search movies, actors, theaters...' onInput={this.searchInputChange} value={searchText}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
		LoadSearchMovies
	}, dispatch
);

const mapStateToProps = (state) => {
	return {
		searchText: state.movies.searchText
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));