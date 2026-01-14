'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, User, Heart, Save } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  // Profile state
  const [name, setName] = useState('Ido');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [restingHr, setRestingHr] = useState('51');
  const [maxHr, setMaxHr] = useState('185');
  const [ltHr, setLtHr] = useState('165');
  const [goal, setGoal] = useState('Sub-2hr Half Marathon');
  const [trainingDays, setTrainingDays] = useState('Mon, Wed, Fri, Sun');

  // HR Zones state
  const [zone1, setZone1] = useState('0-120');
  const [zone2, setZone2] = useState('120-135');
  const [zone3, setZone3] = useState('135-150');
  const [zone4, setZone4] = useState('150-165');
  const [zone5, setZone5] = useState('165-175');
  const [zone6, setZone6] = useState('175+');

  const [saving, setSaving] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    // TODO: Save to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleSaveZones = async () => {
    setSaving(true);
    // TODO: Save to database
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your athlete profile and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="zones">
            <Heart className="w-4 h-4 mr-2" />
            HR Zones
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Athlete Profile
              </CardTitle>
              <CardDescription>
                Your personal information used for training calculations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resting HR (bpm)</label>
                  <Input type="number" value={restingHr} onChange={(e) => setRestingHr(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max HR (bpm)</label>
                  <Input type="number" value={maxHr} onChange={(e) => setMaxHr(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lactate Threshold HR (bpm)</label>
                  <Input type="number" value={ltHr} onChange={(e) => setLtHr(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Current Goal</label>
                <Input value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Training Days</label>
                <Input
                  value={trainingDays}
                  onChange={(e) => setTrainingDays(e.target.value)}
                  placeholder="e.g., Mon, Wed, Fri, Sun"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HR Zones Tab */}
        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Heart Rate Zones
              </CardTitle>
              <CardDescription>
                Configure your personal HR zones for training intensity tracking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-400" />
                    Zone 1 (Recovery)
                  </label>
                  <Input value={zone1} onChange={(e) => setZone1(e.target.value)} placeholder="0-120" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-400" />
                    Zone 2 (Easy)
                  </label>
                  <Input value={zone2} onChange={(e) => setZone2(e.target.value)} placeholder="120-135" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    Zone 3 (Moderate)
                  </label>
                  <Input value={zone3} onChange={(e) => setZone3(e.target.value)} placeholder="135-150" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    Zone 4 (Threshold)
                  </label>
                  <Input value={zone4} onChange={(e) => setZone4(e.target.value)} placeholder="150-165" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400" />
                    Zone 5 (VO2max)
                  </label>
                  <Input value={zone5} onChange={(e) => setZone5(e.target.value)} placeholder="165-175" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    Zone 6 (Anaerobic)
                  </label>
                  <Input value={zone6} onChange={(e) => setZone6(e.target.value)} placeholder="175+" />
                </div>
              </div>

              <Button
                onClick={handleSaveZones}
                disabled={saving}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Zones'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
