import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Rocket, CheckCircle2, AlertTriangle, FileCheck } from "lucide-react";
import { isAllTestsPassed } from "./Testing";
import { allProofLinksValid } from "@/lib/proofStorage";
import { useNavigate } from "react-router-dom";

const Ship = () => {
  const [testsPassed, setTestsPassed] = useState(false);
  const [linksValid, setLinksValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTestsPassed(isAllTestsPassed());
    setLinksValid(allProofLinksValid());
  }, []);

  const isShipped = testsPassed && linksValid;

  const conditions = [
    { label: "All 10 test cases passed", met: testsPassed, action: () => navigate("/dashboard/testing") },
    { label: "All 3 proof links provided", met: linksValid, action: () => navigate("/dashboard/proof") },
  ];

  if (!isShipped) {
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
              Complete all requirements below to unlock shipping.
            </p>
            <div className="space-y-2 w-full max-w-sm text-left">
              {conditions.map((c) => (
                <button
                  key={c.label}
                  onClick={c.action}
                  className="flex items-center gap-2 w-full text-sm p-2 rounded-md hover:bg-muted transition-colors"
                >
                  {c.met ? (
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
                  )}
                  <span className={c.met ? "text-muted-foreground" : ""}>{c.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ship</h1>
        <p className="text-muted-foreground">All checks passed — shipped.</p>
      </div>
      <Card className="border-success/30 bg-success/5">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <Rocket className="w-8 h-8 text-success" />
          </div>
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Shipped
          </Badge>
          <p className="text-lg font-semibold">You built a real product.</p>
          <p className="text-muted-foreground">Not a tutorial. Not a clone.</p>
          <p className="text-muted-foreground">A structured tool that solves a real problem.</p>
          <p className="text-sm font-medium text-success mt-2">This is your proof of work.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ship;
