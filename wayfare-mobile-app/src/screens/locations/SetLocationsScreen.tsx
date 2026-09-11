import { Pressable, ScrollView, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackButtonSVGComponent from "@/assets/svg/BackButtonSVGComponent";
import MapSVGComponent from "@/assets/svg/MapSVGComponent";
import TargetSVGComponent from "@/assets/svg/TargetSVGComponent";
import { AppButton } from "@/components/ui/AppButton";
import { useTrip } from "@/hooks/useTrip";
import type { RootStackParamList } from "@/navigation/types";

import { SafeAreaView } from "react-native-safe-area-context";
import { LocationFlowCard } from "./components/LocationFlowCard";
import { PlaceList } from "./components/PlaceList";
import { suggestedPlaces } from "./data/places";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { styles } from "./SetLocationsScreen.styles";

type SetLocationsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SetLocations"
>;
type ActiveLocation = "destination" | "pickup";

export function SetLocationsScreen() {
  const navigation = useNavigation<SetLocationsNavigationProp>();
  const { destination, pickup, setDestination, setPickup, swapLocations } =
    useTrip();
  const { error, getCurrentLocation, isLoading } = useCurrentLocation();
  const activeLocation: ActiveLocation =
    pickup === undefined ? "pickup" : "destination";
  const canContinue = pickup !== undefined && destination !== undefined;

  function selectPlace(place: (typeof suggestedPlaces)[number]) {
    if (activeLocation === "pickup") {
      setPickup(place);
      return;
    }

    setDestination(place);
  }

  async function handleUseCurrentLocation() {
    const place = await getCurrentLocation();

    if (place) {
      selectPlace(place);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
        >
          <BackButtonSVGComponent />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.heading}>Where are you going?</Text>
          <Text style={styles.subtitle}>
            Step 1 of 2 · Set pickup and drop-off
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LocationFlowCard
          destination={destination}
          onClear={(kind) =>
            kind === "pickup" ? setPickup(undefined) : setDestination(undefined)
          }
          onSelect={(target) => navigation.navigate("PickLocation", { target })}
          onSwap={swapLocations}
          pickup={pickup}
        />
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            disabled={isLoading}
            onPress={handleUseCurrentLocation}
            style={styles.action}
          >
            <TargetSVGComponent />
            <Text style={styles.actionLabel}>
              {isLoading ? "Finding you…" : "Use current"}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              navigation.navigate("PickLocation", { target: activeLocation })
            }
            style={styles.action}
          >
            <MapSVGComponent />
            <Text style={styles.actionLabel}>Pick on map</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionLabel}>
          Set as {activeLocation === "pickup" ? "pickup" : "drop-off"}
        </Text>
        {activeLocation === "destination" ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No saved places match that. Keep typing to use it as a custom
              address.
            </Text>
          </View>
        ) : (
          <PlaceList onSelect={selectPlace} places={suggestedPlaces} />
        )}
        {error && <Text style={styles.emptyText}>{error}</Text>}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          disabled={!canContinue}
          label="Next"
          onPress={() => navigation.navigate("TripReady")}
        />
      </View>
    </SafeAreaView>
  );
}
