import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

const FILTERS = ['All', 'Unwatched', 'Watched'];

export default function WatchlistScreen() {
  const { movies } = useWatchlist();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = movies.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || (filter === 'Watched' ? m.watched : !m.watched);
    return matchSearch && matchFilter;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search movies..."
        placeholderTextColor="#6c7086"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filters}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No movies found.</Text>
          <Text style={styles.emptyHint}>Add some from the + tab!</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11111b' },
  search: {
    margin: 16,
    backgroundColor: '#1e1e2e',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#cdd6f4',
    fontSize: 15,
  },
  filters: { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 4 },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#1e1e2e',
  },
  filterBtnActive: { backgroundColor: '#cba6f7' },
  filterText: { color: '#6c7086', fontWeight: '600' },
  filterTextActive: { color: '#11111b' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#6c7086', fontSize: 18, fontWeight: '600' },
  emptyHint: { color: '#45475a', fontSize: 14, marginTop: 6 },
});
