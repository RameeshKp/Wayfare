import { createContext, useMemo, useState } from 'react';

import type { ReactNode } from 'react';

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
  setDestination: (place: LocationPlace | undefined) => void;
  setPickup: (place: LocationPlace | undefined) => void;
  swapLocations: () => void;
};

export const TripContext = createContext<TripContextValue | undefined>(undefined);

type TripProviderProps = {
  children: ReactNode;
};

export function TripProvider({ children }: TripProviderProps) {
  const [pickup, setPickup] = useState<LocationPlace | undefined>(undefined);
  const [destination, setDestination] = useState<LocationPlace | undefined>(undefined);

  const value = useMemo<TripContextValue>(
    () => ({
      destination,
      pickup,
      setDestination,
      setPickup,
      swapLocations: () => {
        setPickup(destination);
        setDestination(pickup);
      },
    }),
    [destination, pickup],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}
