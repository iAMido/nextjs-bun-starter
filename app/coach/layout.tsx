'use client';

import { CoachSidebar } from '@/components/coach/sidebar';

export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Temporarily disabled auth check for development
  // TODO: Re-enable when Google OAuth is configured
  // const { data: session, status } = useSession();
  // if (status === 'loading') return <LoadingSkeleton />;
  // if (!session) redirect('/');

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
