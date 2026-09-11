import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

import {
  addRecentLocation,
  loadRecentLocations,
  persistRecentLocations,
} from '@/services/recentLocations';

export type LocationPlace = {
  address: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  type: 'home' | 'recent';
};

type TripContextValue = {
  destination: LocationPlace | undefined;
  pickup: LocationPlace | undefined;
  recentLocations: LocationPlace[];
  setDestination: (place: LocationPlace | undefined) => void;
  setPickup: (place: LocationPlace | undefined) => void;
  swapLocations: () => void;
};

export const TripContext = createContext<TripContextValue | undefined>(undefined);

type TripProviderProps = {
  children: ReactNode;
};

export function TripProvider({ children }: TripProviderProps) {
  const [pickup, setPickupState] = useState<LocationPlace | undefined>(undefined);
  const [destination, setDestinationState] = useState<LocationPlace | undefined>(undefined);
  const [recentLocations, setRecentLocations] = useState<LocationPlace[]>([]);

  useEffect(() => {
    void loadRecentLocations().then(setRecentLocations);
  }, []);

  const rememberLocation = useCallback((place: LocationPlace) => {
    setRecentLocations((locations) => {
      const nextLocations = addRecentLocation(locations, place);

      void persistRecentLocations(nextLocations).catch(() => undefined);
      return nextLocations;
    });
  }, []);

  const setPickup = useCallback(
    (place: LocationPlace | undefined) => {
      setPickupState(place);

      if (place) {
        rememberLocation(place);
      }
    },
    [rememberLocation],
  );

  const setDestination = useCallback(
    (place: LocationPlace | undefined) => {
      setDestinationState(place);

      if (place) {
        rememberLocation(place);
      }
    },
    [rememberLocation],
  );

  const value = useMemo<TripContextValue>(
    () => ({
      destination,
      pickup,
      recentLocations,
      setDestination,
      setPickup,
      swapLocations: () => {
        setPickupState(destination);
        setDestinationState(pickup);
      },
    }),
    [destination, pickup, recentLocations, setDestination, setPickup],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
