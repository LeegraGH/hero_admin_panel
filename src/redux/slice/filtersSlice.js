import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        filters: [],
        filtersLoadingStatus: 'idle'
    },
    reducers: {
        filtersFetching: (state)=>{state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state,action)=>{
            state.filtersLoadingStatus="idle";
            state.filters=action.payload;
        },
        filtersFetchingError: (state)=>{state.filtersLoadingStatus = 'error'}
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError
} = actions;