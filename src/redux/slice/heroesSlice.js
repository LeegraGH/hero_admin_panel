import { createSlice } from "@reduxjs/toolkit";

const heroesSlice = createSlice({
    name: 'heroes',
    initialState: {
        heroes: [],
        heroesLoadingStatus: 'idle'
    },
    reducers:{
        heroesFetching: (state)=>{state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state,action)=>{
            state.heroesLoadingStatus="idle";
            state.heroes=action.payload;
        },
        heroesFetchingError: (state)=>{state.heroesLoadingStatus = 'error'}
    }
})

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError
} = actions;