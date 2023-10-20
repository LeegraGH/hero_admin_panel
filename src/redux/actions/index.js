import {heroesFetching, heroesFetched, heroesFetchingError} from "../slice/heroesSlice";
import {filtersFetching, filtersFetched, filtersFetchingError} from "../slice/filtersSlice";

export const fetchHeroes = (request, element) => (dispatch) => {
    dispatch(heroesFetching());
    request(`http://localhost:3001/heroes${element}`)
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
}