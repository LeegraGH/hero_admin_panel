import { configureStore } from '@reduxjs/toolkit';

import heroesReducer from './slice/heroesSlice';
import filtersReducer from './slice/filtersSlice';

const stringMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        heroes: heroesReducer, 
        filters: filtersReducer, 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;