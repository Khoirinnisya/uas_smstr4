import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function SurahListScreen({ navigation }) {
  const [surahList, setSurahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(response => {
        setSurahList(response.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching surah list:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={surahList}
        keyExtractor={item => item.nomor.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.nomor}. {item.nama}</Text>
            <Text style={{ color: '#555' }}>{item.arti}</Text>

            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => navigation.navigate('DetailScreen', { surahNumber: item.nomor })}
              >
                <Text style={{ color: 'blue' }}>Lihat Ayat</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('TafsirScreen', { surahNumber: item.nomor })}
              >
                <Text style={{ color: 'green' }}>Lihat Tafsir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
