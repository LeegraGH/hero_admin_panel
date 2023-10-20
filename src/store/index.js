import { createStore, combineReducers, compose, applyMiddleware  } from 'redux';
import ReduxThunk from "redux-thunk";

import {heroes, filters} from '../reducers';

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
};

const reducer = combineReducers({heroes, filters});
const store = createStore(reducer,
    compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

export default store;

// enhancer - функция по расширению функций store
//
// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action);
//     }

//     return store;
// }