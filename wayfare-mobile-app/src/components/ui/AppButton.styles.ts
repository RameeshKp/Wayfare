import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import { borderRadius, colors, spacing } from "@/theme/tokens";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: borderRadius.large,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: spacing[6],
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  label: {
    color: colors.background,
    fontFamily: fontFamily.extraBold,
    fontSize: 17,
    lineHeight: 26,
  },
});
