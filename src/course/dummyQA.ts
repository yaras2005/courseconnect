import { Question } from "./CourseContext";

export const dummyQAByCrn: Record<string, Question[]> = {
  "12345": [
    {
      id: "q1",
      title: "What is SQL Injection in simple terms?",
      body: "I understand it’s a security vulnerability but I can’t visualize how it actually works in real life. Can someone explain with an example?",
      author: "Maya",
      isAnonymous: false,
      votes: 12,
      answers: [
        {
          id: "a1",
          body: "It happens when user input is inserted directly into a SQL query without validation. Attackers can manipulate the query to access or delete data.",
          votes: 5,
          author: "Jad",
          isAnonymous: false,
          isEndorsed: false,
        },
        {
          id: "a2",
          body: "Use parameterized queries or prepared statements to prevent it. Never concatenate raw user input into SQL.",
          votes: 9,
          author: "Dr. X",
          isAnonymous: false,
          isEndorsed: true,
        },
      ],
    },
    {
      id: "q2",
      title: "Difference between hashing and encryption?",
      body: "We covered both in lecture but I still mix them up during exams.",
      author: "Anonymous",
      isAnonymous: true,
      votes: 8,
      answers: [
        {
          id: "a3",
          body: "Hashing is one-way (you can’t reverse it). Encryption is reversible using a key.",
          votes: 6,
          author: "Lina",
          isAnonymous: false,
          isEndorsed: false,
        },
      ],
    },
  ],

  "67890": [
    {
      id: "q3",
      title: "Difference between DFA and NFA?",
      body: "In exercises I don’t know when to convert to DFA or when to keep NFA.",
      author: "Anonymous",
      isAnonymous: true,
      votes: 7,
      answers: [
        {
          id: "a4",
          body: "DFA has exactly one transition per symbol per state. NFA can have multiple transitions or epsilon transitions.",
          votes: 6,
          author: "Karim",
          isAnonymous: false,
          isEndorsed: false,
        },
      ],
    },
    {
      id: "q4",
      title: "How do we prove a language is regular?",
      body: "Do we always use the pumping lemma? Or is there an easier way sometimes?",
      author: "Rana",
      isAnonymous: false,
      votes: 10,
      answers: [
        {
          id: "a5",
          body: "You can prove regularity by constructing a DFA, NFA, or regular expression. Pumping lemma is usually used to prove non-regularity.",
          votes: 8,
          author: "Dr. Y",
          isAnonymous: false,
          isEndorsed: true,
        },
      ],
    },
  ],

  "11111": [
    {
      id: "q5",
      title: "Can someone summarize the laws of thermodynamics?",
      body: "I need a simple summary before the quiz.",
      author: "Karim",
      isAnonymous: false,
      votes: 4,
      answers: [],
    },
    {
      id: "q6",
      title: "What is entropy?",
      body: "The professor said it measures disorder but I don’t fully get it.",
      author: "Anonymous",
      isAnonymous: true,
      votes: 5,
      answers: [
        {
          id: "a6",
          body: "Entropy measures the number of possible microstates in a system. Higher entropy means more disorder.",
          votes: 3,
          author: "Nadine",
          isAnonymous: false,
          isEndorsed: false,
        },
      ],
    },
  ],
};