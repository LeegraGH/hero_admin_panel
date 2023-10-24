import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from './slice/filtersSlice';
import { apiSlice } from '../api/apiSlice';

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
        filters: filtersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;