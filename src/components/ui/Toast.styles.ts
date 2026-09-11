import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { borderRadius, colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.medium,
    left: spacing[6],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    position: 'absolute',
    right: spacing[6],
    bottom: spacing[4],
  },
  error: {
    backgroundColor: colors.error,
  },
  success: {
    backgroundColor: colors.text,
  },
  text: {
    color: colors.background,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
