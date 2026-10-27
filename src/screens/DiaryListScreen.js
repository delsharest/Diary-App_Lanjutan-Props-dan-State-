
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

import { COLORS, SPACE, TYPO } from '../styles/tokens';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi Hari yang Tenang',
    date: '2025-10-06',
    preview:
      'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body:
      'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit. Udara terasa sejuk dan membuatku lebih bersemangat.',
    moodImage: require('../../assets/moods/happy.png'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview:
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    body:
      'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru yang aku dapatkan hari ini.',
    moodImage: require('../../assets/moods/focus.png'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview:
      'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    body:
      'Menikmati senja sambil membaca buku favorit. Warna langit terlihat sangat indah dan membuat suasana terasa tenang.',
    moodImage: require('../../assets/moods/calm.png'),
  },
  {
    id: 4,
    title: 'Belajar Hal Baru',
    date: '2025-10-03',
    preview:
      'Hari ini mencoba beberapa hal baru dalam pemrograman mobile. Seru dan menantang!',
    body:
      'Hari ini aku mencoba beberapa hal baru dalam pemrograman mobile. Walaupun menantang, pengalaman ini sangat menyenangkan.',
    moodImage: require('../../assets/moods/focus.png'),
  },
  {
    id: 5,
    title: 'Bersyukur Hari Ini',
    date: '2025-10-02',
    preview:
      'Menyempatkan waktu bersama keluarga dan menikmati hal-hal sederhana hari ini...',
    body:
      'Hari ini aku menyempatkan waktu bersama keluarga dan belajar menghargai hal-hal sederhana yang membuatku bahagia.',
    moodImage: require('../../assets/moods/calm.png'),
  },
];

export default function DiaryListScreen() {
  // State utama
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);

  // Filter jurnal berdasarkan judul, isi singkat, atau tanggal
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;

    const q = query.toLowerCase();

    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.preview.toLowerCase().includes(q) ||
        entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);

  // Mengubah status suka
  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  // Menambahkan jurnal baru
  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  // Tampilan setiap kartu jurnal
  const renderItem = ({ item }) => (
    <DiaryCard
      key={item.id}
      title={item.title}
      date={item.date}
      preview={item.preview}
      moodImage={item.moodImage}
      liked={likedIds.has(item.id)}
      onToggleLike={() => toggleLike(item.id)}
      onPress={() => setSelected(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Buku Harian</Text>

        <Image
          source={require('../../assets/avatar.png')}
          style={styles.avatar}
          accessibilityLabel="Avatar pengguna"
        />
      </View>

      <SearchBar onChange={setQuery} />

      <EntryForm onSubmit={addEntry} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Belum ada entri.
          </Text>
        }
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    marginBottom: SPACE.m,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#DBEAFE',
  },
  listContent: {
    paddingHorizontal: SPACE.l,
    paddingBottom: SPACE.l,
    gap: SPACE.m,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
});
