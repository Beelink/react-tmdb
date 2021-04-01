import React from 'react';

import InfoMessage from './InfoMessage'

function NotFound(props) {
    return (
        <div className='content'>
            <h1>Oops...</h1>
            <InfoMessage message={`The page you are looking for can't be found. Status: ${props.status}`} />
        </div>
    );
}

export default NotFound;