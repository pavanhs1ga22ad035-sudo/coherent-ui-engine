import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const readinessScore = 72;
const readinessTotal = 100;
const readinessRadius = 86;
const readinessCircumference = 2 * Math.PI * readinessRadius;
const readinessOffset = readinessCircumference * (1 - readinessScore / readinessTotal);

const skillData = [
  { skill: "DSA", score: 75 },
  { skill: "System Design", score: 60 },
  { skill: "Communication", score: 80 },
  { skill: "Resume", score: 85 },
  { skill: "Aptitude", score: 70 },
];

const activityByDay = [
  { day: "Mon", active: true },
  { day: "Tue", active: true },
  { day: "Wed", active: false },
  { day: "Thu", active: true },
  { day: "Fri", active: true },
  { day: "Sat", active: false },
  { day: "Sun", active: true },
];

const upcomingAssessments = [
  { title: "DSA Mock Test", schedule: "Tomorrow, 10:00 AM" },
  { title: "System Design Review", schedule: "Wed, 2:00 PM" },
  { title: "HR Interview Prep", schedule: "Friday, 11:00 AM" },
];

const Dashboard = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Track your interview readiness in one place.</p>
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Overall Readiness</CardTitle>
          <CardDescription>Your current interview preparation score.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="relative flex h-56 w-56 items-center justify-center">
            <svg viewBox="0 0 220 220" className="h-full w-full -rotate-90">
              <circle cx="110" cy="110" r={readinessRadius} className="fill-none stroke-secondary" strokeWidth="16" />
              <circle
                cx="110"
                cy="110"
                r={readinessRadius}
                className="fill-none stroke-primary [transition:stroke-dashoffset_1.2s_ease]"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={readinessCircumference}
                strokeDashoffset={readinessOffset}
              />
            </svg>
            <div className="absolute text-center">
              <div className="text-4xl font-bold">{readinessScore}/100</div>
              <p className="text-sm text-muted-foreground">Readiness Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skill Breakdown</CardTitle>
          <CardDescription>Performance across key interview dimensions.</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData} outerRadius="72%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Radar
                name="Skill Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.25}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Continue Practice</CardTitle>
          <CardDescription>Pick up where you left off.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Last Topic</p>
            <h3 className="text-lg font-semibold">Dynamic Programming</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>3/10 completed</span>
            </div>
            <Progress value={30} className="h-2" />
          </div>
          <Button>Continue</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Goals</CardTitle>
          <CardDescription>Problems Solved: 12/20 this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={60} className="h-2" />
          <div className="grid grid-cols-7 gap-2">
            {activityByDay.map(({ day, active }) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div
                  className={`h-7 w-7 rounded-full border ${
                    active ? "border-primary bg-primary" : "border-border bg-muted"
                  }`}
                />
                <span className="text-xs text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Assessments</CardTitle>
          <CardDescription>Stay prepared for your next milestones.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {upcomingAssessments.map((assessment) => (
              <li key={assessment.title} className="flex flex-col gap-1 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium">{assessment.title}</span>
                <span className="text-sm text-muted-foreground">{assessment.schedule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;
