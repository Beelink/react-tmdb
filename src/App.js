import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';

import './assets/styles/Normalize.css';
import './assets/styles/Fonts.css';
import './assets/styles/App.scss';

function App() {
	return (
		<Router>
			<div className='app'>
				<Header />
				<div class='content'>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route exact path='/error'>
							<Home />
						</Route>
						<Route component={Error}/>
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default App;
