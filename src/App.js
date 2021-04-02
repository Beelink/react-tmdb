import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import Movie from './components/Movie';
import Actor from './components/Actor';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

import './assets/styles/Normalize.css';
import './assets/styles/Fonts.css';
import './assets/styles/App.scss';

function App() {
	return (
		<ErrorBoundary>
		{/* <React.Suspense fallback={<Loading />}> */}
			<BrowserRouter>
				<div className='app'>
					<Header />
					<Switch>
						<Route exact path='/:page?'>
							<Home />
						</Route>
						<Route exact path='/search/:query/:page?'>
							<Search />
						</Route>
						<Route exact path='/movie/:movie_id/:cast?'>
							<Movie />
						</Route>
						<Route exact path='/actor/:actor_id/:page?'>
							<Actor />
						</Route>
						<Route
							path='*'
							status={404}
							render={(props) => <NotFound {...props} status={404} />}
						/>
					</Switch>
				</div>
			</BrowserRouter>
		{/* </React.Suspense> */}
		</ErrorBoundary>
	)
}

export default App;
