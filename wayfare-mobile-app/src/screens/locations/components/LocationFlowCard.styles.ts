import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { borderRadius, colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    padding: spacing[5],
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginLeft: 31,
    marginVertical: spacing[4],
  },
  dot: {
    borderRadius: 6,
    height: 12,
    marginRight: spacing[3],
    marginTop: 5,
    width: 12,
  },
  dropoffDot: { backgroundColor: colors.text },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
  dropoffLabel: { color: colors.text },
  pickupLabel: { color: colors.accent },
  pickupDot: { backgroundColor: colors.accent },
  routeLine: {
    backgroundColor: colors.border,
    bottom: 12,
    left: 5,
    position: 'absolute',
    top: 17,
    width: 2,
  },
  swapButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    height: 52,
    justifyContent: 'center',
    position: 'absolute',
    right: spacing[5],
    top: spacing[6],
    width: 52,
  },
  row: { flexDirection: 'row' },
  textBlock: { flex: 1 },
  value: {
    color: colors.textPlaceholder,
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 2,
  },
  valueSelected: { color: colors.text },
});
