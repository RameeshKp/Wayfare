import { Pressable, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppButton } from '@/components/ui/AppButton';
import { FormTextInput } from '@/components/ui/FormTextInput';
import type { RootStackParamList } from '@/navigation/types';

import { AuthLayout } from '../components/AuthLayout';
import { styles } from './LoginScreen.styles';
import { useLoginForm } from '../hooks/useLoginForm';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigationProp>();
  const {
    email,
    errors,
    password,
    requestPasswordReset,
    setEmail,
    setPassword,
    submit,
    toast,
  } = useLoginForm();

  return (
    <AuthLayout
      footerActionLabel="Create an account"
      footerContent={<AppButton label="Log in" onPress={submit} />}
      footerPrompt="New to Wayfare?"
      onFooterAction={() => navigation.navigate('CreateAccount')}
      subtitle="Log in to plan a trip and follow your route turn by turn."
      title="Welcome back"
      toast={toast}>
      <View style={styles.form}>
        <FormTextInput
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          textContentType="emailAddress"
          value={email}
        />
        <FormTextInput
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          textContentType="password"
          value={password}
        />
        <Pressable accessibilityRole="button" onPress={requestPasswordReset}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}
