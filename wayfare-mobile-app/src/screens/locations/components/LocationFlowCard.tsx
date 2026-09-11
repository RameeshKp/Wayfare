import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import CloseSVGComponent from '@/assets/svg/CloseSVGComponent';
import SwapVerticalSVGComponent from '@/assets/svg/SwapVerticalSVGComponent';

import { createRouteLineStyle, styles } from './LocationFlowCard.styles';

import type { LocationPlace } from '@/store/TripContext';
import type { LayoutChangeEvent } from 'react-native';

type LocationFlowCardProps = {
  destination: LocationPlace | undefined;
  onClear: (kind: 'destination' | 'pickup') => void;
  onSelect: (kind: 'destination' | 'pickup') => void;
  onSwap: () => void;
  pickup: LocationPlace | undefined;
};

type RowLayout = {
  height: number;
  y: number;
};

function LocationRow({
  kind,
  onClear,
  onLayout,
  onSelect,
  place,
}: {
  kind: 'destination' | 'pickup';
  onClear: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
  onSelect: () => void;
  place: LocationPlace | undefined;
}) {
  const isPickup = kind === 'pickup';
  const label = isPickup ? 'Pickup' : 'Drop-off';
  const placeholder = isPickup ? 'Choose a starting point' : 'Choose a destination';

  return (
    <View onLayout={onLayout} style={styles.row}>
      <Pressable
        accessibilityLabel={`Choose ${label.toLowerCase()} location`}
        accessibilityRole="button"
        onPress={onSelect}
        style={styles.locationButton}>
        <View style={[styles.dot, isPickup ? styles.pickupDot : styles.dropoffDot]} />
        <View style={styles.textBlock}>
          <Text style={[styles.label, isPickup ? styles.pickupLabel : styles.dropoffLabel]}>{label}</Text>
          <Text numberOfLines={1} style={[styles.value, place && styles.valueSelected]}>
            {place?.name ?? placeholder}
          </Text>
          {place && (
            <Text numberOfLines={1} style={styles.address}>
              {place.address}
            </Text>
          )}
        </View>
      </Pressable>
      {place && (
        <Pressable accessibilityLabel={`Clear ${label.toLowerCase()}`} onPress={onClear} style={styles.clearButton}>
          <CloseSVGComponent />
        </Pressable>
      )}
    </View>
  );
}

export function LocationFlowCard({ destination, onClear, onSelect, onSwap, pickup }: LocationFlowCardProps) {
  const [destinationRowLayout, setDestinationRowLayout] = useState<RowLayout | undefined>(undefined);
  const [pickupRowLayout, setPickupRowLayout] = useState<RowLayout | undefined>(undefined);
  const routeLineStyle =
    pickupRowLayout === undefined || destinationRowLayout === undefined
      ? undefined
      : createRouteLineStyle(pickupRowLayout.y, destinationRowLayout.y, destinationRowLayout.height);

  function updateRowLayout(setRowLayout: (layout: RowLayout | undefined) => void, event: LayoutChangeEvent) {
    const { height, y } = event.nativeEvent.layout;
    setRowLayout({ height, y });
  }

  return (
    <View style={styles.card}>
      {routeLineStyle && <View style={[styles.routeLine, routeLineStyle]} />}
      <LocationRow
        kind="pickup"
        onClear={() => onClear('pickup')}
        onLayout={(event) => updateRowLayout(setPickupRowLayout, event)}
        onSelect={() => onSelect('pickup')}
        place={pickup}
      />
      <View style={styles.divider} />
      <LocationRow
        kind="destination"
        onClear={() => onClear('destination')}
        onLayout={(event) => updateRowLayout(setDestinationRowLayout, event)}
        onSelect={() => onSelect('destination')}
        place={destination}
      />
      <Pressable accessibilityLabel="Swap pickup and drop-off" onPress={onSwap} style={styles.swapButton}>
        <SwapVerticalSVGComponent />
      </Pressable>
    </View>
  );
}
