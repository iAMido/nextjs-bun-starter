'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CoachSidebar } from '@/components/coach/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-4 w-96" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    </div>
  );
}

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSkeleton />;
  }

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
