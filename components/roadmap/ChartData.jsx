const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Percent Complete" },
];

const rows = [
    [
      "s1",
      "Sprint 1",
      new Date(2014, 2, 22),
      new Date(2014, 5, 20),
      100,
    ],
    [
      "s2",
      "Sprint 2",
      new Date(2014, 5, 21),
      new Date(2014, 8, 20),
      100,
    ],
    [
      "s2",
      "Sprint 2",
      new Date(2014, 8, 21),
      new Date(2014, 11, 20),
      100,
    ],
    [
      "s3",
      "Sprint 3",
      new Date(2014, 11, 21),
      new Date(2015, 2, 21),
      100,
    ],
    [
      "s4",
      "Sprint 4",
      new Date(2015, 2, 22),
      new Date(2015, 5, 20),
      50,
    ],
    [
      "s5",
      "Sprint 5",
      new Date(2015, 5, 21),
      new Date(2015, 8, 20),
      0,
    ],
    [
      "s6",
      "Sprint 6",
      new Date(2015, 8, 21),
      new Date(2015, 11, 20),
      0,
    ],
    [
      "s7",
      "Sprint 7",
      new Date(2015, 11, 21),
      new Date(2016, 2, 21),
      0,
    ],
    [
      "s8",
      "Sprint 8",
      new Date(2014, 8, 4),
      new Date(2015, 1, 1),
      100,
    ],
  ];

export const data = [columns, ...rows];