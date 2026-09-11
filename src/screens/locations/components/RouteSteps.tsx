import { Text, View } from 'react-native';

import ShareSVGComponent from '@/assets/svg/ShareSVGComponent';
import type { RouteStep } from '@/services/directions';

import { styles } from '../RouteViewScreen.styles';

type RouteStepsProps = {
  steps: RouteStep[];
};

export function RouteSteps({ steps }: RouteStepsProps) {
  return (
    <>
      <Text style={styles.turnByTurnLabel}>Turn by turn</Text>
      {steps.length ? (
        steps.map((step, index) => (
          <View key={`${step.instruction}-${index}`} style={styles.step}>
            <View style={styles.stepIcon}>
              <ShareSVGComponent />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.instruction}</Text>
            </View>
            <Text style={styles.arrival}>{step.distanceText}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyStepsText}>
          Turn-by-turn instructions are not available for this route.
        </Text>
      )}
    </>
  );
}
