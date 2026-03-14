import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Briefcase, Info } from "lucide-react";
import type { CompanyIntel } from "@/lib/companyIntel";

interface Props {
  intel: CompanyIntel;
}

const sizeLabel: Record<string, string> = {
  Startup: "< 200 employees",
  "Mid-size": "200 – 2,000 employees",
  Enterprise: "2,000+ employees",
};

const CompanyIntelCard = ({ intel }: Props) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          Company Intel
        </CardTitle>
        <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
          <Info className="w-3 h-3 mr-1" /> Demo Mode
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Company</p>
          <p className="text-sm font-semibold">{intel.company}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Industry</p>
          <p className="text-sm">{intel.industry}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Estimated Size</p>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-sm">{intel.size}</span>
            <span className="text-xs text-muted-foreground">({sizeLabel[intel.size]})</span>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-accent/50 p-3 space-y-1">
        <p className="text-xs font-semibold flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5" /> Typical Hiring Focus
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{intel.hiringFocus}</p>
      </div>

      <p className="text-[11px] text-muted-foreground italic">
        Demo Mode: Company intel generated heuristically. Actual hiring processes may vary.
      </p>
    </CardContent>
  </Card>
);

export default CompanyIntelCard;
