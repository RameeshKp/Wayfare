import { useState } from 'react';
import { Text, View } from 'react-native';

import { createDetailsLineStyle, styles } from '../RouteViewScreen.styles';

import type { LocationPlace } from '@/store/TripContext';
import type { LayoutChangeEvent } from 'react-native';

type RouteDetailsProps = {
  destination: LocationPlace;
  pickup: LocationPlace;
};

export function RouteDetails({ destination, pickup }: RouteDetailsProps) {
  const [destinationDotY, setDestinationDotY] = useState<number | undefined>(undefined);
  const [pickupDotY, setPickupDotY] = useState<number | undefined>(undefined);
  const lineStyle =
    pickupDotY === undefined || destinationDotY === undefined
      ? undefined
      : createDetailsLineStyle(pickupDotY, destinationDotY);

  function setDotPosition(setPosition: (value: number) => void, event: LayoutChangeEvent) {
    setPosition(event.nativeEvent.layout.y);
  }

  return (
    <View style={styles.detailsCard}>
      <View style={styles.row}>
        <View onLayout={(event) => setDotPosition(setPickupDotY, event)} style={styles.pickupDot} />
        <Text numberOfLines={1} style={styles.rowText}>{pickup.name} · {pickup.address}</Text>
      </View>
      <View style={styles.row}>
        <View onLayout={(event) => setDotPosition(setDestinationDotY, event)} style={styles.destinationDot} />
        <Text numberOfLines={1} style={styles.rowText}>{destination.name} · {destination.address}</Text>
      </View>
      {lineStyle && <View style={[styles.detailsLine, lineStyle]} />}
    </View>
  );
}
