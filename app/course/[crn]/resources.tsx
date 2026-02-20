import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useResources } from "../../../src/course/ResourcesContext";

export default function Resources() {
  const { crn } = useLocalSearchParams();
  const { getResources } = useResources();
  const resources = getResources(String(crn));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>Resources — CRN {crn}</Text>

        <Pressable
          onPress={() => router.push(`/course/${crn}/add-resource` as any)}
          style={{ borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 }}
        >
          <Text style={{ fontWeight: "800" }}>+ Upload</Text>
        </Pressable>
      </View>

      {resources.length === 0 ? (
        <Text style={{ opacity: 0.7 }}>No resources yet. Upload notes to help your classmates.</Text>
      ) : (
        <FlatList
          data={resources}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/course/${crn}/resource/${item.id}` as any)}
              style={{ borderWidth: 1, borderRadius: 14, padding: 14 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "800" }}>{item.title}</Text>
              <Text style={{ marginTop: 6, opacity: 0.8 }}>{item.category}</Text>
              <Text style={{ marginTop: 6, opacity: 0.7 }} numberOfLines={1}>
                📄 {item.fileName}
              </Text>
              
            </Pressable>
          )}
        />
      )}
    </View>
  );
}