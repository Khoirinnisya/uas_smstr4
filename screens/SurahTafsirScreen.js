import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

export default function SurahTafsirScreen({ route }) {
  const { surahNumber } = route.params;
  const [tafsirData, setTafsirData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://equran.id/api/v2/tafsir/${surahNumber}`)
      .then(res => res.json())
      .then(response => {
        setTafsirData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tafsir:', error);
        setLoading(false);
      });
  }, [surahNumber]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!tafsirData) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Tafsir tidak tersedia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex:1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Tafsir Surat {tafsirData.nama} - {tafsirData.arti}
      </Text>

      {tafsirData.tafsir.map((ayat, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Ayat {ayat.ayat}</Text>
          <Text style={{ marginTop: 5 }}>{ayat.teks}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
