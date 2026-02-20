export const dummyQA = [
  {
    id: "q1",
    title: "Can someone explain SQL injection simply?",
    body: "I understand it’s related to user input, but how does it actually work?",
    author: "Maya",
    isAnonymous: false,
    votes: 12,
    answers: [
      { id: "a1", body: "It happens when input is inserted into a query without validation.", votes: 5 },
      { id: "a2", body: "Use parameterized queries / prepared statements to prevent it.", votes: 9 },
    ],
  },
  {
    id: "q2",
    title: "What’s the difference between DFA and NFA?",
    body: "I always mix them up in exams.",
    author: "Anonymous",
    isAnonymous: true,
    votes: 7,
    answers: [{ id: "a1", body: "NFA can have multiple possible next states; DFA only one.", votes: 6 }],
  },
];