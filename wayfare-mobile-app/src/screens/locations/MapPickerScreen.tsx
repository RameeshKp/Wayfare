import { useState } from "react";
import { Text, View } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppButton } from "@/components/ui/AppButton";
import { useTrip } from "@/hooks/useTrip";
import type { RootStackParamList } from "@/navigation/types";

import { styles } from "./MapPickerScreen.styles";

type MapPickerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PickLocation"
>;
type MapPickerRouteProp = RouteProp<RootStackParamList, "PickLocation">;

const defaultCoordinate = { latitude: 25.2854, longitude: 51.531 };

export function MapPickerScreen() {
  const navigation = useNavigation<MapPickerNavigationProp>();
  const route = useRoute<MapPickerRouteProp>();
  const { setDestination, setPickup } = useTrip();
  const target = route.params.target;
  const [coordinate, setCoordinate] = useState(defaultCoordinate);

  function confirmLocation() {
    const place = {
      address: "Selected map location · Doha",
      id: `map-${target}`,
      ...coordinate,
      name: target === "pickup" ? "Map pickup" : "Map destination",
      type: "recent" as const,
    };

    if (target === "pickup") {
      setPickup(place);
    } else {
      setDestination(place);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.screen}>
      <MapView
        initialRegion={{
          ...defaultCoordinate,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        onRegionChangeComplete={(region) =>
          setCoordinate({
            latitude: region.latitude,
            longitude: region.longitude,
          })
        }
        style={styles.map}
      >
        <Marker
          coordinate={coordinate}
          title={target === "pickup" ? "Pickup point" : "Drop-off point"}
        />
      </MapView>
      <View style={styles.controls}>
        <Text style={styles.title}>
          Pin your {target === "pickup" ? "pickup" : "drop-off"}
        </Text>
        <Text style={styles.subtitle}>
          Move the map to position the marker, then confirm.
        </Text>
        <View style={styles.confirm}>
          <AppButton label="Confirm location" onPress={confirmLocation} />
        </View>
      </View>
    </View>
  );
}
