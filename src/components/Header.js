import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

import logo from '../assets/imgs/movies.png';

function Header() {
    return (
        <header>
            <div className='content'>
                <Link to='/'>
                    <img src={logo} alt='MovieDB' />
                    <strong>MoviesDB</strong>
                </Link>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;