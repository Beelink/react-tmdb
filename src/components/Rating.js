import React from 'react';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.rating = props.rating;
        this.showMax = props.showMax;
    }
    render () {
        return (
            <div className={`movie-rating ${this.rating >= 7 ? '-positive': ''}`}>
                <span className='rating-points'>{this.rating > 0 ? Number(this.rating).toFixed(1) : 'No rating'}</span>
                {this.showMax && (<span className='rating-max'>/10</span>)}
            </div>
        )
    }
}

export default Rating;