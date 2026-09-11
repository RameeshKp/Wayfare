import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  address: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing[1],
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    marginRight: spacing[4],
    width: 52,
  },
  item: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 94,
    paddingHorizontal: spacing[5],
  },
  list: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    overflow: 'hidden',
  },
  name: {
    color: colors.text,
    fontFamily: fontFamily.bold,
    fontSize: 17,
    lineHeight: 25,
  },
  text: { flex: 1 },
});
