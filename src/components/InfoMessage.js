import React from 'react';

class InfoMessage extends React.Component {
    constructor(props) {
        super(props);
        this.message=props.message
    }
    render() {
        return (
            <div className='info-message'>
                <h2>{this.message}</h2>
            </div>
        );
    }
}

export default InfoMessage;