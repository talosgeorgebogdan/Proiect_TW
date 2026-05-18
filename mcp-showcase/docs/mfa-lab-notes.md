# MFA Secure Access Lab Notes

## Project Direction

Working title:
- `MFA Secure Access Lab`
- `Secure Access and MFA Alerting Demo`

Branch:
- `mfa-lab`

## Teacher Requirement Mapping

Target idea from the project sheet:
- `Sistem de autentificare cu factori multipli (MFA) si sistem de alertare a accesului neautorizat)`

Key requirement to satisfy:
- password plus generated code
- at least 5 distinct methods
- integrated into a web platform
- include unauthorized access alerting

## Planned MFA Methods

The route should clearly present at least five methods:
- Password
- TOTP / Authenticator code
- Email OTP
- SMS OTP
- Push approval
- FIDO2 / WebAuthn passkey
- Biometric verification

This gives us more than the minimum and lets us explain tradeoffs between methods.

## Intended Route Shape

Suggested route:
- `src/app/mfa-lab/page.tsx`

Suggested supporting files:
- `src/app/mfa-lab/MfaLabExperience.tsx`
- `src/lib/mfa-lab/types.ts`
- `src/lib/mfa-lab/data.ts`
- `src/lib/mfa-lab/engine.ts`

## Implementation Goals

The route should function as an interactive educational simulator, not just static text.

It should show:
- a secure access overview
- supported MFA methods
- login scenarios with different risk levels
- a step-based authentication flow
- generated OTP-style codes
- alerting for suspicious or unauthorized access
- a security score or policy strength summary

## Documentation Reminders

Capture during implementation:
- why MFA was chosen
- which methods were included and why
- how unauthorized access is detected
- what parts are simulated versus real-world
- screenshots for the report and final presentation

## Current Status

- branch created from `main`
- presentation route implemented at `/mfa-lab`
- real authentication flow implemented at `/login`, `/login/verify`, and `/secure-portal`

## Functional MFA Architecture

The branch now contains two layers:

- explanatory route:
  - `/mfa-lab`
  - used for the presentation, factor comparison, and security explanation
- real working flow:
  - `/login`
  - `/login/verify`
  - `/secure-portal`

## Implemented Working MFA Flow

The website now performs:

- server-side password validation
- mandatory second-factor verification before access
- secure session cookie issuance only after MFA success
- protected route redirect when the user is not fully authenticated
- logging of suspicious or failed sign-in events

## Working Second Factors In The Site

Implemented and usable in the actual website flow:

- Password
- TOTP / Authenticator
- Email OTP
- SMS OTP
- Push approval

Additional methods still presented in the explanatory route:

- FIDO2 / WebAuthn
- Biometric verification

This keeps the project aligned with the course requirement of at least 5 distinct methods while
also keeping the implementation realistic for a local academic environment.

## Security Decisions

The implementation deliberately uses:

- server-side credential checking
- `httpOnly` session cookies
- `sameSite=lax` cookies
- signed cookie payloads
- TOTP verification with a 30 second window and small drift tolerance
- audit logging for failed password and second-factor attempts

## Demo Constraints And Honest Explanation

What is fully real:

- password checking
- TOTP code verification
- OTP code generation and validation logic
- push approval state handling
- protected route session enforcement

What is locally simulated because no external gateway is configured:

- email delivery
- SMS delivery
- mobile push transport

The logic is still functional, but the delivery channel is surfaced in a demo outbox on the page so
the flow can be verified live during the presentation.

## Demo Credentials

Current demo account:

- email: `student@mcp-hub.local`
- password: `DemoPassword!2026`
- TOTP secret: `JBSWY3DPEHPK3PXP`

The TOTP secret can be enrolled manually in Google Authenticator before the presentation.

## Files Added For Real MFA

- `src/app/login/page.tsx`
- `src/app/login/LoginForm.tsx`
- `src/app/login/actions.ts`
- `src/app/login/verify/page.tsx`
- `src/app/login/verify/VerifyMfaPanel.tsx`
- `src/app/secure-portal/page.tsx`
- `src/lib/mfa-lab/auth.ts`
- `src/lib/mfa-lab/auth-utils.ts`
- `src/lib/mfa-lab/auth-store.ts`
- `src/lib/mfa-lab/auth-types.ts`

## Presentation Points To Emphasize

- `/mfa-lab` is the explanatory route
- `/login` is the actual functional implementation
- access to `/secure-portal` proves the MFA gate is real
- unauthorized attempts generate visible security events
- TOTP is the strongest fully local and realistic factor in the current branch

## Screenshot Checklist

- login page with credentials
- MFA verification page with factor switching
- TOTP setup secret / current code panel
- email or SMS demo delivery center
- push approval interaction
- protected portal after successful MFA
- recent security events section
