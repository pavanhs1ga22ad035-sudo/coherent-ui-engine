import type { ExtractedSkills } from "./types";

export type CompanySize = "Startup" | "Mid-size" | "Enterprise";

export interface CompanyIntel {
  company: string;
  industry: string;
  size: CompanySize;
  hiringFocus: string;
  rounds: RoundMapping[];
}

export interface RoundMapping {
  round: string;
  title: string;
  why: string;
}

const ENTERPRISE_COMPANIES = [
  "google", "amazon", "microsoft", "apple", "meta", "facebook", "netflix",
  "infosys", "tcs", "wipro", "hcl", "cognizant", "accenture", "capgemini",
  "ibm", "oracle", "salesforce", "adobe", "uber", "flipkart", "walmart",
  "deloitte", "jpmorgan", "goldman sachs", "morgan stanley", "samsung",
  "intel", "cisco", "qualcomm", "paypal", "visa", "mastercard",
  "linkedin", "twitter", "spotify", "airbnb", "stripe", "atlassian",
];

const MIDSIZE_COMPANIES = [
  "razorpay", "cred", "meesho", "groww", "zerodha", "postman",
  "browserstack", "freshworks", "zoho", "swiggy", "zomato", "ola",
  "phonepe", "paytm", "dream11", "unacademy", "byju", "vedantu",
];

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  "Financial Services": ["bank", "finance", "fintech", "payment", "trading", "capital", "securities"],
  "E-Commerce": ["ecommerce", "retail", "shop", "marketplace", "flipkart", "amazon", "walmart"],
  "Healthcare": ["health", "medical", "pharma", "biotech"],
  "EdTech": ["education", "edtech", "learning", "academy", "unacademy", "byju", "vedantu"],
  "Social Media": ["social", "media", "meta", "facebook", "twitter", "linkedin", "instagram"],
  "Cloud & Infrastructure": ["cloud", "aws", "azure", "gcp", "infrastructure"],
  "Consulting": ["consulting", "deloitte", "accenture", "capgemini", "cognizant"],
};

function inferSize(company: string): CompanySize {
  const lower = company.toLowerCase().trim();
  if (ENTERPRISE_COMPANIES.some((c) => lower.includes(c))) return "Enterprise";
  if (MIDSIZE_COMPANIES.some((c) => lower.includes(c))) return "Mid-size";
  return "Startup";
}

function inferIndustry(company: string): string {
  const lower = company.toLowerCase();
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return industry;
  }
  return "Technology Services";
}

function getHiringFocus(size: CompanySize): string {
  switch (size) {
    case "Enterprise":
      return "Structured hiring with emphasis on DSA, core CS fundamentals, system design, and behavioral rounds. Expect online assessments as initial filters.";
    case "Mid-size":
      return "Balanced approach combining practical coding skills with theoretical fundamentals. May include take-home assignments and culture-fit discussions.";
    case "Startup":
      return "Practical problem-solving and depth in your tech stack. Expect hands-on coding, system discussions, and strong emphasis on culture fit and ownership mindset.";
  }
}

function generateRounds(size: CompanySize, skills: ExtractedSkills[]): RoundMapping[] {
  const hasCategory = (cat: string) => skills.some((s) => s.category === cat);
  const hasDSA = hasCategory("Core CS");
  const hasWeb = hasCategory("Web");
  const hasCloud = hasCategory("Cloud/DevOps");

  if (size === "Enterprise") {
    const rounds: RoundMapping[] = [
      {
        round: "Round 1",
        title: "Online Assessment (DSA + Aptitude)",
        why: "Enterprises filter candidates at scale — expect timed coding problems and aptitude questions to clear the initial cut.",
      },
      {
        round: "Round 2",
        title: hasDSA ? "Technical: DSA + Core CS" : "Technical: Coding + Problem Solving",
        why: hasDSA
          ? "Deep dive into data structures, algorithms, and CS fundamentals like OS, DBMS, and networking."
          : "Expect medium-difficulty coding problems and questions on your strongest CS concepts.",
      },
      {
        round: "Round 3",
        title: hasWeb ? "Technical: Projects + Stack Deep Dive" : "Technical: System Design + Projects",
        why: hasWeb
          ? "Be ready to walk through your projects, explain architecture choices, and discuss frontend/backend trade-offs."
          : "Discuss your projects and demonstrate ability to design scalable systems.",
      },
      {
        round: "Round 4",
        title: "HR / Managerial",
        why: "Assess cultural fit, communication skills, and long-term alignment. Prepare your 'why this company' and 'tell me about yourself' responses.",
      },
    ];
    if (hasCloud) {
      rounds.splice(3, 0, {
        round: "Round 4",
        title: "Cloud & DevOps Discussion",
        why: "Expect questions on deployment pipelines, containerization, and cloud architecture decisions.",
      });
      rounds[4] = { ...rounds[4], round: "Round 5" };
    }
    return rounds;
  }

  if (size === "Mid-size") {
    return [
      {
        round: "Round 1",
        title: hasDSA ? "Coding Test (DSA Focus)" : "Practical Coding Challenge",
        why: "Initial screening through coding — may be a timed online test or a take-home assignment.",
      },
      {
        round: "Round 2",
        title: hasWeb ? "Technical: Full-Stack Discussion" : "Technical: Core Concepts",
        why: hasWeb
          ? "Discuss your experience with frontend/backend technologies, API design, and state management."
          : "Expect questions on your primary language, OOP, and problem-solving approach.",
      },
      {
        round: "Round 3",
        title: "Project Review + System Discussion",
        why: "Walk through your projects — explain decisions, challenges faced, and how you'd improve them.",
      },
      {
        round: "Round 4",
        title: "Culture Fit + HR",
        why: "Mid-size companies value ownership and adaptability. Show you can wear multiple hats.",
      },
    ];
  }

  // Startup
  return [
    {
      round: "Round 1",
      title: hasWeb ? "Practical Coding (Stack-Specific)" : "Live Coding Challenge",
      why: "Startups prioritize practical skills — expect real-world problems using your stated tech stack.",
    },
    {
      round: "Round 2",
      title: "System Discussion + Architecture",
      why: "Demonstrate your ability to think about trade-offs, scalability, and make pragmatic design decisions.",
    },
    {
      round: "Round 3",
      title: "Culture Fit + Founder Chat",
      why: "Startups hire for mindset. Show initiative, curiosity, and willingness to operate in ambiguity.",
    },
  ];
}

export function generateCompanyIntel(
  company: string,
  skills: ExtractedSkills[],
): CompanyIntel {
  const size = inferSize(company);
  const industry = inferIndustry(company);
  return {
    company: company.trim(),
    industry,
    size,
    hiringFocus: getHiringFocus(size),
    rounds: generateRounds(size, skills),
  };
}
