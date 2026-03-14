export type SkillCategory =
  | "Core CS"
  | "Languages"
  | "Web"
  | "Data"
  | "Cloud/DevOps"
  | "Testing"
  | "Other";

export interface ExtractedSkills {
  category: SkillCategory;
  skills: string[];
}

export interface ChecklistRound {
  round: string;
  title: string;
  items: string[];
}

export interface DayPlan {
  day: string;
  focus: string;
  tasks: string[];
}

export interface AnalysisEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills[];
  plan: DayPlan[];
  checklist: ChecklistRound[];
  questions: string[];
  baseScore: number;
  finalScore: number;
  skillConfidenceMap: Record<string, "know" | "practice">;
  companyIntel?: import("@/lib/companyIntel").CompanyIntel | null;
  /** @deprecated Use baseScore/finalScore instead */
  readinessScore?: number;
}
