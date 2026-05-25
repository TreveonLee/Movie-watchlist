// store.js — Redux store with Thunk middleware and redux-persist
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';

// ---------------------------------------------------------------------------
// Custom localStorage wrapper that satisfies the redux-persist storage interface.
// Falls back to an in-memory store if localStorage is unavailable (e.g. private
// browsing with blocked storage, or automated test environments).
// ---------------------------------------------------------------------------
const makeLocalStorage = () => {
  // Test availability at call time — some browsers throw on access, not on use
  const available = (() => {
    try {
      const k = '__persist_test__';
      window.localStorage.setItem(k, k);
      window.localStorage.removeItem(k);
      return true;
    } catch {
      return false;
    }
  })();

  if (available) {
    return {
      getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
      setItem: (key, value) => { window.localStorage.setItem(key, value); return Promise.resolve(); },
      removeItem: (key) => { window.localStorage.removeItem(key); return Promise.resolve(); },
    };
  }

  // In-memory fallback — state won't survive a full page close but the app still works
  console.warn('[store] localStorage unavailable — using in-memory storage (state will not persist across page reloads)');
  const mem = {};
  return {
    getItem: (key) => Promise.resolve(mem[key] ?? null),
    setItem: (key, value) => { mem[key] = value; return Promise.resolve(); },
    removeItem: (key) => { delete mem[key]; return Promise.resolve(); },
  };
};

// redux-persist config — only persist the watchlist slice, not the search results.
// This keeps fetched data fresh on every launch while preserving the user's personal list.
const persistConfig = {
  key: 'root',
  storage: makeLocalStorage(), // localStorage in the browser; in-memory fallback otherwise
  whitelist: ['watchlist'],    // only save the watchlist; shows are re-fetched on load
};

// Wrap the root reducer so redux-persist can intercept reads/writes to storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// applyMiddleware(thunk) lets us dispatch functions (thunks) instead of plain objects.
// When the store sees a dispatched function, Redux Thunk calls it with (dispatch, getState)
// instead of forwarding it to the reducer — that's how async action creators work.
export const store = createStore(persistedReducer, applyMiddleware(thunk));

// persistor is used by PersistGate to delay rendering until rehydration is complete
export const persistor = persistStore(store);
