import type { Metadata } from 'next/types';
import { ExperienceContent } from '@/components/experience/ExperienceContent';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work history of Saravanan Ramesh — Full Stack Developer with 4+ years across SaaS, government, marketplace, and CRM domains.',
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
