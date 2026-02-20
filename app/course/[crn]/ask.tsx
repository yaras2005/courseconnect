import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { useCourse } from "./CourseContext";

export default function AskQuestion() {
  const { addQuestion } = useCourse();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const submit = () => {
    if (!title.trim() || !body.trim()) return;
    addQuestion({ title, body, isAnonymous });
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
        Ask a question
      </Text>

      <TextInput
        placeholder="Title (short question)"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Explain your question..."
        value={body}
        onChangeText={setBody}
        multiline
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, height: 120, marginBottom: 12 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "700" }}>Post anonymously</Text>
        <Switch value={isAnonymous} onValueChange={setIsAnonymous} />
      </View>

      <Pressable
        onPress={submit}
        style={{
          marginTop: 16,
          backgroundColor: "black",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          opacity: title.trim() && body.trim() ? 1 : 0.5,
        }}
        disabled={!title.trim() || !body.trim()}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>Post</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center" }}>Cancel</Text>
      </Pressable>
    </View>
  );
}