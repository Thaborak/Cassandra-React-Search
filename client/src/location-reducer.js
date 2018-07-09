import {
    FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR, SET_SEARCH_RESULTS

} from './location-actions';

const initialState = {
    error: null,
    locations: []
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_LOCATION_SUCCESS) {
        return Object.assign({}, state, {
            error: null,
            locations: action.locations.data.rows
        });
    }
    else if (action.type === FETCH_LOCATION_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            locations: []
        });
    }
    else if (action.type === SET_SEARCH_RESULTS) {
        return Object.assign({}, state, {
            currentSearchResults: action.searchResults,
        });
    }
    return state;
}
