import { Tabs } from "expo-router";

export default function CourseLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="qa" options={{ title: "Q&A" }} />
      <Tabs.Screen name="resources" options={{ title: "Resources" }} />
    </Tabs>
  );
}