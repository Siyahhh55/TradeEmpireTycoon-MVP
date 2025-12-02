// src/screens/MapScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Header from '../components/Header';
import ActiveVoyage from '../components/ActiveVoyage';
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
      <ActiveVoyage />
      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35,
          longitude: 25,
          latitudeDelta: 90,
          longitudeDelta: 90,
        }}
        showsUserLocation={true}
        followsUserLocation={false}
      >
        {PORTS.map((port) => (
          <Marker
            key={port.id}
            coordinate={{
              latitude: port.coords[0],
              longitude: port.coords[1],
            }}
            title={port.name}
            onPress={() => handlePortPress(port)}
          >
            <View style={styles.markerContainer}>
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
  map: { width, height: height - 160 },
  markerContainer: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#60a5fa',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});