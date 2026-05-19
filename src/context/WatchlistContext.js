import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

const STORAGE_KEY = '@movie_watchlist';

export function WatchlistProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setMovies(JSON.parse(data));
    } catch (e) {
      console.error('Failed to load movies', e);
    }
  }

  async function saveMovies(updated) {
    setMovies(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save movies', e);
    }
  }

  function addMovie(movie) {
    const updated = [{ ...movie, id: Date.now().toString(), watched: false, addedAt: new Date().toISOString() }, ...movies];
    saveMovies(updated);
  }

  function removeMovie(id) {
    saveMovies(movies.filter(m => m.id !== id));
  }

  function toggleWatched(id) {
    saveMovies(movies.map(m => m.id === id ? { ...m, watched: !m.watched } : m));
  }

  function updateRating(id, rating) {
    saveMovies(movies.map(m => m.id === id ? { ...m, rating } : m));
  }

  return (
    <WatchlistContext.Provider value={{ movies, addMovie, removeMovie, toggleWatched, updateRating }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
