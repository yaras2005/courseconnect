import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { useCourses } from "../../src/course/CoursesContext";
export default function Courses() {
  const { courses, removeCourse } = useCourses();
   return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#F8FAFC" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View>
          <Text style={{ fontSize: 22, fontWeight: "800", color: "#111827" }}>
            My Courses
          </Text>
          <Text style={{ marginTop: 4, color: "#6B7280" }}>
            Your enrolled classes by CRN
          </Text>
        </View>

         <Pressable
          onPress={() => router.push("/add-course" as any)}
          style={{
            backgroundColor: "4#13e0d6",
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: "800" }}>+ Add</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.crn}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Card>
            <Pressable onPress={() => router.push(`/course/${item.crn}/qa` as any)}>
              <Text style={{ fontSize: 16, fontWeight: "800", color: "#111827" }}>
                {item.code}
                <Text style={{ fontWeight: "700", color: "#111827" }}>
                  {" "}
                  •{" "}
                </Text>
                <Text style={{ fontWeight: "700", color: "#111827" }}>
                  {item.name}
                </Text>
              </Text>

              <View style={{ marginTop: 10 }}>
                <Text style={{ color: "#6B7280" }}>
                  <Text style={{ fontWeight: "700", color: "#374151" }}>CRN:</Text>{" "}
                  {item.crn}
                </Text>
                <Text style={{ marginTop: 4, color: "#6B7280" }}>
                  <Text style={{ fontWeight: "700", color: "#374151" }}>
                    Instructor:
                  </Text>{" "}
                  {item.instructor}
                </Text>
              </View>
            </Pressable>

            {/* Actions */}
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
                Tap to open Q&A
              </Text>

              <Pressable
                onPress={() => removeCourse(item.crn)}
                style={{
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#111827" }}>
                  Remove
                </Text>
              </Pressable>
            </View>
          </Card>
        )}
      />

      {/* Empty State */}
      {courses.length === 0 ? (
        <Card style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: "800", color: "#111827" }}>
            No courses yet
          </Text>
          <Text style={{ marginTop: 6, color: "#6B7280" }}>
            Add a course by entering its CRN to join the class space.
          </Text>
          <Pressable
            onPress={() => router.push("/add-course" as any)}
            style={{
              marginTop: 12,
              backgroundColor: "#111827",
              paddingVertical: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>Add your first course</Text>
          </Pressable>
        </Card>
      ) : null}
    </View>
  );
}