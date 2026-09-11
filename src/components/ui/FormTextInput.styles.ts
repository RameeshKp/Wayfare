import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import { borderRadius, colors, spacing } from "@/theme/tokens";

export const styles = StyleSheet.create({
  error: {
    color: colors.error,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    marginTop: spacing[1],
  },
  input: {
    color: colors.text,
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 23,
    minHeight: 54,
    paddingHorizontal: spacing[4],
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    flexDirection: "row",
  },
  inputFocused: {
    borderColor: colors.accent,
  },
  inputInvalid: {
    borderColor: colors.error,
  },
  label: {
    color: colors.text,
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: spacing[2],
  },
  toggle: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: 56,
  },
});
