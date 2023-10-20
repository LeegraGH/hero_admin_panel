import { createReducer } from "@reduxjs/toolkit";

import { filtersFetching, filtersFetched, filtersFetchingError } from "../actions";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle'
}

const filters = createReducer(initialState, builder => {
    builder
        .addCase(filtersFetching, (state, action) => {
            state.filtersLoadingStatus = "loading";
        })
        .addCase(filtersFetched, (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = "idle";
        })
        .addCase(filtersFetchingError, (state, action)=>{
            state.filtersLoadingStatus = "error";
        })
})

// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

export default filters;