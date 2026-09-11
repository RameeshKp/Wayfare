import type { LocationPlace } from '@/store/TripContext';

export const suggestedPlaces: LocationPlace[] = [
  {
    address: 'Villa 12, Street 840, Zone 61 · West Bay',
    id: 'home',
    latitude: 25.3248,
    longitude: 51.531,
    name: 'Home',
    type: 'home',
  },
  {
    address: 'Level 14, Al Fardan Rd · Lusail Marina',
    id: 'marina-office',
    latitude: 25.4135,
    longitude: 51.5293,
    name: 'Marina Office Tower',
    type: 'home',
  },
  {
    address: 'Gate 3, Corniche Promenade',
    id: 'ferry-terminal',
    latitude: 25.2944,
    longitude: 51.5478,
    name: 'Corniche Ferry Terminal',
    type: 'recent',
  },
  {
    address: 'Al Kinana St · Msheireb Downtown',
    id: 'msheireb-metro',
    latitude: 25.2868,
    longitude: 51.5314,
    name: 'Msheireb Metro Station',
    type: 'recent',
  },
  {
    address: 'Hamad International Airport',
    id: 'airport',
    latitude: 25.2731,
    longitude: 51.608,
    name: 'Hamad International Airport',
    type: 'recent',
  },
];
