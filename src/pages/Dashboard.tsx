import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

const readinessScore = 72;
const radius = 70;
const stroke = 12;
const normalizedRadius = radius - stroke / 2;
const circumference = normalizedRadius * 2 * Math.PI;

const radarData = [
  { subject: "DSA", value: 75 },
  { subject: "System Design", value: 60 },
  { subject: "Communication", value: 80 },
  { subject: "Resume", value: 85 },
  { subject: "Aptitude", value: 70 },
];

const weeklyProgress = 12;
const weeklyGoal = 20;
const activeDays = [true, true, false, true, true, false, true];

const Dashboard = () => {
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (readinessScore / 100) * circumference;
    setOffset(progressOffset);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative">
              <svg height={radius * 2} width={radius * 2} className="-rotate-90">
                <circle
                  stroke="hsl(var(--muted))"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="hsl(var(--primary))"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset: offset }}
                  className="transition-[stroke-dashoffset] duration-1000 ease-out"
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{readinessScore}/100</span>
                <span className="text-sm text-muted-foreground">Readiness Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Skills" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Dynamic Programming</p>
              <p className="text-sm text-muted-foreground">3/10 completed</p>
            </div>
            <Progress value={30} />
            <Button className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">
                Problems Solved: {weeklyProgress}/{weeklyGoal} this week
              </p>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} />
            </div>
            <div className="mt-4 flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                      activeDays[index] ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">DSA Mock Test</p>
                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">System Design Review</p>
                <p className="text-sm text-muted-foreground">Wed, 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">HR Interview Prep</p>
                <p className="text-sm text-muted-foreground">Friday, 11:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
