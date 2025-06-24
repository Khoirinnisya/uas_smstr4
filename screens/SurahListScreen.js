import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function SurahListScreen({ navigation }) {
  const [surahList, setSurahList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(json => {
        setSurahList(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#D81B60" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#D81B60" barStyle="light-content" />

      {/* Header Gradasi */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>📖</Text>
        <Text style={styles.headerTitle}>Daftar Surat</Text>
      </View>

      <FlatList
        data={surahList}
        keyExtractor={item => item.nomor.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SurahDetail', { nomorSurat: item.nomor })}
          >
            <View style={styles.cardLeft}>
              <Text style={styles.nomor}>{item.nomor}</Text>
            </View>
            <View style={styles.cardCenter}>
              <Text style={styles.namaLatin}>{item.namaLatin}</Text>
              <Text style={styles.arti}>{item.arti}</Text>
            </View>
            <Text style={styles.namaArab}>{item.nama}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF0F6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    backgroundColor: '#D81B60',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerEmoji: {
    fontSize: 28,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  cardLeft: {
    backgroundColor: '#F8BBD0',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nomor: {
    color: '#D81B60',
    fontWeight: 'bold',
  },
  cardCenter: {
    flex: 1,
  },
  namaLatin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#880E4F',
  },
  arti: {
    fontSize: 13,
    color: '#AD1457',
  },
  namaArab: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D81B60',
  },
});