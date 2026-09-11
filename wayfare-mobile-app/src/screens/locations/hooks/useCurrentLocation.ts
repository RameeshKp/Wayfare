import { useState } from 'react';

import * as Location from 'expo-location';

import type { LocationPlace } from '@/store/TripContext';

export function useCurrentLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  async function getCurrentLocation(): Promise<LocationPlace | undefined> {
    setIsLoading(true);
    setError(undefined);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setError('Location permission is needed to use your current location.');
        return undefined;
      }

      const location = await Location.getCurrentPositionAsync({});

      return {
        address: 'Current location',
        id: 'current-location',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        name: 'Current location',
        type: 'recent',
      };
    } catch {
      setError('We could not get your current location. Try again or select a place.');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  return { error, getCurrentLocation, isLoading };
}
