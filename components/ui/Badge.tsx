import React from "react";
import { Text, View } from "react-native";

export function Badge({ label }: { label: string }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: "#F3F4F6",
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "700", color: "#111827" }}>
        {label}
      </Text>
    </View>
  );
}