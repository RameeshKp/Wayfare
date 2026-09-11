import { BackHandler, Platform, Pressable, ScrollView, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackButtonSVGComponent from "@/assets/svg/BackButtonSVGComponent";
import MapSVGComponent from "@/assets/svg/MapSVGComponent";
import TargetSVGComponent from "@/assets/svg/TargetSVGComponent";
import { AppButton } from "@/components/ui/AppButton";
import { useTrip } from "@/hooks/useTrip";
import type { RootStackParamList } from "@/navigation/types";
import type { LocationPlace } from "@/store/TripContext";

import { SafeAreaView } from "react-native-safe-area-context";
import { LocationFlowCard } from "./components/LocationFlowCard";
import { PlaceList } from "./components/PlaceList";
import { useCurrentLocation } from "./hooks/useCurrentLocation";
import { styles } from "./SetLocationsScreen.styles";

type SetLocationsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SetLocations"
>;
type ActiveLocation = "destination" | "pickup";

function areSameLocation(
  pickup: LocationPlace | undefined,
  destination: LocationPlace | undefined,
): boolean {
  return (
    pickup !== undefined &&
    destination !== undefined &&
    (pickup.id === destination.id ||
      (pickup.latitude === destination.latitude &&
        pickup.longitude === destination.longitude))
  );
}

export function SetLocationsScreen() {
  const navigation = useNavigation<SetLocationsNavigationProp>();
  const { destination, pickup, recentLocations, setDestination, setPickup, swapLocations } =
    useTrip();
  const { error, getCurrentLocation, isLoading } = useCurrentLocation();
  const activeLocation: ActiveLocation =
    pickup === undefined ? "pickup" : "destination";
  const canContinue =
    pickup !== undefined &&
    destination !== undefined &&
    !areSameLocation(pickup, destination);

  function selectPlace(place: LocationPlace) {
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

  function handleBack() {
    if (Platform.OS === "android") {
      BackHandler.exitApp();
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={handleBack}
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
        {recentLocations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Places you choose will appear here for quick access.
            </Text>
          </View>
        ) : (
          <PlaceList onSelect={selectPlace} places={recentLocations} />
        )}
        {error && <Text style={styles.emptyText}>{error}</Text>}
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          disabled={!canContinue}
          label="Next"
          onPress={() => navigation.navigate("RouteView")}
        />
      </View>
    </SafeAreaView>
  );
}
