import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useResources } from "../../../src/course/ResourcesContext";

export default function AddResource() {
  const { crn } = useLocalSearchParams();
  const { addResource } = useResources();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [picked, setPicked] = useState<null | {
    uri: string;
    name: string;
    mimeType?: string;
    size?: number;
  }>(null);

  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (res.canceled) return;

    const file = res.assets[0];
    setPicked({
      uri: file.uri,
      name: file.name ?? "file",
      mimeType: file.mimeType,
      size: file.size,
    });
  };

  const submit = async () => {
    if (!picked) return;
    if (!title.trim() || !category.trim()) return;

    await addResource(String(crn), {
      title,
      category,
      fileName: picked.name,
      mimeType: picked.mimeType,
      size: picked.size,
      uri: picked.uri,
    });

    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 10 }}>Upload resource</Text>

      <TextInput
        placeholder="Title (e.g., Week 5 Notes)"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder='Category (e.g., "Week 5: Thermodynamics")'
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <Pressable
        onPress={pickFile}
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      >
        <Text style={{ fontWeight: "700" }}>
          {picked ? `✅ Picked: ${picked.name}` : "📎 Pick a file (PDF, images, docs…)"}
        </Text>
      </Pressable>

      <Pressable
        onPress={submit}
        disabled={!picked || !title.trim() || !category.trim()}
        style={{
          backgroundColor: "black",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
          opacity: picked && title.trim() && category.trim() ? 1 : 0.5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>Upload</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center" }}>Cancel</Text>
      </Pressable>
    </View>
  );
}