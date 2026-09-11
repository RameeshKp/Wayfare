import * as Location from 'expo-location';

import type { LocationPlace } from '@/store/TripContext';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type CreateLocationPlaceOptions = Coordinates & {
  fallbackName: string;
  id: string;
};

function joinAddressParts(parts: Array<string | null | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(', ');
}

function isPlaceName(candidate: string | null | undefined): candidate is string {
  if (!candidate || !/[A-Za-z\p{L}]/u.test(candidate)) {
    return false;
  }

  const normalizedCandidate = candidate.trim();
  const isHouseOrBuildingLabel = /\b(building|bldg|house|villa|plot|zone|block)\b/i.test(
    normalizedCandidate,
  );
  const isRoadLabel = /\b(avenue|ave|boulevard|blvd|highway|hwy|road|rd|street|st)\.?$/i.test(
    normalizedCandidate,
  );

  return !isHouseOrBuildingLabel && !isRoadLabel;
}

function getLocationName(address: Location.LocationGeocodedAddress, fallbackName: string): string {
  const placeName = [address.name].find(isPlaceName);

  if (placeName) {
    return placeName;
  }

  const areaName = [address.district, address.city, address.subregion, address.region].find(
    isPlaceName,
  );

  return areaName ?? fallbackName;
}

export async function createLocationPlace({
  fallbackName,
  id,
  latitude,
  longitude,
}: CreateLocationPlaceOptions): Promise<LocationPlace> {
  const fallbackAddress = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (address) {
      const name = getLocationName(address, fallbackName);
      const formattedAddress = joinAddressParts([
        joinAddressParts([address.streetNumber, address.street]),
        address.district,
        address.city,
        address.region,
        address.country,
      ]);

      return {
        address: formattedAddress || fallbackAddress,
        id,
        latitude,
        longitude,
        name,
        type: 'recent',
      };
    }
  } catch {
    // A user can still select a map point when reverse geocoding is unavailable.
  }

  return {
    address: fallbackAddress,
    id,
    latitude,
    longitude,
    name: fallbackName,
    type: 'recent',
  };
}
