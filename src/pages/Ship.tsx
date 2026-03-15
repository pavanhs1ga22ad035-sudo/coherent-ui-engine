import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Rocket, CheckCircle2, AlertTriangle } from "lucide-react";
import { isAllTestsPassed } from "./Testing";
import { useNavigate } from "react-router-dom";

const Ship = () => {
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUnlocked(isAllTestsPassed());
  }, []);

  if (!unlocked) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ship</h1>
          <p className="text-muted-foreground">Deploy your placement readiness platform.</p>
        </div>
        <Card className="border-warning/30">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-warning" />
            </div>
            <h2 className="text-xl font-semibold">Shipping Locked</h2>
            <p className="text-muted-foreground max-w-md">
              Complete all 10 test cases in the Test Checklist before shipping. This ensures quality and prevents regressions.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-warning">
              <AlertTriangle className="w-4 h-4" />
              Not all tests have been marked as passed.
            </div>
            <Button variant="outline" onClick={() => navigate("/dashboard/testing")}>
              Go to Test Checklist
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ship</h1>
        <p className="text-muted-foreground">All tests passed — ready to deploy.</p>
      </div>
      <Card className="border-success/30">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-semibold">Ready to Ship</h2>
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" /> All 10 Tests Passed
          </Badge>
          <p className="text-muted-foreground max-w-md">
            Your platform has passed all quality checks. You can confidently publish this version.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ship;
