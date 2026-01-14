'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Activity, Timer, TrendingUp, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DashboardStats } from '@/lib/db/types';

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  loading,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function CoachDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real stats from API once Supabase is connected
    const fetchStats = async () => {
      try {
        // Simulated delay for now
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data until Supabase is configured
        setStats({
          totalRuns: 0,
          totalDistanceKm: 0,
          thisWeekKm: 0,
          thisWeekRuns: 0,
          activePlan: null,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Coach'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your training overview for today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Runs"
          value={stats?.totalRuns ?? 0}
          description="All time"
          icon={Activity}
          loading={loading}
        />
        <StatsCard
          title="Total Distance"
          value={`${(stats?.totalDistanceKm ?? 0).toFixed(1)} km`}
          description="All time"
          icon={TrendingUp}
          loading={loading}
        />
        <StatsCard
          title="This Week"
          value={`${(stats?.thisWeekKm ?? 0).toFixed(1)} km`}
          description={`${stats?.thisWeekRuns ?? 0} runs`}
          icon={Timer}
          loading={loading}
        />
        <StatsCard
          title="Active Plan"
          value={stats?.activePlan?.plan_type ?? 'None'}
          description={stats?.activePlan ? `Week ${stats.activePlan.current_week_num}` : 'No active plan'}
          icon={Calendar}
          loading={loading}
        />
      </div>

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Runs</CardTitle>
          <CardDescription>Your runs from the last 14 days</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No runs yet.</p>
              <p className="text-sm mt-1">
                Connect Strava or log a run manually to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* This Week's Training */}
      <Card>
        <CardHeader>
          <CardTitle>This Week&apos;s Training</CardTitle>
          <CardDescription>
            {stats?.activePlan
              ? `${stats.activePlan.plan_type} - Week ${stats.activePlan.current_week_num}`
              : 'No active training plan'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(7)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : stats?.activePlan ? (
            <div className="text-muted-foreground">
              {/* TODO: Display current week workouts */}
              <p>Training plan workouts will appear here.</p>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No active training plan.</p>
              <p className="text-sm mt-1">
                Go to Training Plan to generate a new plan.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
