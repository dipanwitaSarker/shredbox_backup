import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  userRoot: userReducer,
  errorRoot: errorReducer,
  customization: customizationReducer
});

export default reducer;
