import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from "../../hooks/http.hook";

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
)

const filtersAdapter = createEntityAdapter({
    selectId: () => uuidv4()
});

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterUpdated: (state, action) => {state.activeFilter=action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, (state) => { state.filtersLoadingStatus = 'error' })
    }
});

const { actions, reducer } = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export default reducer;
export const {activeFilterUpdated} = actions;