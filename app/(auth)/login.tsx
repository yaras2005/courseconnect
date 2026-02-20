import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 20 }}>
        CourseConnect
      </Text>

      <TextInput
        placeholder="University email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 16 }}
      />

      <Pressable
onPress={() => router.replace("/courses" as any)}        style={{ backgroundColor: "black", padding: 14, borderRadius: 10, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Log in</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register" as any)} style={{ marginTop: 14 }}>
        <Text style={{ textAlign: "center" }}>
          Don’t have an account? <Text style={{ fontWeight: "700" }}>Register</Text>
        </Text>
      </Pressable>
    </View>
  );
}