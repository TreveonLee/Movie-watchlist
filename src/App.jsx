// App.jsx — Top-level component; layout only, no Redux logic here
import { useState } from 'react';
import BrowseContainer from './containers/BrowseContainer';
import WatchlistContainer from './containers/WatchlistContainer';
import './styles.css';

const App = () => {
  const [tab, setTab] = useState('browse');

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎬 Movie Watchlist</h1>
        <nav className="tab-nav">
          <button
            className={`tab-btn ${tab === 'browse' ? 'active' : ''}`}
            onClick={() => setTab('browse')}
          >
            Browse
          </button>
          <button
            className={`tab-btn ${tab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setTab('watchlist')}
          >
            My Watchlist
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === 'browse' ? <BrowseContainer /> : <WatchlistContainer />}
      </main>
    </div>
  );
};

export default App;
