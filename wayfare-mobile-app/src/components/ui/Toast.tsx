import { Text, View } from 'react-native';

import { styles } from './Toast.styles';

import type { Toast as ToastData } from '@/hooks/useToast';

type ToastProps = {
  toast: ToastData | undefined;
};

export function Toast({ toast }: ToastProps) {
  if (toast === undefined) {
    return null;
  }

  return (
    <View accessibilityRole="alert" style={[styles.container, styles[toast.variant]]}>
      <Text style={styles.text}>{toast.message}</Text>
    </View>
  );
}
