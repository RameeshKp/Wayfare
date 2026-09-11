import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CreateAccountScreen } from '@/screens/auth/createAccount/CreateAccountScreen';
import { LoginScreen } from '@/screens/auth/login/LoginScreen';

import type { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const rootStackScreenOptions = { headerShown: false };

export function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Login" screenOptions={rootStackScreenOptions}>
      <RootStack.Screen component={LoginScreen} name="Login" />
      <RootStack.Screen component={CreateAccountScreen} name="CreateAccount" />
    </RootStack.Navigator>
  );
}
