import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

const dummyCourses = [
  { code: "CSC435", name: "Computer Security", crn: "12345", instructor: "Dr. X" },
  { code: "CSC301", name: "Theory of Computation", crn: "67890", instructor: "Dr. Y" },
];

export default function Courses() {
    const router = useRouter();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        My Courses
      </Text>

      <FlatList
        data={dummyCourses}
        keyExtractor={(item) => item.crn}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
onPress={() => router.push((`/course/${item.crn}/qa` as Href))}          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {item.code}: {item.name}
            </Text>
            <Text style={{ marginTop: 4 }}>CRN: {item.crn}</Text>
            <Text style={{ marginTop: 2, opacity: 0.7 }}>
              Instructor: {item.instructor}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}