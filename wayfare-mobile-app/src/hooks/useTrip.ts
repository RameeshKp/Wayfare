import { useContext } from 'react';

import { TripContext } from '@/store/TripContext';

export function useTrip() {
  const trip = useContext(TripContext);

  if (trip === undefined) {
    throw new Error('useTrip must be used inside TripProvider.');
  }

  return trip;
}
