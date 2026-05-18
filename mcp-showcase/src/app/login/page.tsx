import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SiteHeader from '../SiteHeader';
import {
  getDemoUser,
  getMaskedRecoveryContacts,
  readAuthenticatedSession,
  readPendingChallenge,
} from '@/lib/mfa-lab/auth';

import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login | MCP Hub MFA',
  description: 'Real password plus MFA login flow for the digital security project.',
};

export default async function LoginPage() {
  const session = await readAuthenticatedSession();
  const pendingChallenge = await readPendingChallenge();
  const user = getDemoUser();
  const contacts = getMaskedRecoveryContacts();

  if (session) {
    redirect('/secure-portal');
  }

  if (pendingChallenge) {
    redirect('/login/verify');
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#043873] font-sans text-white">
      <SiteHeader currentPage="mfa" cta={{ href: '/mfa-lab', label: 'View MFA Explanation' }} />

      <main className="px-8 py-16 lg:px-[220px] lg:py-[110px]">
        <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFE492]"></span>
              Functional MFA login for the course project
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-bold tracking-tight md:text-[64px]">
                Password first, MFA before access.
              </h1>
              <p className="max-w-[760px] text-[18px] leading-[30px] text-white/85">
                This is the real sign-in flow for the website branch, not only the presentation
                route. The password is checked server-side, then the user must complete a second
                factor before a protected session cookie is issued.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                  Demo credentials
                </p>
                <p className="mt-4 text-lg font-semibold text-white">{user.email}</p>
                <p className="mt-2 text-lg font-semibold text-[#FFE492]">DemoPassword!2026</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                  Working second factors
                </p>
                <p className="mt-4 leading-8 text-white/82">
                  Authenticator TOTP, email OTP, SMS OTP, and push approval.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                Delivery model
              </p>
              <p className="mt-4 text-[17px] leading-[30px] text-white/82">
                Because this branch runs locally without external gateways, email and SMS are
                generated server-side and surfaced in a demo delivery center during the login
                attempt. That keeps the verification logic real while making the flow easy to
                present in class.
              </p>
              <p className="mt-4 text-[17px] leading-[30px] text-white/82">
                Recovery email: <span className="font-semibold text-white">{contacts.email}</span>
                <br />
                Phone channel: <span className="font-semibold text-white">{contacts.phone}</span>
              </p>
            </div>
          </section>

          <section className="rounded-[36px] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
              Step 1
            </p>
            <h2 className="mt-4 text-3xl font-bold">Validate the primary credentials</h2>
            <p className="mt-4 text-[17px] leading-[28px] text-white/80">
              After the password is accepted, the user is redirected to the MFA step and the site
              still stays locked.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#032b59]/80 p-5">
              <p className="text-sm leading-7 text-white/75">
                Want the architecture explanation first?{' '}
                <Link href="/mfa-lab" className="font-semibold text-[#FFE492] hover:text-white">
                  Open the MFA Lab companion route
                </Link>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
