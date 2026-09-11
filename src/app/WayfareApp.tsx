import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useAppFonts } from "@/hooks/useAppFonts";
import { useAuth } from "@/hooks/useAuth";
import { RootNavigator } from "@/navigation/RootNavigator";
import { AuthProvider } from "@/store/AuthContext";
import { TripProvider } from "@/store/TripContext";

function AppContent() {
  const [fontsLoaded, fontError] = useAppFonts();
  const { isReady } = useAuth();

  if ((!fontsLoaded && !fontError) || !isReady) {
    return null;
  }

  return (
    <TripProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </TripProvider>
  );
}

export default function WayfareApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
