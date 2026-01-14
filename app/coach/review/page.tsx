'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Brain } from 'lucide-react';
import { useState } from 'react';

export default function WeeklyReviewPage() {
  const [overallFeeling, setOverallFeeling] = useState([7]);
  const [sleepQuality, setSleepQuality] = useState([7]);
  const [stressLevel, setStressLevel] = useState([5]);
  const [injuryNotes, setInjuryNotes] = useState('');
  const [achievements, setAchievements] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    // TODO: Call AI analysis API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiAnalysis('AI analysis will appear here once configured.');
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weekly Review</h1>
        <p className="text-muted-foreground mt-1">
          Reflect on your training week and get AI-powered insights.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* This Week's Runs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Week&apos;s Runs
            </CardTitle>
            <CardDescription>Your training from the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No runs this week yet.</p>
              <p className="text-sm mt-1">
                Sync from Strava to see your runs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Check-in Form */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Check-in</CardTitle>
            <CardDescription>How was your week overall?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Feeling */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Overall Feeling</label>
                <span className="text-sm text-muted-foreground">{overallFeeling[0]}/10</span>
              </div>
              <Slider
                value={overallFeeling}
                onValueChange={setOverallFeeling}
                max={10}
                min={1}
                step={1}
              />
            </div>

            {/* Sleep Quality */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Sleep Quality</label>
                <span className="text-sm text-muted-foreground">{sleepQuality[0]}/10</span>
              </div>
              <Slider
                value={sleepQuality}
                onValueChange={setSleepQuality}
                max={10}
                min={1}
                step={1}
              />
            </div>

            {/* Stress Level */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Stress Level</label>
                <span className="text-sm text-muted-foreground">{stressLevel[0]}/10</span>
              </div>
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                max={10}
                min={1}
                step={1}
              />
            </div>

            {/* Injury Notes */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Injuries / Niggles</label>
              <Textarea
                value={injuryNotes}
                onChange={(e) => setInjuryNotes(e.target.value)}
                placeholder="Any pain or discomfort..."
                rows={2}
              />
            </div>

            {/* Achievements */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Achievements</label>
              <Textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder="What went well this week..."
                rows={2}
              />
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white"
              disabled={loading}
            >
              <Brain className="w-4 h-4 mr-2" />
              {loading ? 'Analyzing...' : 'Get AI Analysis'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis */}
      {(aiAnalysis || loading) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Coach&apos;s Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <p>{aiAnalysis}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
