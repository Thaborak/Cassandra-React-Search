import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './location-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
	combineReducers({
		location: locationReducer,

	}),
	composeWithDevTools(),
	applyMiddleware(thunk)
);


export default store;
