import React, { createContext, useContext, useMemo, useState } from "react";

export type Course = {
  code: string;
  name: string;
  crn: string;
  instructor: string;
};

type CoursesContextValue = {
  courses: Course[];
  addCourse: (c: Course) => { ok: true } | { ok: false; error: string };
  removeCourse: (crn: string) => void;
};

const CoursesContext = createContext<CoursesContextValue | null>(null);

const initialCourses: Course[] = [
  { code: "CSC435", name: "Computer Security", crn: "12345", instructor: "Dr. X" },
  { code: "CSC301", name: "Theory of Computation", crn: "67890", instructor: "Dr. Y" },
];

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  const addCourse = (c: Course) => {
    const crn = c.crn.trim();
    if (!/^\d{4,10}$/.test(crn)) return { ok: false as const, error: "CRN must be 4–10 digits." };

    const exists = courses.some((x) => x.crn === crn);
    if (exists) return { ok: false as const, error: "This CRN is already added." };

    setCourses((prev) => [{ ...c, crn }, ...prev]);
    return { ok: true as const };
  };

  const removeCourse = (crn: string) => {
    setCourses((prev) => prev.filter((c) => c.crn !== crn));
  };

  const value = useMemo(() => ({ courses, addCourse, removeCourse }), [courses]);

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
}

export function useCourses() {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error("useCourses must be used inside CoursesProvider");
  return ctx;
}