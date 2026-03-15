const STORAGE_KEY = "prp_final_submission";

export interface ProofLinks {
  lovableUrl: string;
  githubUrl: string;
  deployedUrl: string;
}

export function getProofLinks(): ProofLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
    return JSON.parse(raw);
  } catch {
    return { lovableUrl: "", githubUrl: "", deployedUrl: "" };
  }
}

export function saveProofLinks(links: ProofLinks): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function isValidUrl(url: string): boolean {
  if (!url.trim()) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function allProofLinksValid(): boolean {
  const links = getProofLinks();
  return isValidUrl(links.lovableUrl) && isValidUrl(links.githubUrl) && isValidUrl(links.deployedUrl);
}
