import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer/root-reducer';
import { thunk } from 'redux-thunk';
// import { logger } from 'redux-logger';

// ==============================|| REDUX - MAIN STORE ||============================== //

const initialState = {};
const middleware = [thunk];

const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware)));

const persister = 'Free';

export { store, persister };
