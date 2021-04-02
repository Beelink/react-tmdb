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
    recommendations: {
        loadReccomendationsRequest: 'LOAD_RECOMMENDATIONS_REQUEST',
        loadReccomendationsSuccess: 'LOAD_RECOMMENDATIONS_SUCCESS',
        loadReccomendationsError: 'LOAD_RECOMMENDATIONS_ERROR',
    },
    actor: {
        loadActorRequest: 'LOAD_ACTOR_REQUEST',
        loadActorSuccess: 'LOAD_ACTOR_SUCCESS',
        loadActorError: 'LOAD_ACTOR_ERROR',
    },
    starring: {
        loadStarringRequest: 'LOAD_STARRING_REQUEST',
        loadStarringSuccess: 'LOAD_STARRING_SUCCESS',
        loadStarringError: 'LOAD_STARRING_ERROR',
    }
}

export default types;