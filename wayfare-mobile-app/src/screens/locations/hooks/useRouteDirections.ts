import { useEffect, useState } from 'react';

import { getRouteDirections } from '@/services/directions';

import type { RouteDirections } from '@/services/directions';

type RouteCoordinates = {
  latitude: number;
  longitude: number;
};

export function useRouteDirections(origin: RouteCoordinates, destination: RouteCoordinates, mode: 'driving' | 'walking') {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState<RouteDirections | undefined>(undefined);

  useEffect(() => {
    let isActive = true;

    async function loadRoute() {
      setIsLoading(true);
      setError(undefined);
      setRoute(undefined);

      try {
        const directions = await getRouteDirections(origin, destination, mode);

        if (isActive) {
          setRoute(directions);
        }
      } catch (routeLoadError) {
        if (isActive) {
          setError(
            routeLoadError instanceof Error
              ? routeLoadError.message
              : 'We could not load route directions. Please try again.',
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadRoute();

    return () => {
      isActive = false;
    };
  }, [destination.latitude, destination.longitude, mode, origin.latitude, origin.longitude]);

  return { error, isLoading, route };
}
