import { useState } from 'react';
import { Text, View } from 'react-native';

import { createDetailsLineStyle, styles } from '../RouteViewScreen.styles';

import type { LocationPlace } from '@/store/TripContext';
import type { LayoutChangeEvent } from 'react-native';

type RouteDetailsProps = {
  destination: LocationPlace;
  pickup: LocationPlace;
};

type RowLayout = {
  height: number;
  y: number;
};

export function RouteDetails({ destination, pickup }: RouteDetailsProps) {
  const [destinationRowLayout, setDestinationRowLayout] = useState<RowLayout | undefined>(undefined);
  const [pickupRowLayout, setPickupRowLayout] = useState<RowLayout | undefined>(undefined);
  const lineStyle =
    pickupRowLayout === undefined || destinationRowLayout === undefined
      ? undefined
      : createDetailsLineStyle(
          pickupRowLayout.y,
          pickupRowLayout.height,
          destinationRowLayout.y,
          destinationRowLayout.height,
        );

  function setRowLayout(
    setLayout: (layout: RowLayout) => void,
    event: LayoutChangeEvent,
  ) {
    const { height, y } = event.nativeEvent.layout;
    setLayout({ height, y });
  }

  return (
    <View style={styles.detailsCard}>
      {lineStyle && <View style={[styles.detailsLine, lineStyle]} />}
      <View onLayout={(event) => setRowLayout(setPickupRowLayout, event)} style={styles.row}>
        <View style={styles.pickupDot} />
        <Text numberOfLines={1} style={styles.rowText}>{pickup.name} · {pickup.address}</Text>
      </View>
      <View onLayout={(event) => setRowLayout(setDestinationRowLayout, event)} style={styles.row}>
        <View style={styles.destinationDot} />
        <Text numberOfLines={1} style={styles.rowText}>{destination.name} · {destination.address}</Text>
      </View>
    </View>
  );
}
