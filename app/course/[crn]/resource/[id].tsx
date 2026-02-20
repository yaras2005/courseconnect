import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { useResources } from "../../../../src/course/ResourcesContext";

export default function ResourceDetails() {
  const { crn, id } = useLocalSearchParams();
  const { getResources, addComment } = useResources();
  const resources = getResources(String(crn));

  const resource = useMemo(() => resources.find((r) => r.id === id), [resources, id]);

  const [text, setText] = useState("");
  const [anon, setAnon] = useState(false);

  if (!resource) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Resource not found.</Text>
      </View>
    );
  }

  const openFile = async () => {
    // For now, we try opening the URI; Expo Go usually opens supported docs or shows share sheet via OS
    await Linking.openURL(resource.uri);
  };

  const submit = () => {
    if (!text.trim()) return;
    addComment(String(crn), resource.id, text, anon);
    setText("");
    setAnon(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>{resource.title}</Text>
      <Text style={{ marginTop: 6, opacity: 0.8 }}>{resource.category}</Text>

      <View style={{ marginTop: 12, borderWidth: 1, borderRadius: 12, padding: 12 }}>
        <Text style={{ fontWeight: "800" }}>📄 {resource.fileName}</Text>
        <Text style={{ marginTop: 6, opacity: 0.7 }}>
          {resource.mimeType ?? "unknown type"} • {resource.size ? `${Math.round(resource.size / 1024)} KB` : "size n/a"}
        </Text>

        <Pressable
          onPress={openFile}
          style={{ marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 10, alignItems: "center" }}
        >
          <Text style={{ fontWeight: "800" }}>Open file</Text>
        </Pressable>
      </View>

      <Text style={{ marginTop: 18, fontSize: 16, fontWeight: "800" }}>Comments</Text>

      {resource.comments.length === 0 ? (
        <Text style={{ marginTop: 8, opacity: 0.7 }}>No comments yet.</Text>
      ) : (
        resource.comments.map((c) => (
          <View key={c.id} style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10 }}>
            <Text>{c.text}</Text>
            <Text style={{ marginTop: 6, opacity: 0.7 }}>{c.author}</Text>
          </View>
        ))
      )}

      <View style={{ marginTop: 16, borderWidth: 1, borderRadius: 12, padding: 12 }}>
        <Text style={{ fontWeight: "800", marginBottom: 8 }}>Add a comment</Text>

        <TextInput
          placeholder="Write a comment..."
          value={text}
          onChangeText={setText}
          style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "700" }}>Comment anonymously</Text>
          <Switch value={anon} onValueChange={setAnon} />
        </View>

        <Pressable
          onPress={submit}
          disabled={!text.trim()}
          style={{
            marginTop: 10,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            opacity: text.trim() ? 1 : 0.5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}