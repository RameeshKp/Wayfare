import { googleMapsAndroidApiKey } from '@/services/mapsConfig';

export type RouteDirections = {
  coordinates: Array<{ latitude: number; longitude: number }>;
  distanceText: string;
  durationMinutes: number;
};

type RoutesApiResponse = {
  error?: {
    message?: string;
    status?: string;
  };
  routes?: Array<{
    distanceMeters?: number;
    duration?: string;
    polyline?: { encodedPolyline?: string };
  }>;
};

function getRouteErrorMessage(responseData: RoutesApiResponse): string {
  const errorMessage = responseData.error?.message?.toLowerCase();

  if (errorMessage?.includes('billing')) {
    return 'Google Maps billing must be enabled before route directions can be shown.';
  }

  if (responseData.error?.status === 'PERMISSION_DENIED') {
    return 'Routes API access is not authorized for this app configuration.';
  }

  return 'A road route is not available between these locations. Choose another destination or travel mode.';
}

function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1000) {
    return `${distanceMeters} m`;
  }

  return `${(distanceMeters / 1000).toFixed(1)} km`;
}

function durationToMinutes(duration: string): number | undefined {
  const seconds = Number.parseFloat(duration.replace(/s$/, ''));

  return Number.isFinite(seconds) && seconds > 0 ? seconds / 60 : undefined;
}

function decodePolyline(encodedPolyline: string): RouteDirections['coordinates'] {
  const coordinates: RouteDirections['coordinates'] = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encodedPolyline.length) {
    let result = 0;
    let shift = 0;
    let byte: number;

    do {
      byte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude += result & 1 ? ~(result >> 1) : result >> 1;
    result = 0;
    shift = 0;

    do {
      byte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude += result & 1 ? ~(result >> 1) : result >> 1;
    coordinates.push({ latitude: latitude / 1e5, longitude: longitude / 1e5 });
  }

  return coordinates;
}

export async function getRouteDirections(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
  mode: 'driving' | 'walking',
): Promise<RouteDirections> {
  if (!googleMapsAndroidApiKey) {
    throw new Error('Maps key unavailable.');
  }

  const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    body: JSON.stringify({
      computeAlternativeRoutes: false,
      destination: {
        location: {
          latLng: {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        },
      },
      languageCode: 'en',
      origin: {
        location: {
          latLng: {
            latitude: origin.latitude,
            longitude: origin.longitude,
          },
        },
      },
      routingPreference: mode === 'driving' ? 'TRAFFIC_AWARE' : undefined,
      travelMode: mode === 'driving' ? 'DRIVE' : 'WALK',
      units: 'METRIC',
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': googleMapsAndroidApiKey,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
    },
    method: 'POST',
  });
  const responseData = (await response.json()) as RoutesApiResponse;
  const route = responseData.routes?.[0];
  const durationMinutes = route?.duration ? durationToMinutes(route.duration) : undefined;
  const encodedPolyline = route?.polyline?.encodedPolyline;

  if (!response.ok || !route?.distanceMeters || !durationMinutes || !encodedPolyline) {
    throw new Error(getRouteErrorMessage(responseData));
  }

  return {
    coordinates: decodePolyline(encodedPolyline),
    distanceText: formatDistance(route.distanceMeters),
    durationMinutes,
  };
}
