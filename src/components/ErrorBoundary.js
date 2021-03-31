import React from 'react';

class ErrorBoundary extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
    componentDidCatch(error, info) {
        console.log(error)
        this.setState({
            hasError: true,
            error,
            errorInfo: info,
        });
    }
    render() {
      if (this.state.hasError) {
        return (
            <div className='error-boundary'>
                <h1>Something went wrong</h1>
            </div>
        );
      }
      return this.props.children; 
    }
  }

  export default ErrorBoundary;