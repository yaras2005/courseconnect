import React, { createContext, useContext, useMemo, useState } from "react";
import { dummyQAByCrn } from "./dummyQA";

type Answer = {
  id: string;
  body: string;
  votes: number;
  author: string;
  isAnonymous: boolean;
  isEndorsed: boolean;
};

export type Question = {
  id: string;
  title: string;
  body: string;
  author: string;
  isAnonymous: boolean;
  votes: number;
  answers: Answer[];
};

type CourseContextValue = {
  questions: Question[];
  addQuestion: (q: { title: string; body: string; isAnonymous: boolean }) => void;
  voteQuestion: (id: string, delta: number) => void;
  addAnswer: (questionId: string, a: { body: string; isAnonymous: boolean }) => void;
  endorseAnswer: (questionId: string, answerId: string) => void;
};

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({
  children,
  crn,
}: {
  children: React.ReactNode;
  crn: string;
}) {
  const [questionsByCrn, setQuestionsByCrn] = useState<Record<string, Question[]>>(
    dummyQAByCrn as Record<string, Question[]>
  );

  const questions = questionsByCrn[crn] ?? [];

  const setCourseQuestions = (updater: (current: Question[]) => Question[]) => {
    setQuestionsByCrn((prev) => ({ ...prev, [crn]: updater(prev[crn] ?? []) }));
  };

  const addAnswer = (questionId: string, a: { body: string; isAnonymous: boolean }) => {
    const newAnswer: Answer = {
      id: `a_${Date.now()}`,
      body: a.body.trim(),
      isAnonymous: a.isAnonymous,
      author: a.isAnonymous ? "Anonymous" : "You",
      votes: 0,
      isEndorsed: false,
    };

    setCourseQuestions((current) =>
      current.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
      )
    );
  };

  const addQuestion = (q: { title: string; body: string; isAnonymous: boolean }) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      title: q.title.trim(),
      body: q.body.trim(),
      isAnonymous: q.isAnonymous,
      author: q.isAnonymous ? "Anonymous" : "You",
      votes: 0,
      answers: [],
    };

    setCourseQuestions((current) => [newQuestion, ...current]);
  };

  const endorseAnswer = (questionId: string, answerId: string) => {
    setCourseQuestions((current) =>
      current.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) => ({
                ...a,
                isEndorsed: a.id === answerId,
              })),
            }
          : q
      )
    );
  };

  const voteQuestion = (id: string, delta: number) => {
    setCourseQuestions((current) =>
      current.map((q) => (q.id === id ? { ...q, votes: q.votes + delta } : q))
    );
  };

  const value = useMemo(
    () => ({ questions, addQuestion, addAnswer, voteQuestion, endorseAnswer }),
    [questions]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used inside CourseProvider");
  return ctx;
}