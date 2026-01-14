'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

const feelingOptions = ['Great', 'Good', 'Okay', 'Tired', 'Exhausted'];

export default function LogRunsPage() {
  const [rating, setRating] = useState([5]);
  const [effort, setEffort] = useState([5]);
  const [feeling, setFeeling] = useState('');
  const [comment, setComment] = useState('');
  const [selectedRun, setSelectedRun] = useState('');

  const handleSubmit = async () => {
    // TODO: Submit to API
    console.log({ selectedRun, rating: rating[0], effort: effort[0], feeling, comment });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Log Runs</h1>
        <p className="text-muted-foreground mt-1">
          Record your post-run feedback and ratings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Run Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Run</CardTitle>
            <CardDescription>Choose a recent run to log feedback for</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedRun} onValueChange={setSelectedRun}>
              <SelectTrigger>
                <SelectValue placeholder="Select a run..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-runs" disabled>
                  No recent runs available
                </SelectItem>
              </SelectContent>
            </Select>

            {!selectedRun && (
              <div className="mt-8 text-center py-8 text-muted-foreground">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No runs available to log.</p>
                <p className="text-sm mt-1">
                  Sync from Strava to see your recent runs.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle>Run Feedback</CardTitle>
            <CardDescription>How did the run feel?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Overall Rating</label>
                <span className="text-sm text-muted-foreground">{rating[0]}/10</span>
              </div>
              <Slider
                value={rating}
                onValueChange={setRating}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Effort */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Effort Level (RPE)</label>
                <span className="text-sm text-muted-foreground">{effort[0]}/10</span>
              </div>
              <Slider
                value={effort}
                onValueChange={setEffort}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            {/* Feeling */}
            <div className="space-y-3">
              <label className="text-sm font-medium">How did you feel?</label>
              <Select value={feeling} onValueChange={setFeeling}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feeling..." />
                </SelectTrigger>
                <SelectContent>
                  {feelingOptions.map((opt) => (
                    <SelectItem key={opt} value={opt.toLowerCase()}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any notes about the run..."
                rows={3}
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white"
              disabled={!selectedRun}
            >
              Save Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
