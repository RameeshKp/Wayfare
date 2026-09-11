import { useState } from 'react';
import { Text, View } from 'react-native';

import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/ui/AppButton';
import { useTrip } from '@/hooks/useTrip';
import type { RootStackParamList } from '@/navigation/types';
import { createLocationPlace } from '@/services/locationPlace';

import { styles } from './MapPickerScreen.styles';

type MapPickerNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PickLocation'>;
type MapPickerRouteProp = RouteProp<RootStackParamList, 'PickLocation'>;

const defaultCoordinate = { latitude: 25.2854, longitude: 51.531 };

export function MapPickerScreen() {
  const navigation = useNavigation<MapPickerNavigationProp>();
  const route = useRoute<MapPickerRouteProp>();
  const { setDestination, setPickup } = useTrip();
  const target = route.params.target;
  const [coordinate, setCoordinate] = useState(defaultCoordinate);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isConfirming, setIsConfirming] = useState(false);

  async function confirmLocation() {
    setError(undefined);
    setIsConfirming(true);

    try {
      await Location.requestForegroundPermissionsAsync();

      const place = await createLocationPlace({
        fallbackName: target === 'pickup' ? 'Pinned pickup' : 'Pinned drop-off',
        id: `map-${target}-${coordinate.latitude}-${coordinate.longitude}`,
        ...coordinate,
      });

      if (target === 'pickup') {
        setPickup(place);
      } else {
        setDestination(place);
      }

      navigation.goBack();
    } catch {
      setError('We could not save that location. Please try another point.');
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <View style={styles.screen}>
      <MapView
        initialRegion={{ ...defaultCoordinate, latitudeDelta: 0.08, longitudeDelta: 0.08 }}
        onPress={(event) => setCoordinate(event.nativeEvent.coordinate)}
        onRegionChangeComplete={(region) =>
          setCoordinate({ latitude: region.latitude, longitude: region.longitude })
        }
        style={styles.map}>
        <Marker coordinate={coordinate} title={target === 'pickup' ? 'Pickup point' : 'Drop-off point'} />
      </MapView>
      <View style={styles.controls}>
        <Text style={styles.title}>Pin your {target === 'pickup' ? 'pickup' : 'drop-off'}</Text>
        <Text style={styles.subtitle}>Tap a point or move the map to position the marker, then confirm.</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.confirm}>
          <AppButton
            disabled={isConfirming}
            label={isConfirming ? 'Finding address…' : 'Confirm location'}
            onPress={() => void confirmLocation()}
          />
        </View>
      </View>
    </View>
  );
}
