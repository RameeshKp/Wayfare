import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wayfare</Text>
      <Text style={styles.subtitle}>Your demo app is ready.</Text>
    </SafeAreaView>
  );
}
