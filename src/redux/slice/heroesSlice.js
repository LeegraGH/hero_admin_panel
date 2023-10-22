import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from '../../hooks/http.hook';

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async (element) => {
        const { request } = useHttp();
        return await request(`http://localhost:3001/heroes${element}`)
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: {
        heroes: [],
        heroesLoadingStatus: 'idle'
    },
    reducers: {
        heroesFetching: (state) => { state.heroesLoadingStatus = 'loading' },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes = action.payload;
        },
        heroesFetchingError: (state) => { state.heroesLoadingStatus = 'error' }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => { state.heroesLoadingStatus = 'error' })
            .addDefaultCase(()=>{})
    }
})

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError
} = actions;