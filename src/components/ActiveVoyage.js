// src/components/ActiveVoyage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

export default function ActiveVoyage() {
  const voyage = useGameStore(state => state.activeVoyage);

  if (!voyage) return null;

  const minutes = Math.floor(voyage.remaining / 60000);
  const seconds = String(Math.floor((voyage.remaining % 60000) / 1000)).padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEFER DEVAM EDİYOR</Text>
      <Text style={styles.route}>{voyage.from.name} → {voyage.to.name}</Text>
      <Text style={styles.timer}>{minutes}:{seconds}</Text>
      <Text style={styles.profit}>Tahmini Kâr: ${voyage.profit.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#172554', padding: 12, margin: 10, borderRadius: 12, borderWidth: 2, borderColor: '#3b82f6' },
  title: { color: '#60a5fa', fontWeight: 'bold', fontSize: 14 },
  route: { color: '#e2e8f0', fontSize: 16, fontWeight: 'bold' },
  timer: { color: '#f59e0b', fontSize: 20, fontWeight: 'bold' },
  profit: { color: '#34d399', fontWeight: 'bold', fontSize: 16 },
});