import { createReducer } from "@reduxjs/toolkit"

import { heroesFetching, heroesFetched, heroesFetchingError } from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, (builder) => {
    builder
        .addCase(heroesFetching, (state, action) => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action)=>{
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(heroesFetchingError, (state, action) =>{
            state.heroesLoadingStatus = 'error';
        })
        .addDefaultCase(()=>{});
});

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         default: return state
//     }
// }

export default heroes;