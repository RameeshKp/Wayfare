import { StyleSheet } from "react-native";

import { fontFamily } from "@/theme/fonts";
import { borderRadius, colors, spacing } from "@/theme/tokens";

const locationDotSize = 12;
const locationDotTopOffset = 5;

export function createRouteLineStyle(
  pickupRowY: number,
  destinationRowY: number,
  destinationRowHeight: number,
) {
  const lineTop = pickupRowY + locationDotTopOffset + locationDotSize;
  const lineBottom = destinationRowY + destinationRowHeight - locationDotSize;

  return StyleSheet.create({
    routeLine: {
      height: Math.max(0, lineBottom - lineTop),
      top: lineTop,
    },
  }).routeLine;
}

export const styles = StyleSheet.create({
  address: {
    color: colors.textMuted,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    padding: spacing[5],
    paddingRight: spacing[12] + spacing[5] + spacing[2],
  },
  clearButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginLeft: 31,
    marginVertical: spacing[4],
  },
  dot: {
    borderRadius: locationDotSize / 2,
    height: locationDotSize,
    marginRight: spacing[3],
    marginTop: locationDotTopOffset,
    width: locationDotSize,
  },
  dropoffDot: {
    alignSelf: "flex-end",
    backgroundColor: colors.text,
    borderRadius: spacing[1] / 2,
    marginTop: 0,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
  },
  locationButton: { flex: 1, flexDirection: "row" },
  dropoffLabel: { color: colors.text },
  pickupLabel: { color: colors.accent },
  pickupDot: { backgroundColor: colors.accent },
  routeLine: {
    backgroundColor: colors.border,
    left: spacing[5] + locationDotSize / 2,
    position: "absolute",
    width: 2,
  },
  swapButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.large,
    height: 52,
    justifyContent: "center",
    position: "absolute",
    right: spacing[5],
    top: spacing[6],
    width: 52,
  },
  row: { flexDirection: "row" },
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
