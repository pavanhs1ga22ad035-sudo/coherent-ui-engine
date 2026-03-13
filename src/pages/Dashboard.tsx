import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Search, Sparkles, RotateCcw } from "lucide-react";
import { extractSkills, calcReadinessScore, generateQuestions, generateChecklist, generatePlan } from "@/lib/jdAnalyzer";
import { saveEntry, getEntryById } from "@/lib/historyStorage";
import type { AnalysisEntry } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Core CS": "bg-primary/10 text-primary border-primary/20",
  Languages: "bg-accent text-accent-foreground border-accent-foreground/20",
  Web: "bg-primary/15 text-primary border-primary/25",
  Data: "bg-muted text-foreground border-border",
  "Cloud/DevOps": "bg-secondary text-secondary-foreground border-border",
  Testing: "bg-muted text-muted-foreground border-border",
};

const Dashboard = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<AnalysisEntry | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Load from URL param if viewing a history entry
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entryId = params.get("entry");
    if (entryId) {
      const entry = getEntryById(entryId);
      if (entry) {
        setResult(entry);
        setCompany(entry.company);
        setRole(entry.role);
        setJdText(entry.jdText);
      }
    }
  }, []);

  const handleAnalyze = () => {
    if (!jdText.trim()) return;

    const skills = extractSkills(jdText);
    const score = calcReadinessScore(skills, company, role, jdText);
    const questions = generateQuestions(skills);
    const checklist = generateChecklist(skills);
    const plan = generatePlan(skills);

    const entry: AnalysisEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      company: company.trim(),
      role: role.trim(),
      jdText,
      extractedSkills: skills,
      plan,
      checklist,
      questions,
      readinessScore: score,
    };

    saveEntry(entry);
    setResult(entry);
    setCheckedItems({});
  };

  const handleReset = () => {
    setCompany("");
    setRole("");
    setJdText("");
    setResult(null);
    setCheckedItems({});
    // Clear URL param
    window.history.replaceState({}, "", "/dashboard");
  };

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!result) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">JD Analyzer</h1>
          <p className="text-muted-foreground">Paste a job description to get a tailored preparation plan.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Enter the details and we'll extract skills, generate a study plan, and estimate your readiness.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="e.g. SDE Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jd">Job Description Text</Label>
              <Textarea
                id="jd"
                placeholder="Paste the full job description here..."
                className="min-h-[200px] resize-y"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{jdText.length} characters · Longer JDs improve accuracy</p>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={!jdText.trim()}
              className="w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Analyze JD
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analysis Results
            {result.company && <span className="text-muted-foreground font-normal text-lg ml-2">— {result.company}</span>}
          </h1>
          <p className="text-muted-foreground">
            {result.role && <>{result.role} · </>}
            {new Date(result.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </div>

      {/* Readiness Score */}
      <Card>
        <CardContent className="flex items-center gap-6 py-6">
          <div className="relative flex h-24 w-24 items-center justify-center shrink-0">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" className="fill-none stroke-secondary" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40"
                className="fill-none stroke-primary"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - result.readinessScore / 100)}
                style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
              />
            </svg>
            <span className="absolute text-xl font-bold">{result.readinessScore}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Readiness Score</h3>
            <p className="text-sm text-muted-foreground">
              Based on {result.extractedSkills.reduce((a, s) => a + s.skills.length, 0)} detected skills
              {result.company ? `, targeting ${result.company}` : ""}
            </p>
            <Progress value={result.readinessScore} className="h-2 mt-2 w-64" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="plan">7-Day Plan</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Extracted Skills
              </CardTitle>
              <CardDescription>Skills detected from the job description, grouped by category.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.extractedSkills.map((group) => (
                <div key={group.category}>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className={CATEGORY_COLORS[group.category] || ""}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4 mt-4">
          {result.checklist.map((round) => (
            <Card key={round.round}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{round.round}: {round.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {round.items.map((item, i) => {
                  const key = `${round.round}-${i}`;
                  return (
                    <label key={key} className="flex items-start gap-3 cursor-pointer group">
                      <Checkbox
                        checked={!!checkedItems[key]}
                        onCheckedChange={() => toggleCheck(key)}
                        className="mt-0.5"
                      />
                      <span className={`text-sm leading-relaxed ${checkedItems[key] ? "line-through text-muted-foreground" : ""}`}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="plan" className="space-y-4 mt-4">
          {result.plan.map((day) => (
            <Card key={day.day}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{day.day}</CardTitle>
                  <Badge variant="secondary" className="font-normal">{day.focus}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {day.tasks.map((task, i) => {
                    const key = `plan-${day.day}-${i}`;
                    return (
                      <label key={key} className="flex items-start gap-3 cursor-pointer">
                        <Checkbox
                          checked={!!checkedItems[key]}
                          onCheckedChange={() => toggleCheck(key)}
                          className="mt-0.5"
                        />
                        <span className={`text-sm leading-relaxed ${checkedItems[key] ? "line-through text-muted-foreground" : ""}`}>
                          {task}
                        </span>
                      </label>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="questions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Likely Interview Questions</CardTitle>
              <CardDescription>Based on skills detected in the JD — practice answering these aloud.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {result.questions.map((q, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{q}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
