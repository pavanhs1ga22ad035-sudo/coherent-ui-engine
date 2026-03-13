import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { ExtractedSkills } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Core CS": "bg-primary/10 text-primary border-primary/20",
  Languages: "bg-accent text-accent-foreground border-accent-foreground/20",
  Web: "bg-primary/15 text-primary border-primary/25",
  Data: "bg-muted text-foreground border-border",
  "Cloud/DevOps": "bg-secondary text-secondary-foreground border-border",
  Testing: "bg-muted text-muted-foreground border-border",
};

interface SkillTagsProps {
  skills: ExtractedSkills[];
  confidenceMap: Record<string, "know" | "practice">;
  onToggle: (skill: string) => void;
}

const SkillTags = ({ skills, confidenceMap, onToggle }: SkillTagsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Extracted Skills
        </CardTitle>
        <CardDescription>Click a skill to toggle between "I know this" and "Need practice".</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <p className="text-sm font-medium text-muted-foreground mb-2">{group.category}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const isKnown = confidenceMap[skill] === "know";
                return (
                  <Badge
                    key={skill}
                    variant="outline"
                    className={`cursor-pointer select-none transition-all duration-200 ${
                      isKnown
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/85"
                        : CATEGORY_COLORS[group.category] || ""
                    }`}
                    onClick={() => onToggle(skill)}
                  >
                    {isKnown ? "✓ " : "○ "}
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary" /> I know this
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-sm border border-border" /> Need practice
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillTags;
