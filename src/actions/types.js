const types = {
    movies: {
        loadMoviesRequest: 'LOAD_MOVIES_REQUEST',
        loadMoviesSuccess: 'LOAD_MOVIES_SUCCESS',
        loadMoviesError: 'LOAD_MOVIES_ERROR',
    },
    search: {
        loadSearchRequest: 'LOAD_SEARCH_REQUEST',
        loadSearchSuccess: 'LOAD_SEARCH_SUCCESS',
        loadSearchError: 'LOAD_SEARCH_ERROR',
        clearSearch: 'CLEAR_SEARCH',
    },
    genres: {
        loadGenresRequest: 'LOAD_GENRES_REQUEST',
        loadGenresSuccess: 'LOAD_GENRES_SUCCESS',
        loadGenresError: 'LOAD_GENRES_ERROR',
    },
    movie: {
        loadMovieRequest: 'LOAD_MOVIE_REQUEST',
        loadMovieSuccess: 'LOAD_MOVIE_SUCCESS',
        loadMovieError: 'LOAD_MOVIE_ERROR',
    },
    actors: {
        loadActorsRequest: 'LOAD_ACTORS_REQUEST',
        loadActorsSuccess: 'LOAD_ACTORS_SUCCESS',
        loadActorsError: 'LOAD_ACTORS_ERROR',
    },
}

export default types;