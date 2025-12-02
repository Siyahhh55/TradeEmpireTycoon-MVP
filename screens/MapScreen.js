// screens/MapScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGameStore } from '../store/gameStore';

export default function MapScreen({ navigation }) {
  const money = useGameStore((state) => state.money);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Empire Tycoon</Text>
      <Text style={styles.money}>Para: ${money.toLocaleString()}</Text>
      <Text style={styles.subtitle}>Hoş geldin kanka!</Text>
      <Text style={styles.info}>Yarın dünya haritası + 6 liman + ilk sefer sistemi canlı olacak!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Port')}>
        <Text style={styles.buttonText}>İlk Limana Git →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#60a5fa', marginBottom: 20 },
  money: { fontSize: 24, color: '#34d399', marginBottom: 30 },
  subtitle: { fontSize: 20, color: '#e2e8f0', marginBottom: 10 },
  info: { fontSize: 16, color: '#94a3b8', textAlign: 'center', paddingHorizontal: 40, marginBottom: 40 },
  button: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});