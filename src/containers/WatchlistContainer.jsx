// WatchlistContainer.jsx — Container component (connected to Redux)
// Selects watchlist data from the store and passes it to presentational components.
// The watchlist slice is persisted via redux-persist and survives page reloads.

import { connect } from 'react-redux';
import { removeFromWatchlist, toggleWatched, clearWatchlist } from '../redux/actions';
import WatchlistItem from '../components/WatchlistItem';

const WatchlistContainer = ({ items, removeFromWatchlist, toggleWatched, clearWatchlist }) => {
  const watched = items.filter((s) => s.watched);
  const toWatch = items.filter((s) => !s.watched);

  return (
    <section className="watchlist-section">
      <div className="watchlist-header">
        <h2 className="section-title">
          My Watchlist{' '}
          <span className="watchlist-count">{items.length}</span>
        </h2>
        {items.length > 0 && (
          <button
            className="btn btn-danger clear-btn"
            onClick={() => {
              if (window.confirm('Clear your entire watchlist?')) clearWatchlist();
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 && (
        <p className="empty-message">
          Your watchlist is empty. Browse shows and add some!
        </p>
      )}

      {toWatch.length > 0 && (
        <>
          <h3 className="sub-title">Want to Watch ({toWatch.length})</h3>
          <div className="watchlist-list">
            {toWatch.map((show) => (
              <WatchlistItem
                key={show.id}
                show={show}
                onRemove={removeFromWatchlist}
                onToggle={toggleWatched}
              />
            ))}
          </div>
        </>
      )}

      {watched.length > 0 && (
        <>
          <h3 className="sub-title watched-title">Watched ({watched.length})</h3>
          <div className="watchlist-list">
            {watched.map((show) => (
              <WatchlistItem
                key={show.id}
                show={show}
                onRemove={removeFromWatchlist}
                onToggle={toggleWatched}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

// mapStateToProps — pulls the persisted watchlist from the store
const mapStateToProps = (state) => ({
  items: state.watchlist.items,
});

const mapDispatchToProps = {
  removeFromWatchlist,
  toggleWatched,
  clearWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer);
