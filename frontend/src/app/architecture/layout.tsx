import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'Interactive system diagrams for multi-tenant routing, API lifecycles, RBAC, and queue processing.',
};

export default function ArchitectureLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
