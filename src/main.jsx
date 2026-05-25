// main.jsx — Entry point
// Provider makes the Redux store available to all components in the tree.
// PersistGate delays rendering until redux-persist has rehydrated the store
// from localStorage — this is what restores state across page reloads.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provider gives every connected component access to the Redux store */}
    <Provider store={store}>
      {/* PersistGate waits for rehydration before rendering the app tree.
          The loading prop is shown while AsyncStorage/localStorage is being read. */}
      <PersistGate loading={<div style={{ padding: '2rem', textAlign: 'center' }}>Restoring your watchlist…</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
