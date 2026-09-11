# Wayfare

Wayfare is an Expo 57 / React Native trip-planning demo. It includes local account creation and login, pickup and drop-off selection, map pinning, persisted recent locations, route details, turn-by-turn instructions, and live driving-traffic status from Google Routes API.

## Features

- Local account creation and sign-in backed by AsyncStorage.
- React Navigation native-stack navigation;
- Nunito Sans typography and reusable SVG-based UI.
- Pickup and drop-off selection using current location, map pinning, or recent locations.
- Four persistent recent locations, stored locally on the device.
- Reverse geocoding that prioritizes place and area names over road or building numbers.
- Google Maps route display with endpoint markers, a dotted route line, distance, duration, dynamic arrival time, and available turn-by-turn instructions.
- Google Routes API traffic-on-polyline status for driving routes.
- Friendly handling for unavailable routes, Maps API billing/permission failures, and daily quota exhaustion.

## Requirements

- Node.js 22.13 or later.
- npm.
- Android Studio with an emulator, or a physical Android device with USB debugging enabled.
- A Google Cloud project with billing enabled for map and routing functionality.

## Install and run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Add your Google Maps key to `.env`:

   ```dotenv
   EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY=your_google_maps_api_key
   ```

4. Build and install the Android development build:

   ```bash
   npm run android
   ```

5. For later JavaScript-only changes, start Metro and open the installed development build:

   ```bash
   npm start
   ```

This project uses `expo-dev-client`, so use an installed development build rather than standard Expo Go. Run `npm run android` again after changing native configuration, native dependencies, or the Maps API key.

## Google Cloud setup

Enable billing for your Google Cloud project, then enable:

- **Maps SDK for Android** — renders the map in the Android app.
- **Routes API** — returns driving/walking routes, route polylines, route steps, and traffic information.

For Android Maps SDK access, restrict the Maps key to this application package:

```text
com.anonymous.wayfaremobileapp
```

Also add the SHA-1 fingerprint used by the debug/development build. Follow the current [Expo SDK 57 react-native-maps instructions](https://docs.expo.dev/versions/v57.0.0/sdk/map-view/) for Android key configuration.

Driving requests enable Google’s traffic-on-polyline data. This requires the Routes API and billing, and uses the higher Routes Preferred pricing tier.

> Route requests are made from the app for this demo. For a production app, move routing requests to a backend and keep the server-side Routes API key private. Never commit `.env` or an unrestricted key.

## Commands

| Command            | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `npm start`        | Starts Expo Metro for the installed development client.   |
| `npm run android`  | Builds and installs the Android development app.          |
| `npm run ios`      | Builds and runs the iOS development app.                  |
| `npm run web`      | Starts the web target; map behavior differs from native.  |
| `npx tsc --noEmit` | Runs the TypeScript type check.                           |
| `npm run lint`     | Runs Expo lint when an ESLint configuration is installed. |

## Project structure

```text
assets/
  fonts/                 Nunito Sans font files
  svg/                   Reusable SVG components
src/
  app/                   Root application composition
  components/ui/         Shared buttons, form fields, and toast
  hooks/                 Shared hooks
  navigation/            React Navigation stack and route types
  screens/
    auth/                Login and account-creation screens
    locations/           Set Locations, map picker, and Route View screens
  services/              Storage, geocoding, maps, and route API clients
  store/                 Authentication and trip state
  theme/                 Colors, spacing, and typography tokens
  utils/                 Formatting and validation helpers
```

## Local data and route behavior

- Accounts and signed-in state are stored only on the device via AsyncStorage; there is no backend authentication service.
- The newest four selected locations are saved as local recent locations.
- Route failures show a bottom toast, including missing drivable routes, Google Cloud billing/permission errors, and exceeded daily route quota.
- When Google cannot return a route, Wayfare does not display an arrival time.

## Development conventions

Project conventions are defined in [`skills/wayfare-mobile-architecture/SKILL.md`](skills/wayfare-mobile-architecture/SKILL.md):

- Keep screens, feature components, and feature hooks together.
- Use TypeScript and typed React Navigation parameters.
- Put storage, geocoding, and API side effects in `src/services/`.
- Use theme tokens and colocated `*.styles.ts` files; avoid JSX inline styles.
- Keep shared UI primitives in `src/components/ui/`.
