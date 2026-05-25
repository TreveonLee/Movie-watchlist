// ShowCard.jsx — Presentational component
// Displays a single TV show; receives all data and callbacks via props — no Redux


const ShowCard = ({ show, onAdd, isInWatchlist }) => {
  const { name, image, summary, genres, rating, premiered } = show;
  const poster = image?.medium || image?.original;
  const cleanSummary = summary
    ? summary.replace(/<[^>]+>/g, '').slice(0, 120) + '…'
    : 'No description available.';

  return (
    <div className="show-card">
      {poster ? (
        <img src={poster} alt={name} className="show-poster" />
      ) : (
        <div className="show-poster-placeholder">No Image</div>
      )}
      <div className="show-info">
        <h3 className="show-title">{name}</h3>
        <p className="show-meta">
          {premiered ? premiered.slice(0, 4) : '—'} &bull;{' '}
          {genres?.slice(0, 2).join(', ') || 'N/A'} &bull; ⭐{' '}
          {rating?.average ?? 'N/A'}
        </p>
        <p className="show-summary">{cleanSummary}</p>
        <button
          className={`btn ${isInWatchlist ? 'btn-added' : 'btn-primary'}`}
          onClick={() => onAdd(show)}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default ShowCard;
