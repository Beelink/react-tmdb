import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
// import Loading from './components/Loading';
import Home from './components/Home';
import Search from './components/Search';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

import './assets/styles/Normalize.css';
import './assets/styles/Fonts.css';
import './assets/styles/App.scss';

function App() {
	return (
		<ErrorBoundary>
		{/* <React.Suspense fallback={<Loading />}> */}
			<Router>
				<div className='app'>
					<Header />
					<div className='content'>
						<Switch>
							<Route exact path='/:page(\\d+)?'>
								<Home />
							</Route>
							<Route path='/search/:query/:page?'>
								<Search />
							</Route>
							<Route
								path="*"
								status={404}
								render={(props) => <NotFound {...props} status={404} />}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		{/* </React.Suspense> */}
		</ErrorBoundary>
	)
}

export default App;
