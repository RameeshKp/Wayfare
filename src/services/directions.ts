import { googleMapsAndroidApiKey } from "@/services/mapsConfig";

export type RouteDirections = {
  coordinates: Array<{ latitude: number; longitude: number }>;
  distanceText: string;
  durationMinutes: number;
  steps: RouteStep[];
  trafficMessage: string;
};

export type RouteStep = {
  distanceText: string;
  instruction: string;
};

type RoutesApiResponse = {
  error?: {
    message?: string;
    status?: string;
  };
  routes?: Array<{
    distanceMeters?: number;
    duration?: string;
    legs?: Array<{
      steps?: Array<{
        distanceMeters?: number;
        navigationInstruction?: { instructions?: string };
      }>;
    }>;
    polyline?: { encodedPolyline?: string };
    travelAdvisory?: {
      speedReadingIntervals?: Array<{
        speed?: "NORMAL" | "SLOW" | "TRAFFIC_JAM";
      }>;
    };
  }>;
};

function getRouteErrorMessage(responseData: RoutesApiResponse): string {
  const errorMessage = responseData.error?.message?.toLowerCase();

  if (
    responseData.error?.status === "RESOURCE_EXHAUSTED" ||
    errorMessage?.includes("quota exceeded")
  ) {
    return "Today's route request limit has been reached. Please try again tomorrow.";
  }

  if (errorMessage?.includes("billing")) {
    return "Google Maps billing must be enabled before route directions can be shown.";
  }

  if (responseData.error?.status === "PERMISSION_DENIED") {
    return "Routes API access is not authorized for this app configuration.";
  }

  return "We can't find a route there. Try another destination or travel mode.";
}

function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1000) {
    return `${distanceMeters} m`;
  }

  return `${(distanceMeters / 1000).toFixed(1)} km`;
}

function durationToMinutes(duration: string): number | undefined {
  const seconds = Number.parseFloat(duration.replace(/s$/, ""));

  return Number.isFinite(seconds) && seconds > 0 ? seconds / 60 : undefined;
}

function getRouteSteps(
  route: NonNullable<RoutesApiResponse["routes"]>[number],
): RouteStep[] {
  return (route.legs ?? []).flatMap((leg) =>
    (leg.steps ?? []).flatMap((step) => {
      const instruction = step.navigationInstruction?.instructions;

      if (!instruction) {
        return [];
      }

      return [
        {
          distanceText: formatDistance(step.distanceMeters ?? 0),
          instruction,
        },
      ];
    }),
  );
}

function getTrafficMessage(
  route: NonNullable<RoutesApiResponse["routes"]>[number],
  mode: "driving" | "walking",
): string {
  if (mode === "walking") {
    return "Traffic information is available for driving routes only.";
  }

  const speeds =
    route.travelAdvisory?.speedReadingIntervals?.map(
      (interval) => interval.speed,
    ) ?? [];

  if (speeds.includes("TRAFFIC_JAM")) {
    return "Heavy traffic on parts of this route.";
  }

  if (speeds.includes("SLOW")) {
    return "Slow traffic on parts of this route.";
  }

  if (speeds.includes("NORMAL")) {
    return "Traffic is moving normally on this route.";
  }

  return "Live traffic information is unavailable for this route.";
}

function decodePolyline(
  encodedPolyline: string,
): RouteDirections["coordinates"] {
  const coordinates: RouteDirections["coordinates"] = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encodedPolyline.length) {
    let result = 0;
    let shift = 0;
    let byte: number;

    do {
      byte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude += result & 1 ? ~(result >> 1) : result >> 1;
    result = 0;
    shift = 0;

    do {
      byte = encodedPolyline.charCodeAt(index) - 63;
      index += 1;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude += result & 1 ? ~(result >> 1) : result >> 1;
    coordinates.push({ latitude: latitude / 1e5, longitude: longitude / 1e5 });
  }

  return coordinates;
}

export async function getRouteDirections(
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
  mode: "driving" | "walking",
): Promise<RouteDirections> {
  if (!googleMapsAndroidApiKey) {
    throw new Error("Maps key unavailable.");
  }

  const fieldMask = [
    "routes.duration",
    "routes.distanceMeters",
    "routes.polyline.encodedPolyline",
    "routes.legs.steps.distanceMeters",
    "routes.legs.steps.navigationInstruction.instructions",
    ...(mode === "driving"
      ? ["routes.travelAdvisory.speedReadingIntervals"]
      : []),
  ].join(",");

  const response = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      body: JSON.stringify({
        computeAlternativeRoutes: false,
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        extraComputations:
          mode === "driving" ? ["TRAFFIC_ON_POLYLINE"] : undefined,
        languageCode: "en",
        origin: {
          location: {
            latLng: {
              latitude: origin.latitude,
              longitude: origin.longitude,
            },
          },
        },
        routingPreference: mode === "driving" ? "TRAFFIC_AWARE" : undefined,
        travelMode: mode === "driving" ? "DRIVE" : "WALK",
        units: "METRIC",
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googleMapsAndroidApiKey,
        "X-Goog-FieldMask": fieldMask,
      },
      method: "POST",
    },
  );
  const responseData = (await response.json()) as RoutesApiResponse;
  const route = responseData.routes?.[0];
  const durationMinutes = route?.duration
    ? durationToMinutes(route.duration)
    : undefined;
  const encodedPolyline = route?.polyline?.encodedPolyline;

  if (
    !response.ok ||
    !route?.distanceMeters ||
    !durationMinutes ||
    !encodedPolyline
  ) {
    throw new Error(getRouteErrorMessage(responseData));
  }

  return {
    coordinates: decodePolyline(encodedPolyline),
    distanceText: formatDistance(route.distanceMeters),
    durationMinutes,
    steps: getRouteSteps(route),
    trafficMessage: getTrafficMessage(route, mode),
  };
}
