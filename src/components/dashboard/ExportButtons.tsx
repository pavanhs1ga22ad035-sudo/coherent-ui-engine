import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import type { AnalysisEntry } from "@/lib/types";

interface ExportButtonsProps {
  result: AnalysisEntry;
}

function planToText(result: AnalysisEntry): string {
  return result.plan
    .map((d) => `${d.day} — ${d.focus}\n${d.tasks.map((t, i) => `  ${i + 1}. ${t}`).join("\n")}`)
    .join("\n\n");
}

function checklistToText(result: AnalysisEntry): string {
  return result.checklist
    .map((r) => `${r.round}: ${r.title}\n${r.items.map((it, i) => `  ${i + 1}. ${it}`).join("\n")}`)
    .join("\n\n");
}

function questionsToText(result: AnalysisEntry): string {
  return result.questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
}

function fullTxt(result: AnalysisEntry): string {
  const header = `Placement Prep — ${result.company || "Unknown"} · ${result.role || "Unknown"}\nDate: ${new Date(result.createdAt).toLocaleDateString()}\nReadiness Score: ${result.readinessScore}/100\n`;
  const skills = `\n=== EXTRACTED SKILLS ===\n${result.extractedSkills.map((g) => `${g.category}: ${g.skills.join(", ")}`).join("\n")}`;
  return `${header}${skills}\n\n=== 7-DAY PLAN ===\n${planToText(result)}\n\n=== ROUND CHECKLIST ===\n${checklistToText(result)}\n\n=== INTERVIEW QUESTIONS ===\n${questionsToText(result)}`;
}

async function copyText(text: string, label: string) {
  await navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`);
}

function downloadTxt(result: AnalysisEntry) {
  const blob = new Blob([fullTxt(result)], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `placement-prep-${result.company || "report"}.txt`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("File downloaded");
}

const ExportButtons = ({ result }: ExportButtonsProps) => (
  <div className="flex flex-wrap gap-2">
    <Button variant="outline" size="sm" onClick={() => copyText(planToText(result), "7-day plan")}>
      <Copy className="w-4 h-4 mr-1" /> Copy 7-day plan
    </Button>
    <Button variant="outline" size="sm" onClick={() => copyText(checklistToText(result), "Checklist")}>
      <Copy className="w-4 h-4 mr-1" /> Copy checklist
    </Button>
    <Button variant="outline" size="sm" onClick={() => copyText(questionsToText(result), "Questions")}>
      <Copy className="w-4 h-4 mr-1" /> Copy 10 questions
    </Button>
    <Button variant="secondary" size="sm" onClick={() => downloadTxt(result)}>
      <Download className="w-4 h-4 mr-1" /> Download as TXT
    </Button>
  </div>
);

export default ExportButtons;
