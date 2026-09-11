import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { useAppFonts } from "@/hooks/useAppFonts";
import { RootNavigator } from "@/navigation/RootNavigator";
import { AuthProvider } from "@/store/AuthContext";

export default function WayfareApp() {
  const [fontsLoaded, fontError] = useAppFonts();

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
