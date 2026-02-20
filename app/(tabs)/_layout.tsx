import { Tabs } from "expo-router";
import { CoursesProvider } from "../../src/course/CoursesContext";

export default function TabsLayout() {
  return (
    <CoursesProvider>
      <Tabs screenOptions={{ headerTitleAlign: "center" }}>
        <Tabs.Screen name="courses" options={{ title: "My Courses" }} />
        <Tabs.Screen name="add-course" options={{ title: "Add Course", href: null }} />
      </Tabs>
    </CoursesProvider>
  );
}