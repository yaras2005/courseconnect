import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Card } from "../../../components/ui/Card";
import { SearchBar } from "../../../components/ui/SearchBar";
import { useCourse } from "../../../src/course/CourseContext";

export default function QA() {
  const { crn } = useLocalSearchParams();
  const { questions } = useCourse();
  

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return questions;

    return questions.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(q);
      const inBody = item.body.toLowerCase().includes(q);
      const inAuthor = (item.author ?? "").toLowerCase().includes(q);
      return inTitle || inBody || inAuthor;
    });
  }, [query, questions]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#111827" }}>
          Q&amp;A
        </Text>
        <Text style={{ marginTop: 4, color: "#6B7280" }}>
          Course CRN {crn} • Ask, answer, and vote
        </Text>
      </View>

      {/* Search + Ask */}
      <View style={{ gap: 10, marginBottom: 12 }}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search questions (title, body, author)…"
        />

        <Pressable
          onPress={() => router.push(`/course/${crn}/ask` as any)}
          style={{
            backgroundColor: "#111827",
            borderRadius: 14,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>+ Ask a Question</Text>
        </Pressable>
      </View>

      {/* List */}
      {filtered.length === 0 ? (
        <Card>
          <Text style={{ fontWeight: "800", color: "#111827" }}>
            No questions found
          </Text>
          <Text style={{ marginTop: 6, color: "#6B7280" }}>
            Try a different search, or ask the first question for this course.
          </Text>

          <Pressable
            onPress={() => router.push(`/course/${crn}/ask` as any)}
            style={{
              marginTop: 12,
              backgroundColor: "#111827",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>Ask a Question</Text>
          </Pressable>
        </Card>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Card>
              <Pressable
                onPress={() =>
                  router.push(`/course/${crn}/question/${item.id}` as any)
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "800",
                      color: "#111827",
                      flex: 1,
                    }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>

                  <View
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      borderRadius: 999,
                      backgroundColor: item.isAnonymous ? "#FEF3C7" : "#F3F4F6",
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "800", color: "#111827" }}>
                      {item.isAnonymous ? "Anonymous" : "Identified"}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{ marginTop: 8, color: "#4B5563" }}
                  numberOfLines={2}
                >
                  {item.body}
                </Text>

                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "800", color: "#111827" }}>
                    ⬆ {item.votes}
                  </Text>

                  <Text style={{ color: "#6B7280" }}>
                    💬 {item.answers.length}{" "}
                    {item.answers.length === 1 ? "answer" : "answers"}
                  </Text>
                </View>

                <Text style={{ marginTop: 8, color: "#9CA3AF", fontSize: 12 }}>
                  Tap to view details
                </Text>
              </Pressable>
            </Card>
          )}
        />
      )}
    </View>
  );
}