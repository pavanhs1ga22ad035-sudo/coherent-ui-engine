import type { SkillCategory, ExtractedSkills, ChecklistRound, DayPlan } from "./types";

const SKILL_MAP: Record<Exclude<SkillCategory, "Other">, string[]> = {
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks", "Data Structures", "Algorithms", "Operating System"],
  Languages: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Golang"],
  Web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "Angular", "Vue", "HTML", "CSS", "Tailwind"],
  Data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "NoSQL", "Database"],
  "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux", "Terraform", "Jenkins"],
  Testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest", "Jest", "Testing", "Unit Test"],
};

const DEFAULT_OTHER_SKILLS = ["Communication", "Problem solving", "Basic coding", "Projects"];

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
    results.push({ category: "Other", skills: [...DEFAULT_OTHER_SKILLS] });
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
    (s) => s.category !== "Other",
  );
  score += Math.min(realCategories.length * 5, 30);
  if (company.trim().length > 0) score += 10;
  if (role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  return Math.min(score, 100);
}

export function calcFinalScore(
  baseScore: number,
  confidenceMap: Record<string, "know" | "practice">,
): number {
  let adj = baseScore;
  Object.values(confidenceMap).forEach((v) => (adj += v === "know" ? 2 : -2));
  return Math.max(0, Math.min(100, adj));
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
  Communication: [
    "Tell me about a time you explained a complex concept to a non-technical stakeholder.",
    "How do you handle disagreements in a team setting?",
  ],
  "Problem solving": [
    "Describe your approach to solving a problem you've never encountered before.",
    "Walk me through how you debug an issue in production.",
  ],
  "Basic coding": [
    "What programming language are you most comfortable with and why?",
    "Explain a data structure you've used recently.",
    "What is version control and why is it important?",
  ],
  Projects: [
    "Tell me about a project you've built and your role in it.",
    "What was the most challenging technical decision you made in a project?",
    "How do you approach testing your code?",
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
  const isOtherOnly = skills.length === 1 && skills[0].category === "Other";

  const round1: string[] = [
    "Review quantitative aptitude basics",
    "Practice logical reasoning (20 questions)",
    "Brush up verbal ability / reading comprehension",
    "Take a timed aptitude mock test",
    "Review basic probability & permutation concepts",
  ];

  const round2: string[] = [];
  if (isOtherOnly) {
    round2.push("Study basic data structures: arrays, strings, stacks");
    round2.push("Learn basic sorting algorithms");
    round2.push("Practice 5 simple coding problems");
    round2.push("Study basic OOP concepts");
    round2.push("Learn common design patterns");
  } else {
    round2.push("Solve 5 easy array/string problems");
    round2.push("Solve 3 medium linked-list / tree problems");
    round2.push("Review time & space complexity analysis");
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
  }

  const round3: string[] = [
    "Prepare 2-minute pitch for each project",
    "Be ready to explain architecture decisions",
  ];
  if (isOtherOnly) {
    round3.push("Prepare to discuss any personal or academic projects");
    round3.push("Review your strongest programming language's basics");
    round3.push("Prepare to whiteboard a simple solution");
  } else {
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
  const isOtherOnly = skills.length === 1 && skills[0].category === "Other";

  const day1Tasks = isOtherOnly
    ? ["Learn basic data structures (arrays, strings)", "Review OOP fundamentals", "Study basic algorithms (sorting, searching)", "Take a short self-assessment quiz"]
    : (() => {
        const t = ["Review core CS fundamentals (OOP, OS basics)", "Brush up on aptitude & logical reasoning"];
        if (hasCategory("Core CS")) t.push("Revise DBMS normalization and SQL basics");
        else t.push("Study basic data structures: arrays, strings, stacks");
        t.push("Take a short self-assessment quiz");
        return t;
      })();

  const day2Tasks = isOtherOnly
    ? ["Practice logical reasoning problems", "Study basic OS and networking concepts", "Write simple programs in your chosen language", "Review your resume for consistency"]
    : (() => {
        const t = ["Deep dive into networking & OS concepts", "Practice 10 aptitude questions"];
        if (hasCategory("Data")) t.push("Practice SQL joins, subqueries, and indexing");
        else t.push("Study linked lists and trees");
        t.push("Review your resume for consistency");
        return t;
      })();

  const day3Tasks = isOtherOnly
    ? ["Solve 5 easy coding problems", "Practice explaining solutions aloud", "Study time complexity basics", "Review your chosen language's syntax"]
    : (() => {
        const t = ["Solve 5 easy DSA problems (arrays/strings)", "Solve 3 medium problems (sorting/searching)"];
        if (hasCategory("Languages")) t.push(`Practice coding in ${allSkills.find((s) => ["Java", "Python", "JavaScript", "TypeScript", "C++"].includes(s)) || "your preferred language"}`);
        else t.push("Choose a language and solve problems in it");
        t.push("Review time complexity of all approaches");
        return t;
      })();

  const day4Tasks = isOtherOnly
    ? ["Solve 3 more coding problems (slightly harder)", "Practice problem-solving patterns", "Study basic system design concepts", "Review common coding patterns"]
    : ["Solve 2 dynamic programming problems", "Solve 2 graph/tree problems", "Practice explaining your approach out loud", "Review common coding patterns (sliding window, two pointer)"];

  const day5Tasks: string[] = ["Align resume bullet points with JD keywords", "Prepare 2-minute pitch for each project"];
  if (!isOtherOnly) {
    if (allSkills.some((s) => ["React", "Next.js", "Angular"].includes(s))) {
      day5Tasks.push("Review your frontend projects: component design, state mgmt");
    }
    if (allSkills.some((s) => ["Node.js", "Express", "Docker", "AWS"].includes(s))) {
      day5Tasks.push("Review your backend/deployment projects");
    }
  } else {
    day5Tasks.push("Document any personal or academic projects clearly");
  }
  day5Tasks.push("Ensure GitHub repos are clean and documented");

  const day6Tasks: string[] = ["Practice 10 likely interview questions aloud", "Do a mock behavioral interview (30 min)"];
  if (!isOtherOnly && hasCategory("Web")) day6Tasks.push("Practice system design: design a URL shortener");
  else day6Tasks.push("Practice explaining a complex concept simply");
  day6Tasks.push("Record yourself and review for filler words");

  const day7Tasks = ["Revisit weak areas from Day 3–4 practice", "Re-solve 3 problems you struggled with", "Final aptitude mock test", "Prepare questions to ask the interviewer", "Rest well and review key notes only"];

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
