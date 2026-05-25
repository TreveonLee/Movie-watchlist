// store.js — Redux store with Thunk middleware and redux-persist
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage in the browser
import rootReducer from './reducers';

// redux-persist config — only persist the watchlist slice, not the search results
// This keeps fetched data fresh on every launch while preserving user's personal list
const persistConfig = {
  key: 'root',
  storage,           // localStorage in the browser
  whitelist: ['watchlist'], // only save the watchlist; shows are re-fetched on load
};

// Wrap the root reducer so redux-persist can intercept reads/writes
const persistedReducer = persistReducer(persistConfig, rootReducer);

// applyMiddleware(thunk) lets us dispatch functions (thunks) instead of plain objects.
// When the store sees a dispatched function, Redux Thunk calls it with (dispatch, getState)
// instead of forwarding it to the reducer — that's how async action creators work.
export const store = createStore(persistedReducer, applyMiddleware(thunk));

// persistor is used by PersistGate to delay rendering until rehydration is complete
export const persistor = persistStore(store);
