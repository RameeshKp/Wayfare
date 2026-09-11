import { useState } from 'react';

import * as Location from 'expo-location';

import type { LocationPlace } from '@/store/TripContext';
import { createLocationPlace } from '@/services/locationPlace';

const locationTimeoutMs = 15_000;

function getLocationTimeout(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Location request timed out.')), locationTimeoutMs);
  });
}

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

      const lastKnownLocation = await Location.getLastKnownPositionAsync({
        maxAge: 5 * 60 * 1000,
        requiredAccuracy: 1_000,
      });
      const location =
        lastKnownLocation ??
        (await Promise.race([
          Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
          getLocationTimeout(),
        ]));

      return createLocationPlace({
        fallbackName: 'Current location',
        id: 'current-location',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch {
      setError('We could not get your current location. Check device location is on, then try again.');
      return undefined;
    } finally {
      setIsLoading(false);
    }
  }

  return { error, getCurrentLocation, isLoading };
}
