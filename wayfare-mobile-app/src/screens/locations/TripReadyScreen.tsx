import { Platform, Text, UIManager, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/ui/AppButton';
import { useTrip } from '@/hooks/useTrip';
import type { RootStackParamList } from '@/navigation/types';
import { colors } from '@/theme/tokens';

import { styles } from './MapPickerScreen.styles';

type TripReadyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TripReady'>;

function isNativeMapAvailable(): boolean {
  return Platform.OS !== 'web' && UIManager.getViewManagerConfig('AIRMap') !== null;
}

export function TripReadyScreen() {
  const navigation = useNavigation<TripReadyNavigationProp>();
  const { destination, pickup } = useTrip();
  const nativeMapAvailable = isNativeMapAvailable();

  if (pickup === undefined || destination === undefined) {
    navigation.goBack();
    return null;
  }

  const center = {
    latitude: (pickup.latitude + destination.latitude) / 2,
    longitude: (pickup.longitude + destination.longitude) / 2,
  };

  return (
    <View style={styles.screen}>
      {nativeMapAvailable && (
        <MapView initialRegion={{ ...center, latitudeDelta: 0.12, longitudeDelta: 0.12 }} style={styles.map}>
          <Marker coordinate={pickup} pinColor={colors.accent} title="Pickup" />
          <Marker coordinate={destination} title="Drop-off" />
          <Polyline coordinates={[pickup, destination]} strokeColor={colors.accent} strokeWidth={4} />
        </MapView>
      )}
      <View style={styles.controls}>
        <Text style={styles.title}>Trip ready</Text>
        <Text style={styles.subtitle}>From {pickup.name} to {destination.name}</Text>
        <View style={styles.confirm}>
          <AppButton label="Start route" onPress={() => undefined} />
        </View>
      </View>
    </View>
  );
}
