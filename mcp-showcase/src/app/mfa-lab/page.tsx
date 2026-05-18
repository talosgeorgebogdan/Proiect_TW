import type { Metadata } from 'next';

import SiteHeader from '../SiteHeader';
import MfaLabExperience from './MfaLabExperience';

export const metadata: Metadata = {
  title: 'MFA Lab | MCP Hub',
  description:
    'Interactive secure-access lab showing multiple MFA methods, OTP generation, and unauthorized access alerting.',
};

export default function MfaLabPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#043873] font-sans text-white">
      <SiteHeader currentPage="mfa" />
      <MfaLabExperience />
    </div>
  );
}
