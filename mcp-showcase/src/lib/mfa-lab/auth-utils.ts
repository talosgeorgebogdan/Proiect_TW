import { createHash, createHmac, randomInt, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';

import type { DemoUser } from './auth-types';

const COOKIE_SIGNING_SECRET = 'mfa-lab-cookie-signing-secret-2026';
const OTP_HASH_SECRET = 'mfa-lab-otp-hash-secret-2026';

function toBase64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function fromBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

export function createSignedToken(payload: object) {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = createHmac('sha256', COOKIE_SIGNING_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function readSignedToken<T>(token: string | undefined): T | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', COOKIE_SIGNING_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const left = Buffer.from(signature);
  const right = Buffer.from(expectedSignature);

  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(encodedPayload)) as T;
  } catch {
    return null;
  }
}

export function verifyPassword(user: DemoUser, password: string) {
  const derivedHash = scryptSync(password, user.passwordSalt, 64).toString('hex');
  return timingSafeEqual(Buffer.from(derivedHash, 'hex'), Buffer.from(user.passwordHash, 'hex'));
}

export function createNumericOtp() {
  return randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export function hashOtpCode(code: string) {
  return createHash('sha256').update(`${OTP_HASH_SECRET}:${code}`).digest('hex');
}

export function normalizeOtpCode(value: string) {
  return value.replace(/\D/g, '').slice(0, 6);
}

export function createAttemptId() {
  return `attempt_${randomUUID()}`;
}

export function createSessionId() {
  return `session_${randomUUID()}`;
}

function decodeBase32(secret: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const normalized = secret.toUpperCase().replace(/=+$/g, '');
  let bits = '';

  for (const char of normalized) {
    const index = alphabet.indexOf(char);
    if (index === -1) {
      throw new Error('Invalid TOTP secret.');
    }

    bits += index.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let bitIndex = 0; bitIndex + 8 <= bits.length; bitIndex += 8) {
    bytes.push(Number.parseInt(bits.slice(bitIndex, bitIndex + 8), 2));
  }

  return Buffer.from(bytes);
}

export function generateTotpCode(secret: string, timestamp = Date.now()) {
  const counter = Math.floor(timestamp / 30_000);
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigUInt64BE(BigInt(counter));

  const hmac = createHmac('sha1', decodeBase32(secret)).update(counterBuffer).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return (binary % 1_000_000).toString().padStart(6, '0');
}

export function verifyTotpCode(secret: string, code: string) {
  const normalizedCode = normalizeOtpCode(code);

  for (const offset of [-1, 0, 1]) {
    const generated = generateTotpCode(secret, Date.now() + offset * 30_000);
    if (generated === normalizedCode) {
      return true;
    }
  }

  return false;
}

export function buildOtpAuthUri(user: DemoUser) {
  const account = encodeURIComponent(user.email);
  const issuer = encodeURIComponent('MCP Hub MFA Lab');
  return `otpauth://totp/${issuer}:${account}?secret=${user.totpSecret}&issuer=${issuer}&digits=6&period=30`;
}

export function maskEmailAddress(email: string) {
  const [localPart, domain] = email.split('@');
  const safeLocal = `${localPart.slice(0, 2)}${'*'.repeat(Math.max(localPart.length - 2, 1))}`;
  return `${safeLocal}@${domain}`;
}

export function maskPhoneNumber(phoneNumber: string) {
  const digits = phoneNumber.replace(/\s+/g, '');
  return `${digits.slice(0, 4)} ${'*'.repeat(Math.max(digits.length - 7, 3))}${digits.slice(-3)}`;
}
