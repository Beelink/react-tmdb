import React from 'react';
import { Helmet } from 'react-helmet';

import MovieList from './MovieList';

function Home() {
    return (
        <div className='home'>
            <Helmet>
                <title>Home | Movies</title>
            </Helmet>
            <div className='content'>
                <h1>Popular</h1>
                <MovieList />	
            </div>
        </div>
    )
}

export default Home;