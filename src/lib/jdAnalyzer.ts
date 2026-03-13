import type { SkillCategory, ExtractedSkills, ChecklistRound, DayPlan } from "./types";

const SKILL_MAP: Record<SkillCategory, string[]> = {
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks", "Data Structures", "Algorithms", "Operating System"],
  Languages: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Golang"],
  Web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "Angular", "Vue", "HTML", "CSS", "Tailwind"],
  Data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "NoSQL", "Database"],
  "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Jenkins"],
  Testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Jest", "Testing", "Unit Test"],
};

export function extractSkills(jdText: string): ExtractedSkills[] {
  const text = jdText.toLowerCase();
  const results: ExtractedSkills[] = [];

  for (const [category, keywords] of Object.entries(SKILL_MAP) as [SkillCategory, string[]][]) {
    const found = keywords.filter((kw) => {
      const pattern = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`\\b${pattern}\\b`, "i").test(text) || text.includes(kw.toLowerCase());
    });
    if (found.length > 0) {
      results.push({ category, skills: [...new Set(found)] });
    }
  }

  if (results.length === 0) {
    results.push({ category: "Core CS", skills: ["General fresher stack"] });
  }

  return results;
}

export function calcReadinessScore(
  skills: ExtractedSkills[],
  company: string,
  role: string,
  jdText: string,
): number {
  let score = 35;
  const realCategories = skills.filter(
    (s) => !(s.skills.length === 1 && s.skills[0] === "General fresher stack"),
  );
  score += Math.min(realCategories.length * 5, 30);
  if (company.trim().length > 0) score += 10;
  if (role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  return Math.min(score, 100);
}

const QUESTION_BANK: Record<string, string[]> = {
  DSA: [
    "How would you optimize search in sorted data?",
    "Explain time complexity of common sorting algorithms.",
    "What is the difference between BFS and DFS?",
  ],
  OOP: [
    "Explain the four pillars of OOP with examples.",
    "What is the difference between abstraction and encapsulation?",
  ],
  DBMS: [
    "What is normalization? Explain up to 3NF.",
    "Explain ACID properties with real-world examples.",
  ],
  OS: [
    "Explain process vs thread and when to use each.",
    "What is a deadlock and how do you prevent it?",
  ],
  Networks: [
    "Explain the TCP/IP model layers.",
    "What happens when you type a URL in the browser?",
  ],
  Java: [
    "Explain the difference between JDK, JRE, and JVM.",
    "What are Java Collections and when to use each?",
  ],
  Python: [
    "What are Python decorators and how do they work?",
    "Explain list comprehension vs generator expression.",
  ],
  JavaScript: [
    "Explain closures and their practical use cases.",
    "What is the event loop in JavaScript?",
  ],
  TypeScript: [
    "What are generics in TypeScript and why use them?",
    "Explain the difference between interface and type.",
  ],
  React: [
    "Explain state management options in React.",
    "What is the virtual DOM and how does reconciliation work?",
    "When would you use useCallback vs useMemo?",
  ],
  "Next.js": [
    "Explain SSR vs SSG vs ISR in Next.js.",
    "How does file-based routing work in Next.js?",
  ],
  "Node.js": [
    "How does Node.js handle asynchronous operations?",
    "Explain middleware in Express.js.",
  ],
  Express: [
    "How do you handle error middleware in Express?",
  ],
  REST: [
    "What makes an API RESTful? Explain the constraints.",
    "Explain the difference between PUT and PATCH.",
  ],
  GraphQL: [
    "How does GraphQL differ from REST APIs?",
    "What are resolvers in GraphQL?",
  ],
  SQL: [
    "Explain indexing and when it helps.",
    "What is the difference between INNER JOIN and LEFT JOIN?",
    "How do you optimize a slow SQL query?",
  ],
  MongoDB: [
    "When would you choose MongoDB over a relational database?",
    "Explain MongoDB aggregation pipeline.",
  ],
  PostgreSQL: [
    "What are PostgreSQL-specific features over MySQL?",
  ],
  MySQL: [
    "Explain the difference between InnoDB and MyISAM.",
  ],
  Redis: [
    "What data structures does Redis support?",
    "When would you use Redis as a cache vs primary store?",
  ],
  AWS: [
    "Explain the difference between EC2 and Lambda.",
    "How do you design for high availability on AWS?",
  ],
  Azure: [
    "What Azure services would you use for a web application?",
  ],
  GCP: [
    "How does BigQuery differ from traditional databases?",
  ],
  Docker: [
    "Explain the difference between a Docker image and container.",
    "How do you optimize Docker image size?",
  ],
  Kubernetes: [
    "What is a Pod in Kubernetes?",
    "Explain the role of a Service in Kubernetes.",
  ],
  "CI/CD": [
    "Design a CI/CD pipeline for a web application.",
  ],
  Linux: [
    "Explain file permissions in Linux.",
    "How would you debug a process consuming high CPU?",
  ],
  Selenium: [
    "How do you handle dynamic elements in Selenium?",
  ],
  Cypress: [
    "How does Cypress differ from Selenium?",
  ],
  Playwright: [
    "What are the advantages of Playwright over other testing frameworks?",
  ],
  "General fresher stack": [
    "Tell me about a project you've built and your role in it.",
    "What programming language are you most comfortable with and why?",
    "How do you approach debugging a problem you haven't seen before?",
    "Explain a data structure you've used recently.",
    "What is version control and why is it important?",
  ],
};

export function generateQuestions(skills: ExtractedSkills[]): string[] {
  const questions: string[] = [];
  const allSkills = skills.flatMap((s) => s.skills);

  for (const skill of allSkills) {
    const bank = QUESTION_BANK[skill];
    if (bank) {
      questions.push(...bank);
    }
  }

  // Generic fallbacks
  if (questions.length < 10) {
    const fallback = [
      "Tell me about yourself and your technical background.",
      "Describe a challenging project and how you solved key problems.",
      "How do you prioritize tasks when working on multiple features?",
      "What is your approach to learning a new technology?",
      "Where do you see yourself in 3 years?",
      "Why are you interested in this role?",
      "Describe a time you worked in a team to deliver under pressure.",
    ];
    for (const q of fallback) {
      if (questions.length >= 10) break;
      if (!questions.includes(q)) questions.push(q);
    }
  }

  return questions.slice(0, 10);
}

export function generateChecklist(skills: ExtractedSkills[]): ChecklistRound[] {
  const allSkills = skills.flatMap((s) => s.skills);
  const hasCategory = (cat: SkillCategory) => skills.some((s) => s.category === cat);

  const round1: string[] = [
    "Review quantitative aptitude basics",
    "Practice logical reasoning (20 questions)",
    "Brush up verbal ability / reading comprehension",
    "Take a timed aptitude mock test",
    "Review basic probability & permutation concepts",
  ];

  const round2: string[] = [
    "Solve 5 easy array/string problems",
    "Solve 3 medium linked-list / tree problems",
    "Review time & space complexity analysis",
  ];
  if (hasCategory("Core CS")) {
    round2.push("Revise OS: process scheduling, deadlocks");
    round2.push("Revise DBMS: normalization, SQL queries");
    round2.push("Revise Networking: TCP/IP, HTTP vs HTTPS");
  } else {
    round2.push("Study basic OOP concepts");
    round2.push("Learn common design patterns");
  }
  round2.push("Practice 2 dynamic programming problems");
  round2.push("Review graph traversal algorithms");

  const round3: string[] = [
    "Prepare 2-minute pitch for each project",
    "Be ready to explain architecture decisions",
  ];
  if (allSkills.some((s) => ["React", "Next.js", "Angular", "Vue"].includes(s))) {
    round3.push("Review frontend component lifecycle & state management");
    round3.push("Prepare to discuss responsive design approach");
  }
  if (allSkills.some((s) => ["Node.js", "Express", "REST", "GraphQL"].includes(s))) {
    round3.push("Review backend API design patterns");
    round3.push("Prepare to discuss authentication & authorization");
  }
  if (hasCategory("Data")) {
    round3.push("Review database schema design principles");
    round3.push("Prepare to discuss query optimization");
  }
  if (hasCategory("Cloud/DevOps")) {
    round3.push("Review deployment pipeline and CI/CD basics");
    round3.push("Prepare to discuss cloud architecture decisions");
  }
  if (round3.length < 7) {
    round3.push("Review your strongest language's advanced features");
    round3.push("Prepare to whiteboard a system design");
  }

  const round4: string[] = [
    "Prepare 'Tell me about yourself' (90-second version)",
    "Prepare answers for 'strengths & weaknesses'",
    "Research the company: mission, products, recent news",
    "Prepare 2–3 thoughtful questions to ask the interviewer",
    "Practice explaining why you want this specific role",
    "Prepare a story about teamwork / conflict resolution",
  ];

  return [
    { round: "Round 1", title: "Aptitude & Basics", items: round1 },
    { round: "Round 2", title: "DSA + Core CS", items: round2.slice(0, 8) },
    { round: "Round 3", title: "Technical Interview", items: round3.slice(0, 8) },
    { round: "Round 4", title: "Managerial / HR", items: round4 },
  ];
}

export function generatePlan(skills: ExtractedSkills[]): DayPlan[] {
  const hasCategory = (cat: SkillCategory) => skills.some((s) => s.category === cat);
  const allSkills = skills.flatMap((s) => s.skills);

  const day1Tasks = ["Review core CS fundamentals (OOP, OS basics)", "Brush up on aptitude & logical reasoning"];
  if (hasCategory("Core CS")) day1Tasks.push("Revise DBMS normalization and SQL basics");
  else day1Tasks.push("Study basic data structures: arrays, strings, stacks");
  day1Tasks.push("Take a short self-assessment quiz");

  const day2Tasks = ["Deep dive into networking & OS concepts", "Practice 10 aptitude questions"];
  if (hasCategory("Data")) day2Tasks.push("Practice SQL joins, subqueries, and indexing");
  else day2Tasks.push("Study linked lists and trees");
  day2Tasks.push("Review your resume for consistency");

  const day3Tasks = ["Solve 5 easy DSA problems (arrays/strings)", "Solve 3 medium problems (sorting/searching)"];
  if (hasCategory("Languages")) day3Tasks.push(`Practice coding in ${allSkills.find((s) => ["Java", "Python", "JavaScript", "TypeScript", "C++"].includes(s)) || "your preferred language"}`);
  else day3Tasks.push("Choose a language and solve problems in it");
  day3Tasks.push("Review time complexity of all approaches");

  const day4Tasks = ["Solve 2 dynamic programming problems", "Solve 2 graph/tree problems"];
  day4Tasks.push("Practice explaining your approach out loud");
  day4Tasks.push("Review common coding patterns (sliding window, two pointer)");

  const day5Tasks = ["Align resume bullet points with JD keywords", "Prepare 2-minute pitch for each project"];
  if (allSkills.some((s) => ["React", "Next.js", "Angular"].includes(s))) {
    day5Tasks.push("Review your frontend projects: component design, state mgmt");
  }
  if (allSkills.some((s) => ["Node.js", "Express", "Docker", "AWS"].includes(s))) {
    day5Tasks.push("Review your backend/deployment projects");
  }
  day5Tasks.push("Ensure GitHub repos are clean and documented");

  const day6Tasks = ["Practice 10 likely interview questions aloud", "Do a mock behavioral interview (30 min)"];
  if (hasCategory("Web")) day6Tasks.push("Practice system design: design a URL shortener");
  else day6Tasks.push("Practice explaining a complex concept simply");
  day6Tasks.push("Record yourself and review for filler words");

  const day7Tasks = ["Revisit weak areas from Day 3–4 practice", "Re-solve 3 problems you struggled with"];
  day7Tasks.push("Final aptitude mock test");
  day7Tasks.push("Prepare questions to ask the interviewer");
  day7Tasks.push("Rest well and review key notes only");

  return [
    { day: "Day 1", focus: "Core CS Fundamentals", tasks: day1Tasks },
    { day: "Day 2", focus: "CS Depth + Aptitude", tasks: day2Tasks },
    { day: "Day 3", focus: "DSA Coding – Easy/Medium", tasks: day3Tasks },
    { day: "Day 4", focus: "DSA Coding – Medium/Hard", tasks: day4Tasks },
    { day: "Day 5", focus: "Projects + Resume Alignment", tasks: day5Tasks },
    { day: "Day 6", focus: "Mock Interviews", tasks: day6Tasks },
    { day: "Day 7", focus: "Revision + Weak Areas", tasks: day7Tasks },
  ];
}
