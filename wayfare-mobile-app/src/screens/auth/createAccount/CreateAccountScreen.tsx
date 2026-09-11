import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/ui/AppButton';
import { FormTextInput } from '@/components/ui/FormTextInput';
import type { RootStackParamList } from '@/navigation/types';

import { AuthLayout } from '../components/AuthLayout';
import { styles } from './CreateAccountScreen.styles';
import { useCreateAccountForm } from '../hooks/useCreateAccountForm';

type CreateAccountNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;

export function CreateAccountScreen() {
  const navigation = useNavigation<CreateAccountNavigationProp>();
  const {
    confirmPassword,
    email,
    errors,
    password,
    setConfirmPassword,
    setEmail,
    setPassword,
    submit,
    toast,
  } = useCreateAccountForm();

  async function handleCreateAccount() {
    if (await submit()) {
      navigation.replace('Login', {
        successMessage: 'Your account has been created. You can now log in.',
      });
    }
  }

  return (
    <AuthLayout
      footerActionLabel="Log in"
      footerContent={<AppButton label="Create an account" onPress={() => void handleCreateAccount()} />}
      footerPrompt="Already have an account?"
      onFooterAction={() => navigation.goBack()}
      subtitle="Create an account to start planning your next trip."
      title="Join Wayfare"
      toast={toast}>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="Enter your email"
          textContentType="emailAddress"
          value={email}
        />
        <FormTextInput
          autoComplete="new-password"
          error={errors.password}
          label="Password"
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <FormTextInput
          autoComplete="new-password"
          error={errors.confirmPassword}
          label="Confirm password"
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />
      </View>
    </AuthLayout>
  );
}
