import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

const STARS = [1, 2, 3, 4, 5];

export default function MovieCard({ movie }) {
  const { toggleWatched, removeMovie, updateRating } = useWatchlist();

  function confirmRemove() {
    Alert.alert('Remove Movie', `Remove "${movie.title}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeMovie(movie.id) },
    ]);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
          {movie.year ? <Text style={styles.year}>({movie.year})</Text> : null}
        </View>
        <TouchableOpacity onPress={confirmRemove} style={styles.removeBtn}>
          <Text style={styles.removeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {movie.genre ? <Text style={styles.genre}>{movie.genre}</Text> : null}
      {movie.notes ? <Text style={styles.notes}>{movie.notes}</Text> : null}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.watchedBtn, movie.watched && styles.watchedBtnActive]}
          onPress={() => toggleWatched(movie.id)}
        >
          <Text style={[styles.watchedText, movie.watched && styles.watchedTextActive]}>
            {movie.watched ? '✓ Watched' : 'Mark Watched'}
          </Text>
        </TouchableOpacity>

        {movie.watched && (
          <View style={styles.stars}>
            {STARS.map(star => (
              <TouchableOpacity key={star} onPress={() => updateRating(movie.id, star)}>
                <Text style={[styles.star, star <= (movie.rating || 0) && styles.starFilled]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleRow: { flex: 1, marginRight: 8 },
  title: { color: '#fff', fontSize: 17, fontWeight: '700' },
  year: { color: '#888', fontSize: 13, marginTop: 2 },
  removeBtn: { padding: 4 },
  removeText: { color: '#f38ba8', fontSize: 18, fontWeight: '700' },
  genre: { color: '#cba6f7', fontSize: 12, marginTop: 6 },
  notes: { color: '#a6adc8', fontSize: 13, marginTop: 6, fontStyle: 'italic' },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 },
  watchedBtn: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#6c7086',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  watchedBtnActive: { borderColor: '#a6e3a1', backgroundColor: '#1e3a2e' },
  watchedText: { color: '#6c7086', fontSize: 13, fontWeight: '600' },
  watchedTextActive: { color: '#a6e3a1' },
  stars: { flexDirection: 'row', gap: 4 },
  star: { fontSize: 22, color: '#45475a' },
  starFilled: { color: '#f9e2af' },
});
