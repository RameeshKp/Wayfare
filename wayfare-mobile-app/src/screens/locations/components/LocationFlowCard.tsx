import { Pressable, Text, View } from 'react-native';

import CloseSVGComponent from '@/assets/svg/CloseSVGComponent';
import SwapVerticalSVGComponent from '@/assets/svg/SwapVerticalSVGComponent';

import { styles } from './LocationFlowCard.styles';

import type { LocationPlace } from '@/store/TripContext';

type LocationFlowCardProps = {
  destination: LocationPlace | undefined;
  onClear: (kind: 'destination' | 'pickup') => void;
  onSwap: () => void;
  pickup: LocationPlace | undefined;
};

function LocationRow({
  kind,
  onClear,
  place,
}: {
  kind: 'destination' | 'pickup';
  onClear: () => void;
  place: LocationPlace | undefined;
}) {
  const isPickup = kind === 'pickup';
  const label = isPickup ? 'Pickup' : 'Drop-off';
  const placeholder = isPickup ? 'Choose a starting point' : 'Choose a destination';

  return (
    <View style={styles.row}>
      <View style={[styles.dot, isPickup ? styles.pickupDot : styles.dropoffDot]} />
      <View style={styles.textBlock}>
        <Text style={[styles.label, isPickup ? styles.pickupLabel : styles.dropoffLabel]}>{label}</Text>
        <Text numberOfLines={1} style={[styles.value, place && styles.valueSelected]}>
          {place?.name ?? placeholder}
        </Text>
      </View>
      {place && (
        <Pressable accessibilityLabel={`Clear ${label.toLowerCase()}`} onPress={onClear} style={styles.clearButton}>
          <CloseSVGComponent />
        </Pressable>
      )}
    </View>
  );
}

export function LocationFlowCard({ destination, onClear, onSwap, pickup }: LocationFlowCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.routeLine} />
      <LocationRow kind="pickup" onClear={() => onClear('pickup')} place={pickup} />
      <View style={styles.divider} />
      <LocationRow kind="destination" onClear={() => onClear('destination')} place={destination} />
      <Pressable accessibilityLabel="Swap pickup and drop-off" onPress={onSwap} style={styles.swapButton}>
        <SwapVerticalSVGComponent />
      </Pressable>
    </View>
  );
}
