'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CoachSidebar } from '@/components/coach/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed left-0 top-0 h-screen w-64 border-r border-border p-4">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <main className="ml-64 p-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background">
      <CoachSidebar />
      <main className="ml-64 transition-all duration-300">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
