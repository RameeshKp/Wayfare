import AsyncStorage from '@react-native-async-storage/async-storage';

import type { LocationPlace } from '@/store/TripContext';

const recentLocationsStorageKey = '@wayfare/recent-locations';
const maximumRecentLocations = 4;

function parseLocationPlace(value: unknown): LocationPlace | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined;
  }

  const place = value as Record<string, unknown>;

  if (
    typeof place.address !== 'string' ||
    typeof place.id !== 'string' ||
    typeof place.latitude !== 'number' ||
    typeof place.longitude !== 'number' ||
    typeof place.name !== 'string'
  ) {
    return undefined;
  }

  return {
    address: place.address,
    id: place.id,
    latitude: place.latitude,
    longitude: place.longitude,
    name: place.name,
    type: 'recent',
  };
}

export async function loadRecentLocations(): Promise<LocationPlace[]> {
  try {
    const storedLocations = await AsyncStorage.getItem(recentLocationsStorageKey);

    if (!storedLocations) {
      return [];
    }

    const parsedLocations: unknown = JSON.parse(storedLocations);

    if (!Array.isArray(parsedLocations)) {
      return [];
    }

    return parsedLocations
      .map(parseLocationPlace)
      .filter((place): place is LocationPlace => place !== undefined)
      .slice(0, maximumRecentLocations);
  } catch {
    return [];
  }
}

export async function persistRecentLocations(locations: LocationPlace[]): Promise<void> {
  await AsyncStorage.setItem(
    recentLocationsStorageKey,
    JSON.stringify(locations.slice(0, maximumRecentLocations)),
  );
}

export function addRecentLocation(
  locations: LocationPlace[],
  location: LocationPlace,
): LocationPlace[] {
  const recentLocation: LocationPlace = { ...location, type: 'recent' };
  const remainingLocations = locations.filter(
    (place) =>
      place.id !== recentLocation.id &&
      (place.latitude !== recentLocation.latitude || place.longitude !== recentLocation.longitude),
  );

  return [recentLocation, ...remainingLocations].slice(0, maximumRecentLocations);
}
