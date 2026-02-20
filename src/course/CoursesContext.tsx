import React, { createContext, useContext, useMemo, useState } from "react";
const courseCatalogByCrn: Record<string, Course> = {
  "12345": { code: "CSC435", name: "Computer Security", crn: "12345", instructor: "Dr. X" },
  "67890": { code: "CSC301", name: "Theory of Computation", crn: "67890", instructor: "Dr. Y" },
};
export type Course = {
  code: string;
  name: string;
  crn: string;
  instructor: string;
};

type CoursesContextValue = {
  courses: Course[];
  addCourseByCrn: (crn: string) => { ok: true } | { ok: false; error: string };
  removeCourse: (crn: string) => void;
};

const CoursesContext = createContext<CoursesContextValue | null>(null);

const initialCourses: Course[] = [
  { code: "CSC435", name: "Computer Security", crn: "12345", instructor: "Dr. X" },
  { code: "CSC301", name: "Theory of Computation", crn: "67890", instructor: "Dr. Y" },
];

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addCourseByCrn = (rawCrn: string) => {
  const crn = rawCrn.trim();
  if (!/^\d{4,10}$/.test(crn)) return { ok: false as const, error: "CRN must be 4–10 digits." };

  if (courses.some((c) => c.crn === crn))
    return { ok: false as const, error: "This CRN is already added." };

  const course = courseCatalogByCrn[crn];
  if (!course) return { ok: false as const, error: "CRN not found in university catalog." };

  setCourses((prev) => [course, ...prev]);
  return { ok: true as const };
};

  const removeCourse = (crn: string) => {
    setCourses((prev) => prev.filter((c) => c.crn !== crn));
  };

  const value = useMemo(() => ({ courses, addCourseByCrn, removeCourse }), [courses]);

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
}

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used inside CoursesProvider");
  return ctx;
}