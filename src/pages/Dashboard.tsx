import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const readinessScore = 72;
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (readinessScore / 100) * circumference;
    setOffset(progressOffset);
  }, [circumference]);

  const radarData = [
    { subject: "DSA", value: 75 },
    { subject: "System Design", value: 60 },
    { subject: "Communication", value: 80 },
    { subject: "Resume", value: 85 },
    { subject: "Aptitude", value: 70 },
  ];

  const weeklyProgress = 12;
  const weeklyGoal = 20;
  const activeDays = [true, true, false, true, true, false, true]; // Mon-Sun

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="relative">
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="#e5e7eb"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <motion.circle
                  stroke="#3b82f6"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset: offset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{readinessScore}/100</span>
                <span className="text-sm text-muted-foreground">Readiness Score</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Dynamic Programming</p>
              <p className="text-sm text-muted-foreground">3/10 completed</p>
            </div>
            <Progress value={(3 / 10) * 100} />
            <Button className="w-full">Continue</Button>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Problems Solved: {weeklyProgress}/{weeklyGoal} this week</p>
              <Progress value={(weeklyProgress / weeklyGoal) * 100} />
            </div>
            <div className="flex justify-between mt-4">
              {['M','T','W','T','F','S','S'].map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs ${activeDays[index] ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="rounded-2xl shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">DSA Mock Test</p>
                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">System Design Review</p>
                <p className="text-sm text-muted-foreground">Wed, 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
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
}
