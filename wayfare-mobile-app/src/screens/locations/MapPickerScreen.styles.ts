import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { borderRadius, colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  confirm: { marginTop: spacing[4] },
  controls: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    bottom: 0,
    padding: spacing[6],
    position: 'absolute',
    width: '100%',
  },
  map: { flex: 1 },
  screen: { backgroundColor: colors.surface, flex: 1 },
  title: {
    color: colors.text,
    fontFamily: fontFamily.extraBold,
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 23,
    marginTop: spacing[1],
  },
  webFallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing[6],
  },
  webFallbackText: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
