// BrowseContainer.jsx — Container component (connected to Redux)
// Knows about Redux; selects data from the store and binds action creators.
// Passes everything down as props to presentational components.
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShows, addToWatchlist } from '../redux/actions';
import SearchBar from '../components/SearchBar';
import ShowCard from '../components/ShowCard';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseContainer = ({
  results,
  loading,
  error,
  lastUpdated,
  watchlistIds,
  fetchShows,
  addToWatchlist,
}) => {
  // Fetch default results on first mount
  useEffect(() => {
    fetchShows('action');
  }, []);

  return (
    <section className="browse-section">
      <h2 className="section-title">Browse Shows</h2>
      <SearchBar onSearch={fetchShows} loading={loading} />

      {lastUpdated && (
        <p className="last-updated">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}

      {/* Loading state — shown while the async thunk is in-flight */}
      {loading && <LoadingSpinner message="Fetching shows…" />}

      {/* Error state — shown when the thunk dispatches FETCH_SHOWS_ERROR */}
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
          <button className="btn btn-primary retry-btn" onClick={() => fetchShows('action')}>
            Retry
          </button>
        </div>
      )}

      {/* Results grid — only shown when not loading and no error */}
      {!loading && !error && (
        <div className="shows-grid">
          {results.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onAdd={addToWatchlist}
              isInWatchlist={watchlistIds.has(show.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

// mapStateToProps — selects only what this component needs from the store
const mapStateToProps = (state) => ({
  results: state.shows.results,
  loading: state.shows.loading,
  error: state.shows.error,
  lastUpdated: state.shows.lastUpdated,
  // Build a Set of IDs already in the watchlist for O(1) lookup in ShowCard
  watchlistIds: new Set(state.watchlist.items.map((s) => s.id)),
});

// mapDispatchToProps — binds action creators to dispatch
const mapDispatchToProps = {
  fetchShows,
  addToWatchlist,
};

// connect() wires the component to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);
