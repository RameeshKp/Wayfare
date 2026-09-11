import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/hooks/useAuth';
import { CreateAccountScreen } from '@/screens/auth/createAccount/CreateAccountScreen';
import { LoginScreen } from '@/screens/auth/login/LoginScreen';
import { SetLocationsScreen } from '@/screens/locations/SetLocationsScreen';
import { MapPickerScreen } from '@/screens/locations/MapPickerScreen';
import { RouteViewScreen } from '@/screens/locations/RouteViewScreen';

import type { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const rootStackScreenOptions = { headerShown: false };

export function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <RootStack.Navigator
      initialRouteName={isAuthenticated ? 'SetLocations' : 'Login'}
      key={isAuthenticated ? 'authenticated' : 'unauthenticated'}
      screenOptions={rootStackScreenOptions}>
      <RootStack.Screen component={LoginScreen} name="Login" />
      <RootStack.Screen component={CreateAccountScreen} name="CreateAccount" />
      <RootStack.Screen component={SetLocationsScreen} name="SetLocations" />
      <RootStack.Screen component={MapPickerScreen} name="PickLocation" />
      <RootStack.Screen component={RouteViewScreen} name="RouteView" />
    </RootStack.Navigator>
  );
}
