// WatchlistItem.jsx — Presentational component
// Renders one watchlist entry; no Redux knowledge — everything via props


const WatchlistItem = ({ show, onRemove, onToggle }) => {
  const { name, image, genres, rating, watched, addedAt } = show;
  const poster = image?.medium || image?.original;
  const addedDate = addedAt ? new Date(addedAt).toLocaleDateString() : '';

  return (
    <div className={`watchlist-item ${watched ? 'watched' : ''}`}>
      {poster ? (
        <img src={poster} alt={name} className="watchlist-poster" />
      ) : (
        <div className="watchlist-poster-placeholder">No Image</div>
      )}
      <div className="watchlist-info">
        <h4 className="watchlist-title">{watched ? <s>{name}</s> : name}</h4>
        <p className="watchlist-meta">
          {genres?.slice(0, 2).join(', ') || 'N/A'} &bull; ⭐{' '}
          {rating?.average ?? 'N/A'}
        </p>
        {addedDate && (
          <p className="watchlist-added">Added: {addedDate}</p>
        )}
      </div>
      <div className="watchlist-actions">
        <button
          className={`btn ${watched ? 'btn-undo' : 'btn-success'}`}
          onClick={() => onToggle(show.id)}
        >
          {watched ? 'Undo' : 'Mark Watched'}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onRemove(show.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WatchlistItem;
