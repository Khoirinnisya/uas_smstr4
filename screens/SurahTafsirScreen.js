import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function SurahTafsirScreen({ route }) {
  const { nomorSurat } = route.params || {};

  const [tafsir, setTafsir] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nomorSurat) {
      setLoading(false);
      return;
    }

    fetch(`https://equran.id/api/v2/tafsir/${nomorSurat}`)
      .then(res => res.json())
      .then(json => {
        if (json.code === 200) {
          setTafsir(json.data);
        } else {
          setTafsir(null);
        }
      })
      .catch(() => setTafsir(null))
      .finally(() => setLoading(false));
  }, [nomorSurat]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  if (!tafsir) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
        <View style={styles.content}>
          <Text style={styles.errorText}>Tafsir tidak tersedia untuk surat ini.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E91E63" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Tafsir Surat {tafsir.namaLatin} ({tafsir.nama})
        </Text>

        {tafsir?.tafsir?.length > 0 ? (
          tafsir.tafsir.map((item, index) => (
            <View key={`${item.nomorAyat}-${index}`} style={styles.tafsirBox}>
              <Text style={styles.ayatTitle}>Ayat {item.nomorAyat}</Text>
              <Text style={styles.tafsirText}>{item.teks}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>Tafsir tidak tersedia.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FCE4EC' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 20,
    textAlign: 'center',
  },
  tafsirBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  ayatTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: '#C2185B' },
  tafsirText: { fontSize: 16, color: '#880E4F', lineHeight: 24 },
  errorText: { fontSize: 16, color: '#D81B60', textAlign: 'center' },
});
