// src/components/Header.js
import { View, Text, StyleSheet } from 'react-native';
import { useGameStore } from '../store/useGameStore';

export default function Header() {
  const money = useGameStore(state => state.money);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trade Empire Tycoon</Text>
      <Text style={styles.money}>${money.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#1e293b', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#60a5fa' },
  money: { fontSize: 18, color: '#34d399', fontWeight: 'bold' }
});