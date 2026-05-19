import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary', 'Animation', 'Other'];

export default function AddMovieScreen() {
  const { addMovie } = useWatchlist();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [notes, setNotes] = useState('');

  function handleAdd() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Title required', 'Please enter a movie title.');
      return;
    }
    addMovie({ title: trimmedTitle, year: year.trim(), genre, notes: notes.trim() });
    setTitle('');
    setYear('');
    setGenre('');
    setNotes('');
    Alert.alert('Added!', `"${trimmedTitle}" added to your watchlist.`);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Movie Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Interstellar"
          placeholderTextColor="#6c7086"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2014"
          placeholderTextColor="#6c7086"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          maxLength={4}
        />

        <Text style={styles.label}>Genre</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled style={styles.genreScroll}>
          {GENRES.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genreChip, genre === g && styles.genreChipActive]}
              onPress={() => setGenre(genre === g ? '' : g)}
            >
              <Text style={[styles.genreText, genre === g && styles.genreTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Why do you want to watch this?"
          placeholderTextColor="#6c7086"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add to Watchlist</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11111b', padding: 20 },
  label: { color: '#cdd6f4', fontSize: 14, fontWeight: '600', marginTop: 20, marginBottom: 8 },
  input: {
    backgroundColor: '#1e1e2e',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#cdd6f4',
    fontSize: 15,
  },
  textarea: { minHeight: 100 },
  genreScroll: { marginBottom: 4 },
  genreChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e1e2e',
    marginRight: 8,
  },
  genreChipActive: { backgroundColor: '#cba6f7' },
  genreText: { color: '#6c7086', fontWeight: '600' },
  genreTextActive: { color: '#11111b' },
  addBtn: {
    backgroundColor: '#cba6f7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  addBtnText: { color: '#11111b', fontSize: 16, fontWeight: '700' },
});
