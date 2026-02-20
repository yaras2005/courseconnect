import { Tabs } from "expo-router";
import { CourseProvider } from "../../../src/course/CourseContext";

export default function CourseLayout() {
  return (
    <CourseProvider>
      <Tabs>
        <Tabs.Screen name="qa" options={{ title: "Q&A" }} />
        <Tabs.Screen name="resources" options={{ title: "Resources" }} />
        <Tabs.Screen
          name="ask"
          options={{ title: "Ask Question", href: null }} // hidden from tabs
        />
        <Tabs.Screen
          name="question/[id]"
          options={{ title: "Question", href: null }} // hidden from tabs
        />
      </Tabs>
    </CourseProvider>
  );
}