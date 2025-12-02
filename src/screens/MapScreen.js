// src/screens/MapScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.welcome}>Hoş geldin kanka!</Text>
        <Text style={styles.info}>Dünya haritası yarın burada olacak!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Port')}>
          <Text style={styles.buttonText}>İstanbul Limanı →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 28, fontWeight: 'bold', color: '#e2e8f0', marginBottom: 20 },
  info: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#3b82f6', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});