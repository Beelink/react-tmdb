import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import SearchBar from './SearchBar';

import logo from '../assets/imgs/movies.png';

function Header() {
    return (
        <header>
            <div className='content'>
                <Link to='/'>
                    <LazyLoadImage 
                        src={logo}
                        alt='Movies'
                    />
                    <strong>Movies</strong>
                </Link>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;