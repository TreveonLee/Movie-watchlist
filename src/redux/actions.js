// actions.js — Action creators (async thunks and synchronous actions)
import {
  FETCH_SHOWS_LOADING,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_ERROR,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  TOGGLE_WATCHED,
  CLEAR_WATCHLIST,
} from './actionTypes';

// ---------------------------------------------------------------------------
// Async thunk — Redux Thunk intercepts this because it returns a FUNCTION
// instead of a plain object. The middleware calls it with (dispatch, getState).
// ---------------------------------------------------------------------------
export const fetchShows = (query = 'action') => async (dispatch) => {
  // Step 1 — tell the store we are loading so the UI can show a spinner
  dispatch({ type: FETCH_SHOWS_LOADING });

  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error — status: ${response.status}`);
    }

    const data = await response.json();

    // Step 2 — success: store the fetched shows and clear loading / error
    dispatch({
      type: FETCH_SHOWS_SUCCESS,
      payload: data.map((item) => item.show), // unwrap the search wrapper
    });
  } catch (error) {
    // Step 3 — failure: store the error message so the UI can display it
    dispatch({ type: FETCH_SHOWS_ERROR, payload: error.message });
  }
};

// ---------------------------------------------------------------------------
// Synchronous action creators — dispatch plain objects immediately
// ---------------------------------------------------------------------------

// Add a show to the personal watchlist
export const addToWatchlist = (show) => ({
  type: ADD_TO_WATCHLIST,
  payload: show,
});

// Remove a show from the watchlist by its TVMaze ID
export const removeFromWatchlist = (id) => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: id,
});

// Toggle a show between "want to watch" and "watched"
export const toggleWatched = (id) => ({
  type: TOGGLE_WATCHED,
  payload: id,
});

// Wipe the entire watchlist (clears persisted state too)
export const clearWatchlist = () => ({
  type: CLEAR_WATCHLIST,
});
