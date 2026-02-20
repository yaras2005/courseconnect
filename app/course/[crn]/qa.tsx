import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { dummyQA } from "./dummyQA";

export default function QA() {
  const { crn } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
        Q&A — CRN {crn}
      </Text>

      <FlatList
        data={dummyQA}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/course/${crn}/question/${item.id}` as any)}
            style={{ borderWidth: 1, borderRadius: 14, padding: 14 }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.title}</Text>
            <Text style={{ marginTop: 6, opacity: 0.8 }} numberOfLines={2}>
              {item.body}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Text style={{ opacity: 0.7 }}>
                {item.isAnonymous ? "Anonymous" : item.author}
              </Text>
              <Text style={{ fontWeight: "700" }}>⬆ {item.votes}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}