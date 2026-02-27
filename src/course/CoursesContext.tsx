import React, { createContext, useContext, useMemo, useState } from "react";
export type Course = {
  code: string;
  name: string;
  crn: string;
  instructor: string;
  enrolledCount:number;
};

const courseCatalogByCrn: Record<string, Course> = {
  "12345": {
    code: "CSC435",
    name: "Computer Security",
    crn: "12345",
    instructor: "Dr. X",
    enrolledCount: 42,
  },
  "67890": {
    code: "CSC301",
    name: "Theory of Computation",
    crn: "67890",
    instructor: "Dr. Y",
    enrolledCount: 35,
  },
  "11111": {
    code: "CSC302",
    name: "Operating Systems",
    crn: "11111",
    instructor: "Dr. H.",
    enrolledCount: 48,
  },
  "22222": {
    code: "CSC450",
    name: "Artificial Intelligence",
    crn: "22222",
    instructor: "Dr. Rana",
    enrolledCount: 55,
  },
  "33333": {
    code: "CSC410",
    name: "Computer Networks",
    crn: "33333",
    instructor: "Dr. Ali",
    enrolledCount: 39,
  },
};


type CoursesContextValue = {
  courses: Course[];
  addCourseByCrn: (crn: string) => { ok: true } | { ok: false; error: string };
  removeCourse: (crn: string) => void;
};

const CoursesContext = createContext<CoursesContextValue | null>(null);

const initialCourses: Course[] = [
  courseCatalogByCrn["12345"],
  courseCatalogByCrn["67890"],
  courseCatalogByCrn["11111"],
  courseCatalogByCrn["33333"],
  courseCatalogByCrn["22222"],
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