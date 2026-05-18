'use client';

import { useActionState } from 'react';

import type { LoginFormState } from '@/lib/mfa-lab/auth-types';

import { beginPasswordSignIn } from './actions';

const initialState: LoginFormState = {
  error: null,
  email: 'student@mcp-hub.local',
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(beginPasswordSignIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-[#C4DEFD]">
          Demo account email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.email}
          autoComplete="username"
          className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none placeholder:text-white/45"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-[#C4DEFD]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="DemoPassword!2026"
          autoComplete="current-password"
          className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-white outline-none placeholder:text-white/45"
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-5 py-4 text-lg font-semibold text-[#043873] transition-all hover:shadow-lg hover:shadow-[#FFE492]/40 disabled:cursor-wait disabled:opacity-80"
      >
        {isPending ? 'Checking password...' : 'Continue to MFA'}
      </button>
    </form>
  );
}
