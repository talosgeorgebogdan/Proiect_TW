import type { Metadata } from 'next';

import SiteHeader from '../SiteHeader';
import SecurityLabExperience from './SecurityLabExperience';
import { securityLabScenarios } from '@/lib/security-lab/scenarios';

export const metadata: Metadata = {
  title: 'Security Lab | MCP Hub',
  description:
    'Interactive defensive security audit lab for MCP-enabled applications, focused on permissions, prompt exposure, tool safety, and auditability.',
};

export default async function SecurityLabPage({
  searchParams,
}: {
  searchParams?: Promise<{ scenario?: string | string[] }>;
}) {
  const params = (await searchParams) ?? {};
  const initialScenarioSlug =
    typeof params.scenario === 'string'
      ? params.scenario
      : securityLabScenarios[0].slug;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#043873] font-sans text-white">
      <SiteHeader currentPage="security" />
      <SecurityLabExperience initialScenarioSlug={initialScenarioSlug} />
    </div>
  );
}
