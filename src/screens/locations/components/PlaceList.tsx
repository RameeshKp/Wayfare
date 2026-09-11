import { Pressable, Text, View } from 'react-native';

import ClockSVGComponent from '@/assets/svg/ClockSVGComponent';
import HomeSVGComponent from '@/assets/svg/HomeSVGComponent';

import { styles } from './PlaceList.styles';

import type { LocationPlace } from '@/store/TripContext';

type PlaceListProps = {
  onSelect: (place: LocationPlace) => void;
  places: LocationPlace[];
};

export function PlaceList({ onSelect, places }: PlaceListProps) {
  return (
    <View style={styles.list}>
      {places.map((place) => (
        <Pressable accessibilityRole="button" key={place.id} onPress={() => onSelect(place)} style={styles.item}>
          <View style={styles.icon}>
            {place.type === 'home' ? <HomeSVGComponent /> : <ClockSVGComponent />}
          </View>
          <View style={styles.text}>
            <Text style={styles.name}>{place.name}</Text>
            <Text numberOfLines={1} style={styles.address}>{place.address}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
