import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

export default function StatsScreen() {
  const { movies } = useWatchlist();

  const watched = movies.filter(m => m.watched);
  const unwatched = movies.filter(m => !m.watched);
  const rated = watched.filter(m => m.rating);
  const avgRating = rated.length ? (rated.reduce((s, m) => s + m.rating, 0) / rated.length).toFixed(1) : '-';

  const genreCounts = movies.reduce((acc, m) => {
    if (m.genre) acc[m.genre] = (acc[m.genre] || 0) + 1;
    return acc;
  }, {});
  const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Stats</Text>

      <View style={styles.row}>
        <StatCard label="Total" value={movies.length} color="#cba6f7" />
        <StatCard label="Watched" value={watched.length} color="#a6e3a1" />
        <StatCard label="To Watch" value={unwatched.length} color="#89b4fa" />
      </View>

      <View style={[styles.row, { marginTop: 12 }]}>
        <StatCard label="Avg Rating" value={avgRating} color="#f9e2af" />
        <StatCard label="Rated" value={rated.length} color="#fab387" />
        <StatCard label="Completion" value={movies.length ? Math.round((watched.length / movies.length) * 100) + '%' : '0%'} color="#f38ba8" />
      </View>

      {topGenres.length > 0 && (
        <>
          <Text style={styles.subheading}>Top Genres</Text>
          {topGenres.map(([genre, count]) => (
            <View key={genre} style={styles.genreRow}>
              <Text style={styles.genreName}>{genre}</Text>
              <View style={styles.barBg}>
                <View style={[styles.bar, { width: `${(count / movies.length) * 100}%` }]} />
              </View>
              <Text style={styles.genreCount}>{count}</Text>
            </View>
          ))}
        </>
      )}

      {movies.length === 0 && (
        <Text style={styles.empty}>Add movies to see your stats!</Text>
      )}
    </ScrollView>
  );
}

function StatCard({ label, value, color }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.cardValue, { color }]}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11111b', padding: 20 },
  heading: { color: '#cdd6f4', fontSize: 24, fontWeight: '700', marginBottom: 20 },
  subheading: { color: '#cdd6f4', fontSize: 18, fontWeight: '600', marginTop: 28, marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cardValue: { fontSize: 28, fontWeight: '800' },
  cardLabel: { color: '#6c7086', fontSize: 12, marginTop: 4, fontWeight: '600' },
  genreRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6, gap: 10 },
  genreName: { color: '#cdd6f4', width: 90, fontSize: 14 },
  barBg: { flex: 1, height: 10, backgroundColor: '#1e1e2e', borderRadius: 5 },
  bar: { backgroundColor: '#cba6f7', borderRadius: 5 },
  genreCount: { color: '#6c7086', width: 24, textAlign: 'right' },
  empty: { color: '#6c7086', textAlign: 'center', marginTop: 60, fontSize: 16 },
});
