import type { Metadata } from 'next';
import Link from 'next/link';

import SiteHeader from '../SiteHeader';
import { getPortalSummary, signOut } from '../login/actions';
import { requireAuthenticatedSession } from '@/lib/mfa-lab/auth';

export const metadata: Metadata = {
  title: 'Secure Portal | MCP Hub MFA',
  description: 'Protected page accessible only after password plus MFA verification.',
};

export default async function SecurePortalPage() {
  const session = await requireAuthenticatedSession();
  const summary = await getPortalSummary();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#043873] font-sans text-white">
      <SiteHeader currentPage="mfa" cta={{ href: '/mfa-lab', label: 'Explain The Architecture' }} />

      <main className="px-8 py-16 lg:px-[220px] lg:py-[110px]">
        <div className="mx-auto max-w-[1220px] space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
                Protected route unlocked with real MFA
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight md:text-[62px]">
                  Secure portal access granted.
                </h1>
                <p className="max-w-[760px] text-[18px] leading-[30px] text-white/82">
                  This page can only be reached after the password and a second factor are both
                  validated. It is the concrete proof that the branch now has a working MFA gate.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                    Authenticated user
                  </p>
                  <p className="mt-4 text-xl font-semibold text-white">{session.email}</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                    Completed factors
                  </p>
                  <p className="mt-4 text-xl font-semibold capitalize text-[#FFE492]">
                    {session.completedFactors.join(', ')}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-xl">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                Demo evidence
              </p>
              <div className="mt-5 space-y-4 text-[17px] leading-[28px] text-white/82">
                <p>
                  Session cookies are created only after MFA success and are marked `httpOnly`
                  with `sameSite=lax`.
                </p>
                <p>
                  The route is server-protected, so direct navigation without a valid session
                  redirects back to the login flow.
                </p>
                <p>
                  The authenticator enrollment URI is ready for Google Authenticator:
                  <span className="mt-3 block break-all rounded-2xl border border-white/10 bg-[#032b59]/90 p-4 font-mono text-sm">
                    {summary.totpSetupUri}
                  </span>
                </p>
              </div>

              <form action={signOut} className="mt-8">
                <button
                  type="submit"
                  className="inline-flex rounded-2xl bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-5 py-4 text-lg font-semibold text-[#043873] transition-all hover:shadow-lg"
                >
                  Sign out
                </button>
              </form>
            </section>
          </div>

          <section className="rounded-[32px] border border-white/10 bg-[#032b59]/90 p-8 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                  Unauthorized access alerting
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">Recent security events</h2>
              </div>
              <Link href="/login" className="text-sm font-semibold text-[#FFE492] hover:text-white">
                Start another sign-in attempt
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {summary.recentEvents.map((event) => (
                <article key={event.id} className="rounded-2xl border border-white/10 bg-white/6 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">{event.severity}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{event.title}</p>
                  <p className="mt-3 text-sm leading-6 text-white/75">{event.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
