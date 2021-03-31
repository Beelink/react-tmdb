import React from 'react';

import MovieList from './MovieList';

function Home() {
    return (
        <div className='home'>
            <h1>Popular</h1>
            <MovieList />
        </div>
    )
}

export default Home;