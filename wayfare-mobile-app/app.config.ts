import type { ConfigContext, ExpoConfig } from "expo/config";

const androidGoogleMapsApiKey =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY;
console.log("🚀 ~ androidGoogleMapsApiKey12:", androidGoogleMapsApiKey);

export default ({ config }: ConfigContext): ExpoConfig => {
  const plugins: NonNullable<ExpoConfig["plugins"]> = [
    [
      "expo-location",
      {
        locationWhenInUsePermission:
          "Wayfare uses your location to set your pickup point.",
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
  ];

  if (androidGoogleMapsApiKey) {
    plugins.splice(1, 0, ["react-native-maps", { androidGoogleMapsApiKey }]);
  }

  return {
    ...config,
    name: "wayfare-mobile-app",
    slug: "wayfare-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "wayfaremobileapp",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
      bundleIdentifier: "com.anonymous.wayfaremobileapp",
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.wayfaremobileapp",
    },
    web: {
      output: "single",
      favicon: "./assets/images/favicon.png",
    },
    plugins,
    experiments: {
      reactCompiler: true,
    },
  };
};
