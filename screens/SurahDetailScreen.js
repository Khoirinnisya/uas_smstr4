import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function SurahDetailScreen({ route }) {
  const { surahNumber } = route.params;
  const [surahDetail, setSurahDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/surat/${surahNumber}`)
      .then(res => res.json())
      .then(response => {
        setSurahDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching surah detail:', error);
        setLoading(false);
      });
  }, [surahNumber]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!surahDetail || !surahDetail.ayat) {
    return (
      <View style={styles.center}>
        <Text>Detail ayat tidak tersedia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{surahDetail.namaLatin} ({surahDetail.nama})</Text>
      <Text style={styles.subtitle}>{surahDetail.arti} - {surahDetail.tempatTurun}</Text>
      <Text style={styles.description}>{surahDetail.deskripsi.replace(/<[^>]*>/g, '')}</Text>

      {surahDetail.ayat.map((item) => (
        <View key={`ayat-${item.nomorAyat}`} style={styles.ayatContainer}>
          <Text style={styles.nomor}>Ayat {item.nomorAyat}</Text>
          <Text style={styles.arab}>{item.teksArab}</Text>
          <Text style={styles.arti}>{item.teksIndonesia}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },
  ayatContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 12,
  },
  nomor: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  arab: {
    fontSize: 28,
    textAlign: 'right',
    marginBottom: 8,
    lineHeight: 40,
  },
  arti: {
    fontSize: 16,
    color: '#333',
  },
});
