import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  form: {
    gap: spacing[5],
    marginTop: spacing[10],
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    color: colors.accent,
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
});
