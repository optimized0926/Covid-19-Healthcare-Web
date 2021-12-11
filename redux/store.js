import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//
// Reducers
//
import authReducer from "./reducers/authReducer";


//
// Actions
//


//
// Store
//
const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  applyMiddleware(thunk)
);
export {store};
