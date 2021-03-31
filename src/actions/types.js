const types = {
    movies: {
        loadMoviesRequest: 'LOAD_MOVIES_REQUEST',
        loadMoviesSuccess: 'LOAD_MOVIES_SUCCESS',
        loadMoviesError: 'LOAD_MOVIES_ERROR',
        loadSearchMoviesRequest: 'LOAD_SEARCH_MOVIES_REQUEST',
        loadSearchMoviesSuccess: 'LOAD_SEARCH_MOVIES_SUCCESS',
        loadSearchMoviesError: 'LOAD_SEARCH_MOVIES_ERROR',
        clearSearchText: 'CLEAR_SEARCH_TEXT',
    },
    genres: {
        loadGenresRequest: 'LOAD_GENRES_REQUEST',
        loadGenresSuccess: 'LOAD_GENRES_SUCCESS',
        loadGenresError: 'LOAD_GENRES_ERROR',
    },
}

export default types;