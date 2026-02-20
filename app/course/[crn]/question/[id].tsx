import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { useCourse } from "../CourseContext";

export default function QuestionDetails() {
  const { id } = useLocalSearchParams();
  const { questions, voteQuestion, addAnswer } = useCourse();

  const question = useMemo(
    () => questions.find((q) => q.id === id),
    [id, questions]
  );

  // ✅ Hooks MUST be here (top-level), not inside if()
  const [answerText, setAnswerText] = useState("");
  const [anonAnswer, setAnonAnswer] = useState(false);

  const submitAnswer = () => {
    if (!question) return;
    if (!answerText.trim()) return;

    addAnswer(question.id, { body: answerText, isAnonymous: anonAnswer });
    setAnswerText("");
    setAnonAnswer(false);
  };

  // ✅ Only render "not found" AFTER hooks
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

      <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
        <Pressable
          onPress={() => voteQuestion(question.id, +1)}
          style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 }}
        >
          <Text>⬆ Upvote</Text>
        </Pressable>

        <Pressable
          onPress={() => voteQuestion(question.id, -1)}
          style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 }}
        >
          <Text>⬇ Downvote</Text>
        </Pressable>

        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "800" }}>Score: {question.votes}</Text>
        </View>
      </View>

      {/* ✅ Answer box */}
      <View style={{ marginTop: 18, borderWidth: 1, borderRadius: 12, padding: 12 }}>
        <Text style={{ fontWeight: "800", marginBottom: 8 }}>Write an answer</Text>

        <TextInput
          placeholder="Type your answer..."
          value={answerText}
          onChangeText={setAnswerText}
          multiline
          style={{ borderWidth: 1, borderRadius: 10, padding: 10, height: 90 }}
        />

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ fontWeight: "700" }}>Answer anonymously</Text>
          <Switch value={anonAnswer} onValueChange={setAnonAnswer} />
        </View>

        <Pressable
          onPress={submitAnswer}
          disabled={!answerText.trim()}
          style={{
            marginTop: 10,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            opacity: answerText.trim() ? 1 : 0.5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "800" }}>Post Answer</Text>
        </Pressable>
      </View>

      <Text style={{ marginTop: 18, fontSize: 16, fontWeight: "800" }}>Answers</Text>

      {question.answers.length === 0 ? (
        <Text style={{ marginTop: 8, opacity: 0.7 }}>No answers yet.</Text>
      ) : (
        question.answers.map((a) => (
          <View key={a.id} style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginTop: 10 }}>
            <Text style={{ opacity: 0.9 }}>{a.body}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
        <Text style={{ opacity: 0.7 }}>{a.isAnonymous ? "Anonymous" : a.author}</Text>
        <Text style={{ fontWeight: "700" }}>⬆ {a.votes}</Text>
      </View>
          </View>
        ))
      )}
    </View>
  );
}