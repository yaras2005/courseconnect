import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCourses } from "../../src/course/CoursesContext";

export default function Courses() {
  const { courses, removeCourse } = useCourses();
   return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "700" }}>My Courses</Text>

        <Pressable
          onPress={() => router.push("/add-course" as any)}
          style={{ borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 }}
        >
          <Text style={{ fontWeight: "800" }}>+ Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.crn}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderRadius: 14, padding: 14 }}>
            <Pressable onPress={() => router.push(`/course/${item.crn}/qa` as any)}>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {item.code}: {item.name}
              </Text>
              <Text style={{ marginTop: 4 }}>CRN: {item.crn}</Text>
              <Text style={{ marginTop: 2, opacity: 0.7 }}>Instructor: {item.instructor}</Text>
            </Pressable>

            <Pressable
              onPress={() => removeCourse(item.crn)}
              style={{ marginTop: 10, alignSelf: "flex-start", borderWidth: 1, borderRadius: 10, paddingVertical: 6, paddingHorizontal: 10 }}
            >
              <Text style={{ fontSize: 12 }}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
        