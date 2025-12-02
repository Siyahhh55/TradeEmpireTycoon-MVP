// src/screens/PortScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import { useGameStore } from '../store/useGameStore';
import { PORTS } from '../constants';
import { startVoyage } from '../services/voyageService';

export default function PortScreen({ route, navigation }) {
  const { port } = route.params;
  const money = useGameStore(state => state.money);

  const handleStartVoyage = () => {
    const targetPort = PORTS.find(p => p.id !== port.id); // rastgele başka liman
    if (!targetPort) return;

    const cargo = {
      petrol: 80,
      elektronik: 15,
      gida: 50,
      tekstil: 30,
      demir: 20,
    };

    startVoyage(port, targetPort, cargo);
    navigation.navigate('Map');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{port.name} LİMANI</Text>
        <Text style={styles.money}>Cüzdan: ${money.toLocaleString()}</Text>

        <View style={styles.priceCard}>
          <Text style={styles.cardTitle}>GÜNCEL FİYATLAR</Text>
          {Object.entries(port.basePrices).map(([item, price]) => (
            <View key={item} style={styles.priceRow}>
              <Text style={styles.itemName}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
              <Text style={styles.price}>${price.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.voyageButton} onPress={handleStartVoyage}>
          <Text style={styles.voyageText}>
            SEFER BAŞLAT → {PORTS.find(p => p.id !== port.id)?.name || 'Şanghay'}
          </Text>
          <Text style={styles.cargoText}>
            80 Petrol • 15 Elektronik • 50 Gıda • 30 Tekstil • 20 Demir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← HARİTAYA DÖN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#60a5fa', textAlign: 'center', marginBottom: 10 },
  money: { fontSize: 20, color: '#34d399', textAlign: 'center', marginBottom: 20 },
  priceCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, marginBottom: 30 },
  cardTitle: { fontSize: 22, color: '#60a5fa', marginBottom: 15, textAlign: 'center', fontWeight: 'bold' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  itemName: { color: '#e2e8f0', fontSize: 18 },
  price: { color: '#34d399', fontSize: 18, fontWeight: 'bold' },
  voyageButton: { backgroundColor: '#10b981', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 20 },
  voyageText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  cargoText: { color: '#ecfccb', fontSize: 14, marginTop: 5 },
  backButton: { backgroundColor: '#475569', padding: 16, borderRadius: 12, alignItems: 'center' },
  backText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});