import { Text, View } from 'react-native';

import ShareSVGComponent from '@/assets/svg/ShareSVGComponent';

import { styles } from '../RouteViewScreen.styles';

type RouteStepsProps = {
  distance: string;
};

export function RouteSteps({ distance }: RouteStepsProps) {
  return (
    <>
      <Text style={styles.turnByTurnLabel}>Turn by turn</Text>
      <View style={styles.step}>
        <View style={styles.stepIcon}><ShareSVGComponent /></View>
        <View style={styles.rowText}>
          <Text style={styles.stepTitle}>Head toward your destination</Text>
          <Text style={styles.stepSubtitle}>Follow the highlighted route</Text>
        </View>
        <Text style={styles.arrival}>450 m</Text>
      </View>
      <View style={styles.step}>
        <View style={styles.stepIcon}><ShareSVGComponent /></View>
        <View style={styles.rowText}>
          <Text style={styles.stepTitle}>Continue on the main road</Text>
          <Text style={styles.stepSubtitle}>Moderate traffic near the route</Text>
        </View>
        <Text style={styles.arrival}>{distance}</Text>
      </View>
    </>
  );
}
