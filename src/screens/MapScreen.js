// src/screens/MapScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Header from '../components/Header';
import { PORTS } from '../constants';
import { useGameStore } from '../store/useGameStore';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation }) {
  const setCurrentPort = useGameStore(state => state.setCurrentPort);

  const handlePortPress = (port) => {
    setCurrentPort(port.id);
    navigation.navigate('Port', { port });
  };

  return (
    <View style={styles.container}>
      <Header />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30,
          longitude: 30,
          latitudeDelta: 80,
          longitudeDelta: 80,
        }}
      >
        {PORTS.map((port) => (
          <Marker
            key={port.id}
            coordinate={{ latitude: port.coords[0], longitude: port.coords[1] }}
            title={port.name}
            onPress={() => handlePortPress(port)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>{port.name[0]}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  map: { width, height: height - 100 },
  marker: { backgroundColor: '#3b82f6', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#60a5fa' },
  markerText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
});