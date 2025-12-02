// src/screens/PortScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { useGameStore } from '../store/useGameStore';
import { PORTS } from '../constants';

export default function PortScreen({ route, navigation }) {
  const { port } = route.params;
  const currentPrices = useGameStore(state => state.currentPrices);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{port.name} Limanı</Text>
        
        <View style={styles.priceCard}>
          <Text style={styles.cardTitle}>Güncel Fiyatlar</Text>
          {Object.entries(port.basePrices).map(([item, price]) => (
            <View key={item} style={styles.priceRow}>
              <Text style={styles.item}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
              <Text style={styles.price}>${price}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.seferButton}>
          <Text style={styles.seferText}>İlk Sefer Başlat (Yarın aktif)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Haritaya Dön</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#60a5fa', textAlign: 'center', marginBottom: 20 },
  priceCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 12, marginBottom: 30 },
  cardTitle: { fontSize: 20, color: '#60a5fa', marginBottom: 15, textAlign: 'center' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  item: { color: '#e2e8f0', fontSize: 18 },
  price: { color: '#34d399', fontSize: 18, fontWeight: 'bold' },
  seferButton: { backgroundColor: '#10b981', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  seferText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  backButton: { backgroundColor: '#64748b', padding: 16, borderRadius: 12, alignItems: 'center' },
  backText: { color: 'white', fontSize: 18 },
});