import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { dummyQA } from "../dummyQA";

export default function QuestionDetails() {
  const { id } = useLocalSearchParams();
  const question = useMemo(() => dummyQA.find((q) => q.id === id), [id]);

  const [votes, setVotes] = useState(question?.votes ?? 0);

  if (!question) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Question not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>{question.title}</Text>
      <Text style={{ marginTop: 10, opacity: 0.85 }}>{question.body}</Text>

      <Text style={{ marginTop: 10, opacity: 0.7 }}>
        Posted by: {question.isAnonymous ? "Anonymous" : question.author}
      </Text>

      {/* Voting */}
      <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
        <Pressable
          onPress={() => setVotes((v) => v + 1)}
          style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 }}
        >
          <Text>⬆ Upvote</Text>
        </Pressable>
        <Pressable
          onPress={() => setVotes((v) => v - 1)}
          style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 }}
        >
          <Text>⬇ Downvote</Text>
        </Pressable>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "800" }}>Score: {votes}</Text>
        </View>
      </View>

      {/* Answers */}
      <Text style={{ marginTop: 18, fontSize: 16, fontWeight: "800" }}>Answers</Text>

      {question.answers.map((a) => (
        <View key={a.id} style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10 }}>
          <Text style={{ opacity: 0.9 }}>{a.body}</Text>
          <Text style={{ marginTop: 6, fontWeight: "700" }}>⬆ {a.votes}</Text>
        </View>
      ))}
    </View>
  );
}