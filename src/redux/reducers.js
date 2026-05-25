// reducers.js — All reducers handling loading, success, error, and sync actions
import { combineReducers } from 'redux';
import {
  FETCH_SHOWS_LOADING,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_ERROR,
  ADD_TO_WATCHLIST,
  REMOVE_FROM_WATCHLIST,
  TOGGLE_WATCHED,
  CLEAR_WATCHLIST,
} from './actionTypes';

// ─── Shows reducer ────────────────────────────────────────────────────────────
// Manages the browse/search results fetched from the TVMaze API
const showsInitialState = {
  results: [],   // array of show objects returned by the API
  loading: false,
  error: null,
  lastUpdated: null, // ISO timestamp stored in Redux so we can display it
};

const showsReducer = (state = showsInitialState, action) => {
  switch (action.type) {
  case FETCH_SHOWS_LOADING:
    // Show the loading indicator — keep existing results visible during refresh
    return { ...state, loading: true, error: null };

  case FETCH_SHOWS_SUCCESS:
    // Store fetched shows and record when the data arrived
    return {
      ...state,
      loading: false,
      results: action.payload,
      lastUpdated: new Date().toISOString(),
    };

  case FETCH_SHOWS_ERROR:
    // Store the error message so the UI can render a readable message
    return { ...state, loading: false, error: action.payload };

  default:
    return state;
  }
};

// ─── Watchlist reducer ────────────────────────────────────────────────────────
// Manages the user's personal watchlist — this slice is persisted
const watchlistInitialState = {
  items: [], // [{ ...showFields, watched: boolean, addedAt: ISO string }]
};

const watchlistReducer = (state = watchlistInitialState, action) => {
  switch (action.type) {
  case ADD_TO_WATCHLIST: {
    // Don't add duplicates
    const alreadyAdded = state.items.some((s) => s.id === action.payload.id);
    if (alreadyAdded) return state;
    return {
      ...state,
      items: [
        ...state.items,
        { ...action.payload, watched: false, addedAt: new Date().toISOString() },
      ],
    };
  }

  case REMOVE_FROM_WATCHLIST:
    // Return a new array without the removed show — never mutate state directly
    return {
      ...state,
      items: state.items.filter((s) => s.id !== action.payload),
    };

  case TOGGLE_WATCHED:
    // Flip the watched flag for one show
    return {
      ...state,
      items: state.items.map((s) =>
        s.id === action.payload ? { ...s, watched: !s.watched } : s
      ),
    };

  case CLEAR_WATCHLIST:
    // Wipe all items — triggers redux-persist to clear the saved state too
    return watchlistInitialState;

  default:
    return state;
  }
};

// Combine slices into the root reducer
const rootReducer = combineReducers({
  shows: showsReducer,
  watchlist: watchlistReducer,
});

export default rootReducer;
