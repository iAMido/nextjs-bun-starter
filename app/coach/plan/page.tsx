'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Target, ChevronLeft, ChevronRight, Sparkles, Calendar } from 'lucide-react';
import { useState } from 'react';

const planTypes = [
  'Half Marathon',
  'Marathon',
  '10K',
  '5K Speed',
  'Base Building',
  'Maintenance',
];

const durationOptions = [4, 6, 8, 10, 12, 16];
const runsPerWeekOptions = [3, 4, 5];

export default function TrainingPlanPage() {
  const [planType, setPlanType] = useState('');
  const [duration, setDuration] = useState('8');
  const [runsPerWeek, setRunsPerWeek] = useState('4');
  const [notes, setNotes] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activePlan, setActivePlan] = useState<unknown>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    // TODO: Call plan generation API
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGenerating(false);
    // setActivePlan(response);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Plan</h1>
        <p className="text-muted-foreground mt-1">
          Generate and manage your AI-powered training plan.
        </p>
      </div>

      <Tabs defaultValue={activePlan ? 'current' : 'generate'} className="space-y-6">
        <TabsList>
          <TabsTrigger value="current" disabled={!activePlan}>
            Current Plan
          </TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
        </TabsList>

        {/* Current Plan */}
        <TabsContent value="current" className="space-y-6">
          {activePlan ? (
            <>
              {/* Plan Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Half Marathon - Triphasic Model
                      </CardTitle>
                      <CardDescription>Week 4 of 12 - Support Phase</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Week Navigation */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="icon">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-center">
                      <CardTitle>Week 4</CardTitle>
                      <CardDescription>Jan 20 - Jan 26, 2025</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Workout Table would go here */}
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Workout schedule will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active training plan.</p>
                  <p className="text-sm mt-1">
                    Generate a new plan to get started.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Generate New Plan */}
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Training Plan
              </CardTitle>
              <CardDescription>
                Create a personalized plan based on the Run Elite Triphasic methodology.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Plan Type</label>
                <Select value={planType} onValueChange={setPlanType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {planTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Duration (weeks)</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((weeks) => (
                      <SelectItem key={weeks} value={weeks.toString()}>
                        {weeks} weeks
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Runs per Week */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Runs per Week</label>
                <Select value={runsPerWeek} onValueChange={setRunsPerWeek}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {runsPerWeekOptions.map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} runs/week
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific goals, constraints, or preferences..."
                  rows={3}
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white"
                disabled={!planType || generating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {generating ? 'Generating Plan...' : 'Generate Plan'}
              </Button>

              {generating && (
                <p className="text-sm text-center text-muted-foreground">
                  This may take up to 30 seconds...
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
