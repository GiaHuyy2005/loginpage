// app/dashboard/page.tsx
import { Suspense } from 'react';
import DashboardWrapper from './DashboardWrapper';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Đang tải dashboard...</div>}>
      <DashboardWrapper />
    </Suspense>
  );
}
