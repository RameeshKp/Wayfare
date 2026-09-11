export const googleMapsAndroidApiKey =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY;
console.log("🚀 ~ googleMapsAndroidApiKey:", googleMapsAndroidApiKey);

export const hasGoogleMapsAndroidApiKey = googleMapsAndroidApiKey !== undefined;
