import type { AnalysisEntry } from "./types";

const STORAGE_KEY = "placement-prep-history";

function isValidEntry(entry: unknown): entry is AnalysisEntry {
  if (!entry || typeof entry !== "object") return false;
  const e = entry as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.createdAt === "string" &&
    typeof e.jdText === "string" &&
    Array.isArray(e.extractedSkills)
  );
}

/** Migrate legacy entries that used readinessScore instead of baseScore/finalScore */
function migrateEntry(raw: Record<string, unknown>): AnalysisEntry | null {
  try {
    if (!isValidEntry(raw)) return null;
    const entry = raw as AnalysisEntry;

    // Migrate legacy fields
    if (entry.baseScore === undefined && (entry as any).readinessScore !== undefined) {
      entry.baseScore = (entry as any).readinessScore;
    }
    if (entry.finalScore === undefined) {
      entry.finalScore = entry.baseScore ?? 35;
    }
    if (!entry.updatedAt) {
      entry.updatedAt = entry.createdAt;
    }
    if (!entry.company) entry.company = "";
    if (!entry.role) entry.role = "";
    if (!entry.skillConfidenceMap) entry.skillConfidenceMap = {};

    return entry;
  } catch {
    return null;
  }
}

let _corruptedCount = 0;

export function getCorruptedCount(): number {
  return _corruptedCount;
}

export function getHistory(): AnalysisEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    _corruptedCount = 0;
    const valid: AnalysisEntry[] = [];
    for (const item of parsed) {
      const migrated = migrateEntry(item);
      if (migrated) {
        valid.push(migrated);
      } else {
        _corruptedCount++;
      }
    }
    return valid;
  } catch {
    _corruptedCount = 1;
    return [];
  }
}

export function saveEntry(entry: AnalysisEntry): void {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getEntryById(id: string): AnalysisEntry | undefined {
  return getHistory().find((e) => e.id === id);
}

export function deleteEntry(id: string): void {
  const history = getHistory().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function updateEntry(updated: AnalysisEntry): void {
  const history = getHistory().map((e) => (e.id === updated.id ? updated : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
