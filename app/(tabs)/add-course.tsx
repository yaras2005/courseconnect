import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useCourses } from "../../src/course/CoursesContext";

export default function AddCourse() {
  const { addCourse } = useCourses();

  const [crn, setCrn] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    const res = addCourse({
      crn,
      code: code.trim() || "COURSE",
      name: name.trim() || "Untitled Course",
      instructor: instructor.trim() || "TBA",
    });

    if (!res.ok) return setError(res.error);
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 10 }}>Add a course</Text>

      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}

      <TextInput
        placeholder="CRN (digits)"
        value={crn}
        onChangeText={setCrn}
        keyboardType="number-pad"
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Course code (e.g., CSC435)"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Course name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Instructor"
        value={instructor}
        onChangeText={setInstructor}
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