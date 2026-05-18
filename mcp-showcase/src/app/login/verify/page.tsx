import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SiteHeader from '@/app/SiteHeader';
import {
  getDemoUser,
  getMaskedRecoveryContacts,
  readAuthenticatedSession,
  readPendingChallenge,
} from '@/lib/mfa-lab/auth';
import { listAuditEventsForAttempt, listDeliveriesForAttempt } from '@/lib/mfa-lab/auth-store';
import { buildOtpAuthUri, generateTotpCode } from '@/lib/mfa-lab/auth-utils';

import VerifyMfaPanel from './VerifyMfaPanel';

export const metadata: Metadata = {
  title: 'Verify MFA | MCP Hub MFA',
  description: 'Complete a working second factor before the protected session is created.',
};

export default async function VerifyMfaPage() {
  const session = await readAuthenticatedSession();
  const challenge = await readPendingChallenge();
  const user = getDemoUser();
  const contacts = getMaskedRecoveryContacts();

  if (session) {
    redirect('/secure-portal');
  }

  if (!challenge) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#043873] font-sans text-white">
      <SiteHeader currentPage="mfa" cta={{ href: '/login', label: 'Restart Login' }} />

      <main className="px-8 py-16 lg:px-[220px] lg:py-[110px]">
        <div className="mx-auto max-w-[1220px] space-y-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFE492]"></span>
              Pending MFA challenge expires in 10 minutes
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-[62px]">Verify the second factor</h1>
            <p className="max-w-[820px] text-[18px] leading-[30px] text-white/82">
              The password was accepted, but access is still blocked until the second factor is
              validated. This is the part that makes the website a real MFA project instead of a
              static presentation.
            </p>
          </div>

          <VerifyMfaPanel
            selectedFactor={challenge.selectedFactor}
            availableFactors={challenge.availableFactors}
            maskedEmail={contacts.email}
            maskedPhone={contacts.phone}
            currentTotpCode={generateTotpCode(user.totpSecret)}
            totpSecret={user.totpSecret}
            otpAuthUri={buildOtpAuthUri(user)}
            pushApproved={Boolean(challenge.pushApprovedAt)}
            deliveries={listDeliveriesForAttempt(challenge.attemptId)}
            recentEvents={listAuditEventsForAttempt(challenge.attemptId)}
          />

          <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-xl">
            <p className="text-sm leading-7 text-white/80">
              Need the explanatory version too?{' '}
              <Link href="/mfa-lab" className="font-semibold text-[#FFE492] hover:text-white">
                Open the MFA Lab route
              </Link>{' '}
              to show the five-plus factor overview, threat tradeoffs, and project framing during
              the presentation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
