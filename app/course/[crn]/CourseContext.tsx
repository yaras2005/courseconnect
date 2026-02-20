import React, { createContext, useContext, useMemo, useState } from "react";
import { dummyQA } from "./dummyQA";

type Answer = {
  id: string;
  body: string;
  votes: number;
  author: string;
  isAnonymous: boolean;
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
};

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>(dummyQA as Question[]);
  const addAnswer = (questionId: string, a: { body: string; isAnonymous: boolean }) => {
  const newAnswer: Answer = {
    id: `a_${Date.now()}`,
    body: a.body.trim(),
    isAnonymous: a.isAnonymous,
    author: a.isAnonymous ? "Anonymous" : "You",
    votes: 0,
  };

  setQuestions((prev) =>
    prev.map((q) =>
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


    setQuestions((prev) => [newQuestion, ...prev]);
  };

  const voteQuestion = (id: string, delta: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, votes: q.votes + delta } : q))
    );
  };

  const value = useMemo(
  () => ({ questions, addQuestion, addAnswer, voteQuestion }),
  [questions]
);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used inside CourseProvider");
  return ctx;
}