import { createStore, combineReducers } from 'redux';
import {heroes, filters} from '../reducers';

const reducer = combineReducers({heroes, filters});
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;