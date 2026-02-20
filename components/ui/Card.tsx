import React from "react";
import { View, ViewStyle } from "react-native";

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
          backgroundColor: "white",
          borderRadius: 16,
          padding: 14,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}