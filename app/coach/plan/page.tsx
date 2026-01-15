'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Target, ChevronLeft, ChevronRight, Sparkles, Calendar, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { TrainingPlan, PlanWeek, Workout } from '@/lib/db/types';

const planTypes = [
  { value: 'half-marathon', label: 'Half Marathon' },
  { value: 'marathon', label: 'Marathon' },
  { value: '10k', label: '10K' },
  { value: '5k-speed', label: '5K Speed' },
  { value: 'base-building', label: 'Base Building' },
  { value: 'maintenance', label: 'Maintenance' },
];

const durationOptions = [4, 6, 8, 10, 12, 16];
const runsPerWeekOptions = [3, 4, 5];

export default function TrainingPlanPage() {
  const [planType, setPlanType] = useState('');
  const [duration, setDuration] = useState('8');
  const [runsPerWeek, setRunsPerWeek] = useState('4');
  const [notes, setNotes] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activePlan, setActivePlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const response = await fetch('/api/coach/plans');
      if (response.ok) {
        const data = await response.json();
        if (data.plan) {
          setActivePlan(data.plan);
          setCurrentWeek(data.plan.current_week_num || 1);
        }
      }
    } catch (err) {
      console.error('Failed to fetch plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/coach/plans/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: planTypes.find(p => p.value === planType)?.label || planType,
          durationWeeks: parseInt(duration),
          runsPerWeek: parseInt(runsPerWeek),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setActivePlan(data.plan);
      setCurrentWeek(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate plan');
    } finally {
      setGenerating(false);
    }
  };

  const getPlanWeeks = (): PlanWeek[] => {
    if (!activePlan?.plan_json) return [];

    const planJson = activePlan.plan_json;

    // Handle different plan JSON structures
    if (planJson.weeks && Array.isArray(planJson.weeks)) {
      return planJson.weeks;
    }

    // If it's a raw response, return empty
    if (planJson.raw_response) {
      return [];
    }

    return [];
  };

  const getCurrentWeekData = (): PlanWeek | null => {
    const weeks = getPlanWeeks();
    return weeks.find(w => w.week_number === currentWeek) || null;
  };

  const getWeekDateRange = (weekNum: number): string => {
    if (!activePlan?.start_date) return '';
    const start = new Date(activePlan.start_date);
    start.setDate(start.getDate() + (weekNum - 1) * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const weekData = getCurrentWeekData();
  const totalWeeks = activePlan?.duration_weeks || getPlanWeeks().length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Plan</h1>
        <p className="text-muted-foreground mt-1">
          Generate and manage your AI-powered training plan.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
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
                          {activePlan.plan_type}
                        </CardTitle>
                        <CardDescription>
                          Week {currentWeek} of {totalWeeks}
                          {weekData?.phase && ` - ${weekData.phase}`}
                        </CardDescription>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={currentWeek <= 1}
                        onClick={() => setCurrentWeek(w => w - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="text-center">
                        <CardTitle>Week {currentWeek}</CardTitle>
                        <CardDescription>{getWeekDateRange(currentWeek)}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={currentWeek >= totalWeeks}
                        onClick={() => setCurrentWeek(w => w + 1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {weekData?.focus && (
                      <p className="text-sm text-muted-foreground mb-4 text-center">
                        <strong>Focus:</strong> {weekData.focus}
                      </p>
                    )}

                    {weekData?.workouts && Object.keys(weekData.workouts).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(weekData.workouts).map(([day, workout]) => (
                          <div
                            key={day}
                            className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                          >
                            <div className="p-2 rounded-full bg-primary/10 mt-0.5">
                              <Activity className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{day}</p>
                                {workout.distance && (
                                  <Badge variant="secondary">
                                    {workout.distance}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm font-medium text-primary">{workout.type}</p>
                              {workout.duration && (
                                <p className="text-sm text-muted-foreground">{workout.duration}</p>
                              )}
                              {workout.target_pace && (
                                <p className="text-xs text-muted-foreground">Pace: {workout.target_pace}</p>
                              )}
                              {workout.target_hr && (
                                <p className="text-xs text-muted-foreground">HR: {workout.target_hr}</p>
                              )}
                              {workout.notes && (
                                <p className="text-xs text-muted-foreground mt-1 italic">{workout.notes}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : activePlan.plan_json?.raw_response ? (
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <pre className="whitespace-pre-wrap text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                          {activePlan.plan_json.raw_response}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No workout details available for this week.</p>
                      </div>
                    )}
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
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {/* Plan Type */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Plan Type</label>
                  <Select value={planType} onValueChange={setPlanType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {planTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
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
      )}
    </div>
  );
}
