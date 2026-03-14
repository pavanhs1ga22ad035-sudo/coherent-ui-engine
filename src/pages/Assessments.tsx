import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink, Clock, AlertTriangle } from "lucide-react";
import { getHistory, deleteEntry, getCorruptedCount } from "@/lib/historyStorage";
import type { AnalysisEntry } from "@/lib/types";

const Assessments = () => {
  const [history, setHistory] = useState<AnalysisEntry[]>([]);
  const [corrupted, setCorrupted] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
    setCorrupted(getCorruptedCount());
  }, []);

  const handleDelete = (id: string) => {
    deleteEntry(id);
    setHistory(getHistory());
  };

  const handleView = (id: string) => {
    navigate(`/dashboard?entry=${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analysis History</h1>
        <p className="text-muted-foreground">Your past job description analyses, stored locally.</p>
      </div>

      {corrupted > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-warning/30 bg-warning/5 p-3">
          <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
          <p className="text-sm text-warning">
            {corrupted === 1
              ? "One saved entry couldn't be loaded. Create a new analysis."
              : `${corrupted} saved entries couldn't be loaded. Create a new analysis.`}
          </p>
        </div>
      )}

      {history.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-1">No analyses yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Go to the Dashboard, paste a job description, and run your first analysis.
            </p>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Go to Analyzer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card key={entry.id} className="group">
              <CardContent className="flex items-center justify-between py-4 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium truncate">
                      {entry.company || "Unnamed Company"}
                    </span>
                    {entry.role && (
                      <Badge variant="secondary" className="font-normal text-xs">
                        {entry.role}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {new Date(entry.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                    {entry.extractedSkills.reduce((a, s) => a + s.skills.length, 0)} skills detected
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{entry.finalScore ?? entry.baseScore}</span>
                    <p className="text-xs text-muted-foreground">score</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(entry.id)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assessments;
