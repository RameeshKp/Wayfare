export type RootStackParamList = {
  CreateAccount: undefined;
  Login: { successMessage?: string } | undefined;
  PickLocation: { target: 'destination' | 'pickup' };
  SetLocations: undefined;
  RouteView: undefined;
};
