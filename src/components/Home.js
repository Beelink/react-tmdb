import React from 'react';
import { Helmet } from 'react-helmet';

import MovieList from './MovieList';

function Home() {
    return (
        <div className='home'>
            <Helmet>
                <title>Home | Movies</title>
            </Helmet>
            <h1>Popular</h1>
            <MovieList />
        </div>
    )
}

export default Home;