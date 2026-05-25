// Action type constants for all Redux actions

// Async actions for fetching shows from TVMaze API
export const FETCH_SHOWS_LOADING = 'FETCH_SHOWS_LOADING';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_SHOWS_ERROR = 'FETCH_SHOWS_ERROR';

// Synchronous actions triggered by user interaction
export const ADD_TO_WATCHLIST = 'ADD_TO_WATCHLIST';
export const REMOVE_FROM_WATCHLIST = 'REMOVE_FROM_WATCHLIST';
export const TOGGLE_WATCHED = 'TOGGLE_WATCHED';
export const CLEAR_WATCHLIST = 'CLEAR_WATCHLIST';
