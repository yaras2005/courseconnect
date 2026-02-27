import React from "react";
import { Platform, View, ViewStyle } from "react-native";
import { theme } from "../../constants/theme";

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.card,
          padding: 14,
          borderWidth: 1,
          borderColor: theme.colors.border,

          // iPhone-friendly shadow (soft + clean)
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },

          // Android fallback (very light)
          elevation: Platform.OS === "android" ? 1 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}