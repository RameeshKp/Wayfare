import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wayfare</Text>
      <Text style={styles.subtitle}>Your demo app is ready.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
  },
});
