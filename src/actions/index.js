import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request, element) => (dispatch) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes${element}`)
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching);
    request("http://localhost:3001/filters")
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
}

export const filtersFetching = createAction('FILTERS_FETCHING');
export const filtersFetched = createAction('FILTERS_FETCHED');
export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
