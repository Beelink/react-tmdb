import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true,
    diff: true
});

const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(thunk, logger)  
    )
);

export default store;