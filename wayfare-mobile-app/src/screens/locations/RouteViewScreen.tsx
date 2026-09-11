import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BackButtonSVGComponent from "@/assets/svg/BackButtonSVGComponent";
import DeliveryTruckSVGComponent from "@/assets/svg/DeliveryTruckSVGComponent";
import LayersSVGComponent from "@/assets/svg/LayersSVGComponent";
import LocationSVGComponent from "@/assets/svg/LocationSVGComponent";
import SendSVGComponent from "@/assets/svg/SendSVGComponent";
import WarningSVGComponent from "@/assets/svg/WarningSVGComponent";
import { useTrip } from "@/hooks/useTrip";
import type { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/tokens";
import { formatDuration } from "@/utils/formatDuration";

import { SafeAreaView } from "react-native-safe-area-context";
import { RouteDetails } from "./components/RouteDetails";
import { RouteSteps } from "./components/RouteSteps";
import { useRouteDirections } from "./hooks/useRouteDirections";
import { styles } from "./RouteViewScreen.styles";

type RouteViewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RouteView"
>;
type TravelMode = "Drive" | "Ride" | "Walk";

function getDistanceInKilometers(
  pickup: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
): number {
  const latitudeDelta = destination.latitude - pickup.latitude;
  const longitudeDelta = destination.longitude - pickup.longitude;
  return Math.sqrt(latitudeDelta ** 2 + longitudeDelta ** 2) * 111;
}

export function RouteViewScreen() {
  const navigation = useNavigation<RouteViewNavigationProp>();
  const { destination, pickup } = useTrip();
  const [travelMode, setTravelMode] = useState<TravelMode>("Drive");
  const [hasStartedNavigation, setHasStartedNavigation] = useState(false);
  const mapReference = useRef<MapView>(null);

  if (pickup === undefined || destination === undefined) {
    navigation.goBack();
    return null;
  }

  const routePickup = pickup;
  const routeDestination = destination;
  const center = {
    latitude: (routePickup.latitude + routeDestination.latitude) / 2,
    longitude: (routePickup.longitude + routeDestination.longitude) / 2,
  };
  const distance = getDistanceInKilometers(routePickup, routeDestination);
  const routeDistance = `${distance.toFixed(1)} km`;
  const routeMinutes =
    travelMode === "Walk"
      ? Math.max(12, Math.round(distance * 13))
      : Math.max(4, Math.round(distance * 3));
  const routeMode = travelMode === "Walk" ? "walking" : "driving";
  const { error: routeError, isLoading: isRouteLoading, route } =
    useRouteDirections(routePickup, routeDestination, routeMode);
  const displayDuration = route?.durationMinutes ?? routeMinutes;
  const displayDistance = route?.distanceText ?? routeDistance;

  function fitRouteOnMap() {
    setTimeout(() => {
      mapReference.current?.fitToCoordinates([routePickup, routeDestination], {
        animated: false,
        edgePadding: { bottom: 300, left: 56, right: 56, top: 120 },
      });
    }, 250);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.mapArea}>
          <MapView
            initialRegion={{
              ...center,
              latitudeDelta: Math.max(
                Math.abs(routePickup.latitude - routeDestination.latitude) * 2,
                0.04,
              ),
              longitudeDelta: Math.max(
                Math.abs(routePickup.longitude - routeDestination.longitude) *
                  2,
                0.04,
              ),
            }}
            onMapReady={fitRouteOnMap}
            ref={mapReference}
            style={styles.map}
          >
            {route && (
              <Polyline
                coordinates={route.coordinates}
                strokeColor={colors.accent}
                strokeWidth={4}
              />
            )}
            <Marker coordinate={routePickup} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.mapTruck}>
                <DeliveryTruckSVGComponent />
              </View>
            </Marker>
            <Marker coordinate={routeDestination} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.mapPin}>
                <LocationSVGComponent />
              </View>
            </Marker>
          </MapView>
          <View style={styles.controlRow}>
            <Pressable
              accessibilityLabel="Back to locations"
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <BackButtonSVGComponent />
            </Pressable>
            <Pressable
              accessibilityLabel="Map layers"
              accessibilityRole="button"
              onPress={() => undefined}
              style={styles.backButton}
            >
              <LayersSVGComponent />
            </Pressable>
          </View>
        <View style={styles.trafficAlert}>
          <WarningSVGComponent />
          <Text style={styles.trafficText}>
            {isRouteLoading
              ? "Finding the best route…"
              : routeError ?? "Heavy traffic near the route"}
          </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.routeCardContent}
          showsVerticalScrollIndicator={false}
          style={styles.routeCard}
        >
          <View style={styles.routeHandle} />
          <View style={styles.routeMeta}>
            <View>
              <Text style={styles.routeName}>Fastest route</Text>
              <Text style={styles.routeTime}>
                {formatDuration(displayDuration)}
              </Text>
            </View>
            <Text style={styles.arrival}>
              {displayDistance} · arrive{" "}
              {travelMode === "Walk" ? "11:26" : "10:42"}
            </Text>
          </View>
          <View style={styles.modes}>
            {(["Drive", "Ride", "Walk"] as TravelMode[]).map((mode) => (
              <Pressable
                accessibilityRole="button"
                key={mode}
                onPress={() => setTravelMode(mode)}
                style={[
                  styles.modeButton,
                  travelMode === mode && styles.modeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.modeLabel,
                    travelMode === mode && styles.modeLabelActive,
                  ]}
                >
                  {mode}
                </Text>
              </Pressable>
            ))}
          </View>
          <RouteDetails destination={routeDestination} pickup={routePickup} />
          <RouteSteps distance={displayDistance} />
          <View style={styles.routeSummary} />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Pressable
          accessibilityLabel="Start navigation"
          accessibilityRole="button"
          onPress={() => setHasStartedNavigation(true)}
          style={({ pressed }) => [
            styles.footerButton,
            pressed && styles.footerButtonPressed,
          ]}
        >
          <SendSVGComponent />
          <Text style={styles.trafficText}>
            {hasStartedNavigation ? "Navigation started" : "Start navigation"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
