'use client';

import { useActionState } from 'react';

import type {
  AuditEvent,
  DeliveryPreview,
  RealSecondFactorId,
  VerifyFormState,
} from '@/lib/mfa-lab/auth-types';

import { approvePushChallenge, chooseSecondFactor, verifySecondFactor } from '../actions';

const initialState: VerifyFormState = {
  error: null,
  info: null,
};

const factorLabels: Record<RealSecondFactorId, string> = {
  totp: 'Authenticator TOTP',
  'email-otp': 'Email OTP',
  'sms-otp': 'SMS OTP',
  push: 'Push approval',
};

export default function VerifyMfaPanel({
  selectedFactor,
  availableFactors,
  maskedEmail,
  maskedPhone,
  currentTotpCode,
  totpSecret,
  otpAuthUri,
  pushApproved,
  deliveries,
  recentEvents,
}: {
  selectedFactor: RealSecondFactorId;
  availableFactors: RealSecondFactorId[];
  maskedEmail: string;
  maskedPhone: string;
  currentTotpCode: string;
  totpSecret: string;
  otpAuthUri: string;
  pushApproved: boolean;
  deliveries: DeliveryPreview[];
  recentEvents: AuditEvent[];
}) {
  const [factorState, chooseFactorAction, factorPending] = useActionState(chooseSecondFactor, initialState);
  const [verifyState, verifyAction, verifyPending] = useActionState(verifySecondFactor, initialState);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="space-y-6 rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-xl backdrop-blur">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">Step 2</p>
          <h2 className="mt-4 text-3xl font-bold text-white">Choose and complete a second factor</h2>
          <p className="mt-4 text-[17px] leading-[28px] text-white/80">
            Password alone is not enough. The session cookie is issued only after the selected
            second factor validates successfully.
          </p>
        </div>

        <div className="grid gap-3">
          {availableFactors.map((factor) => (
            <form key={factor} action={chooseFactorAction}>
              <input type="hidden" name="factor" value={factor} />
              <button
                type="submit"
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${
                  selectedFactor === factor
                    ? 'border-[#4F9CF9] bg-[#032b59] text-white'
                    : 'border-white/10 bg-white/5 text-white/85 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <span className="text-sm font-semibold">{factorLabels[factor]}</span>
                <span className="mt-2 block text-sm text-white/70">
                  {factor === 'totp'
                    ? 'Use a rotating authenticator code.'
                    : factor === 'email-otp'
                    ? `Receive a code in ${maskedEmail}.`
                    : factor === 'sms-otp'
                    ? `Receive a code by SMS to ${maskedPhone}.`
                    : 'Approve the request from the trusted-device simulator.'}
                </span>
              </button>
            </form>
          ))}
        </div>

        {factorState.error ? (
          <p className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {factorState.error}
          </p>
        ) : null}

        {factorState.info ? (
          <p className="rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-50">
            {factorState.info}
          </p>
        ) : null}
      </section>

      <section className="space-y-6 rounded-[32px] border border-white/10 bg-[#032b59]/90 p-8 shadow-xl">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
            Active method
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white">{factorLabels[selectedFactor]}</h2>
        </div>

        {selectedFactor === 'totp' ? (
          <div className="space-y-5 rounded-[28px] border border-white/10 bg-white/6 p-6">
            <p className="text-sm leading-7 text-white/78">
              Enroll this demo account in Google Authenticator or any RFC 6238 app using the
              manual secret below. For classroom reliability, the current server code is mirrored
              too, so you can verify the implementation even without a phone on hand.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Manual secret</p>
              <p className="mt-2 font-mono text-xl font-bold text-[#FFE492]">{totpSecret}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">otpauth URI</p>
              <p className="mt-2 break-all font-mono text-sm leading-6 text-white/80">{otpAuthUri}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#021d3d] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Current server code</p>
              <p className="mt-2 font-mono text-3xl font-bold tracking-[0.26em] text-[#FFE492]">
                {currentTotpCode}
              </p>
            </div>
          </div>
        ) : null}

        {(selectedFactor === 'email-otp' || selectedFactor === 'sms-otp') && deliveries.length > 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Demo delivery center</p>
            {deliveries.map((delivery) => (
              <div key={delivery.id} className="mt-4 rounded-2xl border border-white/10 bg-[#021d3d] p-4">
                <p className="text-sm font-semibold text-white">{delivery.summary}</p>
                <p className="mt-2 text-sm text-white/70">{delivery.destination}</p>
                <p className="mt-3 font-mono text-3xl font-bold tracking-[0.26em] text-[#FFE492]">
                  {delivery.code}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {selectedFactor === 'push' ? (
          <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
            <p className="text-sm leading-7 text-white/78">
              This simulates the trusted device approving a sign-in request. In a production
              platform this approval would happen in a separate app or mobile prompt.
            </p>
            <form action={approvePushChallenge} className="mt-5">
              <button
                type="submit"
                className="inline-flex rounded-2xl bg-white px-5 py-3 font-semibold text-[#043873] transition-all hover:shadow-lg"
              >
                {pushApproved ? 'Approved on trusted device' : 'Approve push request'}
              </button>
            </form>
          </div>
        ) : null}

        <form action={verifyAction} className="space-y-4">
          {selectedFactor === 'push' ? null : (
            <input
              name="code"
              type="text"
              inputMode="numeric"
              placeholder="Enter the 6-digit code"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none placeholder:text-white/45"
            />
          )}

          {verifyState.error ? (
            <p className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {verifyState.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={factorPending || verifyPending}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-5 py-4 text-lg font-semibold text-[#043873] transition-all hover:shadow-lg disabled:cursor-wait disabled:opacity-80"
          >
            {verifyPending ? 'Verifying factor...' : 'Finish secure sign-in'}
          </button>
        </form>

        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Unauthorized access alerts</p>
          <div className="mt-4 space-y-3">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div key={event.id} className="rounded-2xl border border-white/10 bg-[#021d3d] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">{event.severity}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{event.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">{event.detail}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/75">No security events recorded yet for this attempt.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
