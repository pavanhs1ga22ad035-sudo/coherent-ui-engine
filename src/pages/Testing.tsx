import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, RotateCcw, ChevronDown, ChevronRight } from "lucide-react";

const STORAGE_KEY = "prp-test-checklist";

interface TestItem {
  id: string;
  label: string;
  hint: string;
}

const testItems: TestItem[] = [
  {
    id: "jd-required",
    label: "JD required validation works",
    hint: "Go to Dashboard, leave JD empty, and click Analyze. The button should be disabled.",
  },
  {
    id: "short-jd-warning",
    label: "Short JD warning shows for <200 chars",
    hint: "Type a short text (<200 chars) in the JD textarea. A warning banner should appear.",
  },
  {
    id: "skills-extraction",
    label: "Skills extraction groups correctly",
    hint: "Paste a JD with React, Node, SQL keywords. Check that skills appear under correct categories.",
  },
  {
    id: "round-mapping",
    label: "Round mapping changes based on company + skills",
    hint: "Analyze with 'Amazon' vs an unknown company. Verify the round timeline differs.",
  },
  {
    id: "score-deterministic",
    label: "Score calculation is deterministic",
    hint: "Analyze the same JD twice. The base score should be identical both times.",
  },
  {
    id: "skill-toggles",
    label: "Skill toggles update score live",
    hint: "On results, click skill tags to toggle 'I know this'. The readiness score should update instantly.",
  },
  {
    id: "persist-refresh",
    label: "Changes persist after refresh",
    hint: "Toggle some skills, refresh the page, and reopen the entry from Assessments. Changes should be retained.",
  },
  {
    id: "history-save-load",
    label: "History saves and loads correctly",
    hint: "Analyze a JD, go to Assessments, and click the entry. All data should load correctly.",
  },
  {
    id: "export-buttons",
    label: "Export buttons copy the correct content",
    hint: "Click 'Copy 7-day plan' and paste into a text editor. Verify it contains the plan data.",
  },
  {
    id: "no-console-errors",
    label: "No console errors on core pages",
    hint: "Open browser DevTools Console. Navigate Dashboard → Assessments → Profile. No red errors should appear.",
  },
];

export function getTestChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function isAllTestsPassed(): boolean {
  const checked = getTestChecklist();
  return testItems.every((t) => checked[t.id]);
}

const Testing = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(getTestChecklist());
  }, []);

  const passedCount = testItems.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === testItems.length;

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleHint = (id: string) => {
    setExpandedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setChecked({});
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Test Checklist</h1>
        <p className="text-muted-foreground">Verify all features before shipping.</p>
      </div>

      {/* Summary */}
      <Card>
        <CardContent className="flex items-center gap-4 py-5">
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Tests Passed: {passedCount} / {testItems.length}
              </h3>
              {allPassed ? (
                <Badge className="bg-success text-success-foreground">All Clear</Badge>
              ) : (
                <Badge variant="outline" className="border-warning text-warning">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Incomplete
                </Badge>
              )}
            </div>
            <Progress value={(passedCount / testItems.length) * 100} className="h-2" />
            {!allPassed && (
              <p className="text-sm text-warning flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Fix issues before shipping.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manual Test Cases</CardTitle>
              <CardDescription>Check each item after verifying it works correctly.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {testItems.map((item, i) => (
            <div key={item.id} className="rounded-md border border-border">
              <label className="flex items-start gap-3 cursor-pointer p-3 group">
                <Checkbox
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className={`text-sm font-medium leading-relaxed ${checked[item.id] ? "line-through text-muted-foreground" : ""}`}>
                      {item.label}
                    </span>
                    {checked[item.id] && <CheckCircle2 className="w-4 h-4 text-success shrink-0" />}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); toggleHint(item.id); }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 flex items-center gap-0.5"
                >
                  {expandedHints[item.id] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  How to test
                </button>
              </label>
              {expandedHints[item.id] && (
                <div className="px-3 pb-3 pl-11">
                  <p className="text-xs text-muted-foreground bg-muted rounded-md p-2">{item.hint}</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demo note */}
      <p className="text-xs text-muted-foreground text-center">
        Checklist state is stored in localStorage and persists across sessions.
      </p>
    </div>
  );
};

export default Testing;
