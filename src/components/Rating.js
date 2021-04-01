import React from 'react';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.rating = props.rating;
    }
    render () {
        return (
            <div className={`movie-rating ${this.rating >= 7 ? '-positive': ''}`}>
                {this.rating > 0 ? Number(this.rating).toFixed(1) : 'No rating'}
            </div>
        )
    }
}

export default Rating;