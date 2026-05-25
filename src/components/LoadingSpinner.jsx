// LoadingSpinner.jsx — Presentational component
// Pure display component — equivalent to React Native's ActivityIndicator


const LoadingSpinner = ({ message = 'Loading…' }) => (
  <div className="loading-container">
    <div className="spinner" aria-label="Loading" />
    <p className="loading-text">{message}</p>
  </div>
);

export default LoadingSpinner;
