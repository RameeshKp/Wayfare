import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { EyeSVGComponent } from '@/assets/svg/EyeSVGComponent';
import { colors } from '@/theme/tokens';

import { styles } from './FormTextInput.styles';

import type { TextInputProps } from 'react-native';

type FormTextInputProps = Omit<TextInputProps, 'style'> & {
  error?: string;
  label: string;
};

export function FormTextInput({ error, label, secureTextEntry, ...inputProps }: FormTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = secureTextEntry === true;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error !== undefined && styles.inputInvalid,
        ]}>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          onBlur={(event) => {
            setIsFocused(false);
            inputProps.onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            inputProps.onFocus?.(event);
          }}
          placeholderTextColor={colors.textPlaceholder}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          style={styles.input}
        />
        {isPasswordField && (
          <Pressable
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            style={styles.toggle}>
            <EyeSVGComponent />
          </Pressable>
        )}
      </View>
      {error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    </View>
  );
}
