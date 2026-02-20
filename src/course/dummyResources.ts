import { Resource } from "./ResourcesContext";

export const dummyResourcesByCrn: Record<string, Resource[]> = {
  "12345": [
    {
      id: "res1",
      crn: "12345",
      title: "Week 3 — SQL Injection Notes (PDF)",
      category: "Week 3: Web Security",
      fileName: "week3_sql_injection_notes.pdf",
      mimeType: "application/pdf",
      size: 540_000,
      uri: "file://dummy/week3_sql_injection_notes.pdf",
      uploadedAt: "2026-02-10T10:20:00.000Z",
      comments: [
        {
          id: "c1",
          text: "This summary is super clear, thank you!",
          author: "You",
          createdAt: "2026-02-10T12:10:00.000Z",
        },
        {
          id: "c2",
          text: "Can you add an example with prepared statements?",
          author: "Anonymous",
          createdAt: "2026-02-10T14:05:00.000Z",
        },
      ],
    },
    {
      id: "res2",
      crn: "12345",
      title: "Midterm Revision Sheet",
      category: "Midterm",
      fileName: "midterm_revision_sheet.docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 220_000,
      uri: "file://dummy/midterm_revision_sheet.docx",
      uploadedAt: "2026-02-12T09:00:00.000Z",
      comments: [],
    },
  ],

  "67890": [
    {
      id: "res3",
      crn: "67890",
      title: "DFA vs NFA — Quick Cheat Sheet",
      category: "Week 2: Automata",
      fileName: "dfa_nfa_cheatsheet.png",
      mimeType: "image/png",
      size: 180_000,
      uri: "file://dummy/dfa_nfa_cheatsheet.png",
      uploadedAt: "2026-02-14T16:30:00.000Z",
      comments: [
        {
          id: "c3",
          text: "The diagram made it finally click 👌",
          author: "Lina",
          createdAt: "2026-02-14T18:00:00.000Z",
        },
      ],
    },
  ],

  "11111": [
    {
      id: "res4",
      crn: "11111",
      title: "Thermodynamics Formulas Sheet",
      category: "Week 5: Thermodynamics",
      fileName: "thermo_formulas.pdf",
      mimeType: "application/pdf",
      size: 310_000,
      uri: "file://dummy/thermo_formulas.pdf",
      uploadedAt: "2026-02-15T11:45:00.000Z",
      comments: [],
    },
  ],
};
