import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RoundMapping } from "@/lib/companyIntel";

interface Props {
  rounds: RoundMapping[];
}

const RoundTimeline = ({ rounds }: Props) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base">Expected Round Flow</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border" />

        <div className="space-y-6">
          {rounds.map((r, i) => (
            <div key={i} className="relative">
              {/* Dot */}
              <div className="absolute -left-6 top-1 w-[22px] h-[22px] rounded-full border-2 border-primary bg-background flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">{i + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs font-medium">{r.round}</Badge>
                  <span className="text-sm font-semibold">{r.title}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default RoundTimeline;
