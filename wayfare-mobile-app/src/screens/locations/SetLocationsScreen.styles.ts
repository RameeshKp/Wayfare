import { StyleSheet } from 'react-native';

import { fontFamily } from '@/theme/fonts';
import { borderRadius, colors, spacing } from '@/theme/tokens';

export const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: spacing[2],
    height: 66,
    justifyContent: 'center',
  },
  actionLabel: {
    color: colors.text,
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[3],
    marginTop: spacing[4],
  },
  content: {
    gap: spacing[5],
    padding: spacing[6],
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: borderRadius.large,
    minHeight: 120,
    padding: spacing[6],
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderTopWidth: 1,
    padding: spacing[6],
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: spacing[5],
    paddingHorizontal: spacing[6],
    paddingTop: spacing[3],
  },
  headerCopy: { marginLeft: spacing[5] },
  heading: {
    color: colors.text,
    fontFamily: fontFamily.extraBold,
    fontSize: 32,
    letterSpacing: -0.8,
    lineHeight: 37,
  },
  nextDisabled: { backgroundColor: '#E1E7EC' },
  nextLabelDisabled: { color: '#AAB6C1' },
  screen: { backgroundColor: colors.surface, flex: 1 },
  sectionLabel: {
    color: colors.textPlaceholder,
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing[1],
  },
});
