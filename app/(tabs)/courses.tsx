
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { Card } from "../../components/ui/Card";
import { useCourses } from "../../src/course/CoursesContext";

export default function Courses() {
  const { courses, removeCourse } = useCourses();

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F7FB" }}>
      {/* Clean header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 10,
          backgroundColor: "#F6F7FB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "900", color: "#0F172A" }}>
              My Courses
            </Text>
            <Text style={{ marginTop: 4, color: "#64748B" }}>
              Add by CRN • Open Q&amp;A & resources
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/add-course" as any)}
            style={{
              backgroundColor: "#4F46E5",
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 14,
            }}
          >
            <Text style={{ color: "white", fontWeight: "800" }}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.crn}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Card style={{ padding: 14 }}>
            <Pressable onPress={() => router.push(`/course/${item.crn}/qa` as any)}>
              {/* Title row */}
              <Text style={{ fontSize: 16, fontWeight: "900", color: "#0F172A" }}>
                {item.code}{" "}
                <Text style={{ fontWeight: "800", color: "#94A3B8" }}>•</Text>{" "}
                <Text style={{ fontWeight: "800" }}>{item.name}</Text>
              </Text>

              {/* Meta */}
              <View style={{ marginTop: 10, gap: 6 }}>
                <Text style={{ color: "#475569" }}>
                  <Text style={{ fontWeight: "800", color: "#0F172A" }}>CRN:</Text>{" "}
                  {item.crn}
                </Text>

                <Text style={{ color: "#475569" }}>
                  <Text style={{ fontWeight: "800", color: "#0F172A" }}>
                    Instructor:
                  </Text>{" "}
                  {item.instructor}
                </Text>

                {/* Enrolled badge */}
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginTop: 2,
                    backgroundColor: "#EEF2FF",
                    borderWidth: 1,
                    borderColor: "#E2E8F0",
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 999,
                  }}
                >
                  <Text style={{ fontSize: 12, fontWeight: "900", color: "#4F46E5" }}>
                    👥 {item.enrolledCount} students
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Footer actions */}
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#94A3B8", fontSize: 12 }}>
                Tap card to open
              </Text>

              <Pressable
                onPress={() => removeCourse(item.crn)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  backgroundColor: "#F1F5F9",
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "900", color: "#0F172A" }}>
                  Remove
                </Text>
              </Pressable>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <Card style={{ margin: 16 }}>
            <Text style={{ fontWeight: "900", color: "#0F172A", fontSize: 16 }}>
              No courses yet
            </Text>
            <Text style={{ marginTop: 6, color: "#64748B" }}>
              Add a course by entering its CRN to join the class space.
            </Text>

            <Pressable
              onPress={() => router.push("/add-course" as any)}
              style={{
                marginTop: 12,
                backgroundColor: "#4F46E5",
                paddingVertical: 12,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>
                Add your first course
              </Text>
            </Pressable>
          </Card>
        }
      />
    </View>
  );
}