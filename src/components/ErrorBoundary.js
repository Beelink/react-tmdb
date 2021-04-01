import React from 'react';

import InfoMessage from './InfoMessage'

class ErrorBoundary extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }
    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            errorInfo: info,
        });
    }
    render() {
        if (this.state.hasError) {
            return (
                <InfoMessage message='Something went wrong...' />
            );
        }
        return this.props.children; 
    }
}

  export default ErrorBoundary;