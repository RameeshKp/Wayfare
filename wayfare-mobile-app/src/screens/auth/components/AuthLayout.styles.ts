import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import { colors, spacing } from "@/theme/tokens";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
  },
  footer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderTopWidth: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[5],
  },
  footerAccount: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: spacing[6],
    paddingTop: spacing[5],
  },
  footerLink: {
    color: colors.text,
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
  footerText: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  header: {
    marginTop: spacing[8],
  },
  mark: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  screen: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 24,
    marginTop: spacing[3],
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.extraBold,
    fontSize: 32,
    letterSpacing: -0.8,
    lineHeight: 37,
    marginTop: spacing[8],
  },
});
