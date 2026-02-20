import { Tabs, useLocalSearchParams } from "expo-router";
import { CourseProvider } from "../../../src/course/CourseContext";
import { ResourcesProvider } from "../../../src/course/ResourcesContext";

export default function CourseLayout() {
  const {crn} = useLocalSearchParams();

  return (
    <ResourcesProvider>
    <CourseProvider crn={String(crn)}>
      <Tabs>
        <Tabs.Screen name="qa" options={{ title: "Q&A" }} />
        <Tabs.Screen name="resources" options={{ title: "Resources" }} />
        <Tabs.Screen
          name="ask"
          options={{ title: "Ask Question", href: null }}         />
        <Tabs.Screen
          name="question/[id]"
          options={{ title: "Question", href: null }} 
        />
         <Tabs.Screen name="add-resource" options={{ title: "Upload", href: null }} />
          <Tabs.Screen name="resource/[id]" options={{ title: "Resource", href: null }} />
      </Tabs>
    </CourseProvider>
    </ResourcesProvider>
  );
}