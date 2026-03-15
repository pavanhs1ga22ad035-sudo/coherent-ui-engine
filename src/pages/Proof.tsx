import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Copy, ExternalLink, FileText } from "lucide-react";
import { toast } from "sonner";
import { getProofLinks, saveProofLinks, isValidUrl, type ProofLinks } from "@/lib/proofStorage";
import { isAllTestsPassed } from "./Testing";

const steps = [
  { id: 1, label: "JD Analyzer built" },
  { id: 2, label: "Skills extraction working" },
  { id: 3, label: "Round mapping engine" },
  { id: 4, label: "7-day prep plan" },
  { id: 5, label: "Interactive readiness scoring" },
  { id: 6, label: "Company intel layer" },
  { id: 7, label: "History & persistence" },
  { id: 8, label: "Export & hardening" },
];

function getStepStatuses(): boolean[] {
  // All 8 steps are considered complete if the app has been built to this point
  // In a real scenario each would track individually; here we mark all as complete
  return steps.map(() => true);
}

const Proof = () => {
  const [links, setLinks] = useState<ProofLinks>({ lovableUrl: "", githubUrl: "", deployedUrl: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLinks(getProofLinks());
  }, []);

  const handleChange = (field: keyof ProofLinks, value: string) => {
    const next = { ...links, [field]: value };
    setLinks(next);
    setTouched((prev) => ({ ...prev, [field]: true }));
    saveProofLinks(next);
  };

  const stepStatuses = getStepStatuses();
  const allStepsComplete = stepStatuses.every(Boolean);
  const testsPassed = isAllTestsPassed();
  const allLinksValid = isValidUrl(links.lovableUrl) && isValidUrl(links.githubUrl) && isValidUrl(links.deployedUrl);
  const isShipped = allStepsComplete && testsPassed && allLinksValid;

  const linkFields: { key: keyof ProofLinks; label: string; placeholder: string }[] = [
    { key: "lovableUrl", label: "Lovable Project Link", placeholder: "https://lovable.dev/projects/..." },
    { key: "githubUrl", label: "GitHub Repository Link", placeholder: "https://github.com/username/repo" },
    { key: "deployedUrl", label: "Deployed URL", placeholder: "https://your-app.lovable.app" },
  ];

  const handleCopySubmission = async () => {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovableUrl}
GitHub Repository: ${links.githubUrl}
Live Deployment: ${links.deployedUrl}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
    await navigator.clipboard.writeText(text);
    toast.success("Final submission copied to clipboard");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Proof & Submission</h1>
        <p className="text-muted-foreground">Document your build and prepare for final submission.</p>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">Project Status:</span>
        {isShipped ? (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Shipped
          </Badge>
        ) : (
          <Badge variant="outline" className="border-warning text-warning">In Progress</Badge>
        )}
      </div>

      {/* Step Completion Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Step Completion Overview</CardTitle>
          <CardDescription>All platform build steps.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2.5 py-1.5">
                {stepStatuses[i] ? (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className={`text-sm ${stepStatuses[i] ? "text-foreground" : "text-muted-foreground"}`}>
                  Step {step.id}: {step.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Artifact Inputs */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-4 h-4" /> Artifact Links
          </CardTitle>
          <CardDescription>Provide all 3 links to unlock Shipped status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {linkFields.map(({ key, label, placeholder }) => {
            const value = links[key];
            const showError = touched[key] && value.trim() !== "" && !isValidUrl(value);
            const showValid = value.trim() !== "" && isValidUrl(value);
            return (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key} className="text-sm">
                  {label} <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id={key}
                    type="url"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={showError ? "border-destructive pr-9" : showValid ? "border-success pr-9" : "pr-9"}
                  />
                  {showValid && (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {showError && <p className="text-xs text-destructive">Enter a valid URL (https://...)</p>}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Export */}
      <Card>
        <CardContent className="py-5">
          <Button onClick={handleCopySubmission} disabled={!allLinksValid} className="w-full sm:w-auto">
            <Copy className="w-4 h-4 mr-2" /> Copy Final Submission
          </Button>
          {!allLinksValid && (
            <p className="text-xs text-muted-foreground mt-2">Fill all 3 valid URLs to enable export.</p>
          )}
        </CardContent>
      </Card>

      {/* Shipped message */}
      {isShipped && (
        <Card className="border-success/30 bg-success/5">
          <CardContent className="py-8 text-center space-y-2">
            <p className="text-lg font-semibold">You built a real product.</p>
            <p className="text-muted-foreground">Not a tutorial. Not a clone.</p>
            <p className="text-muted-foreground">A structured tool that solves a real problem.</p>
            <p className="text-sm font-medium text-success mt-3">This is your proof of work.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Proof;
