import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ActionNextBoxProps {
  confidenceMap: Record<string, "know" | "practice">;
}

const ActionNextBox = ({ confidenceMap }: ActionNextBoxProps) => {
  const weakSkills = Object.entries(confidenceMap)
    .filter(([, v]) => v === "practice")
    .map(([k]) => k)
    .slice(0, 3);

  if (weakSkills.length === 0) return null;

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-primary" />
          Action Next
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Your top weak areas to focus on:</p>
        <div className="flex flex-wrap gap-2">
          {weakSkills.map((s) => (
            <Badge key={s} variant="outline" className="border-destructive/30 text-destructive">
              {s}
            </Badge>
          ))}
        </div>
        <p className="text-sm font-medium text-primary">→ Start Day 1 plan now.</p>
      </CardContent>
    </Card>
  );
};

export default ActionNextBox;
