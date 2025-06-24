import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SurahListScreen({ navigation }) {
  const [surahList, setSurahList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://equran.id/api/v2/surat')
      .then(res => res.json())
      .then(json => {
        setSurahList(json.data);
        setFilteredList(json.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredList(surahList);
      return;
    }

    const filtered = surahList.filter(item =>
      item.namaLatin.toLowerCase().includes(text.toLowerCase()) ||
      item.nomor.toString().includes(text) ||
      item.nama.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredList(filtered);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#D81B60" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER BUATAN SENDIRI */}
      <LinearGradient colors={['#D81B60', '#F06292']} style={styles.header}>
        <Text style={styles.headerTitle}>Daftar Surat</Text>
      </LinearGradient>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Cari Surat berdasarkan nama atau nomor..."
          value={searchText}
          onChangeText={handleSearch}
          style={styles.searchInput}
          clearButtonMode="while-editing"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {/* LIST SURAT */}
      <FlatList
        data={filteredList}
        keyExtractor={item => item.nomor.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.item, { backgroundColor: index % 2 === 0 ? '#fff' : '#fde0ec' }]}
            onPress={() => navigation.navigate('SurahDetail', { nomorSurat: item.nomor })}
          >
            <Text style={styles.nomor}>{item.nomor}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.namaLatin}>{item.namaLatin}</Text>
              <Text style={styles.arti}>{item.arti}</Text>
            </View>
            <Text style={styles.namaArab}>{item.nama}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: '#AD1457', fontSize: 16 }}>Surat tidak ditemukan.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff0f6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    height: 80,
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff0f6',
  },
  searchInput: {
    height: 44,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#D81B60',
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#880E4F',
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  nomor: {
    width: 30,
    fontWeight: 'bold',
    color: '#D81B60',
  },
  namaLatin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#880E4F',
  },
  arti: {
    fontSize: 14,
    color: '#AD1457',
  },
  namaArab: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D81B60',
  },
});
