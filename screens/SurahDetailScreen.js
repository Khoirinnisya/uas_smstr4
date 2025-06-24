import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function SurahDetailScreen({ navigation, route }) {
  const { nomorSurat } = route.params || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nomorSurat) return;
    fetch(`https://equran.id/api/v2/surat/${nomorSurat}`)
      .then(res => res.json())
      .then(json => {
        if (json.code === 200) {
          setData(json.data);
        }
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [nomorSurat]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#D81B60" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Data surat tidak tersedia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.namaLatin}>{data.namaLatin} ({data.nama})</Text>
      <Text style={styles.info}>Jumlah Ayat: {data.jumlahAyat}</Text>
      <Text style={styles.info}>Tempat Turun: {data.tempatTurun}</Text>
      <Text style={styles.arti}>Arti: {data.arti}</Text>

      <View style={{ marginVertical: 16 }}>
        <Button
          color="#E91E63"
          title="Lihat Tafsir"
          onPress={() => navigation.navigate('SurahTafsir', { nomorSurat: data.nomor })}
        />
      </View>

      <View>
        {data.ayat.map(ayat => (
          <View key={ayat.nomorAyat} style={styles.ayatContainer}>
            <Text style={styles.teksArab}>{ayat.teksArab}</Text>
            <Text style={styles.teksLatin}>{ayat.teksLatin}</Text>
            <Text style={styles.teksIndonesia}>{ayat.teksIndonesia}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF0F6' },
  center: { justifyContent: 'center', alignItems: 'center' },
  namaLatin: { fontSize: 24, fontWeight: 'bold', color: '#E91E63', textAlign: 'center' },
  info: { fontSize: 16, color: '#AD1457', marginVertical: 4, textAlign: 'center' },
  arti: { fontSize: 16, fontStyle: 'italic', marginTop: 8, color: '#880E4F', textAlign: 'center' },
  ayatContainer: {
    marginBottom: 16,
    backgroundColor: '#FCE4EC',
    padding: 12,
    borderRadius: 8,
  },
  teksArab: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#D81B60',
    marginBottom: 4,
  },
  teksLatin: { fontSize: 16, fontStyle: 'italic', color: '#AD1457', marginBottom: 4 },
  teksIndonesia: { fontSize: 16, color: '#880E4F' },
  errorText: { textAlign: 'center', fontSize: 18, color: '#E91E63' },
});
