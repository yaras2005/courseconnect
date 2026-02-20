import React from "react";
import { TextInput, View } from "react-native";

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search…",
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "white",
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        style={{ fontSize: 14, color: "#111827" }}
      />
    </View>
  );
}