import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useCourses } from "../../src/course/CoursesContext";

export default function AddCourse() {
  const { addCourseByCrn } = useCourses();

  const [crn, setCrn] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    const res = addCourseByCrn(crn);

    if (!res.ok) return setError(res.error);
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
        Add a course by CRN
      </Text>
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

      <TextInput
        placeholder="Enter CRN (digits)"
        value={crn}
        onChangeText={setCrn}
        keyboardType="number-pad"
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <Pressable
        onPress={submit}
        style={{ backgroundColor: "black", padding: 14, borderRadius: 12, alignItems: "center" }}
      >
        <Text style={{ color: "white", fontWeight: "800" }}>Add Course</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center" }}>Cancel</Text>
      </Pressable>
    </View>
  );
}