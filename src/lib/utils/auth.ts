// src/lib/utils/auth.ts
import { createHash, randomBytes } from 'crypto';
import { sendMail } from './email';

export async function generateToken(length: number = 32): Promise<string> {
  const buffer = randomBytes(length);
  return buffer.toString('hex');
}

export async function generateOTP(length: number = 6): Promise<string> {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export async function hashToken(token: string): Promise<string> {
  return createHash('sha256')
    .update(token)
    .digest('hex');
}

export async function sendVerificationEmail(
  email: string | undefined,
  token: string
): Promise<void> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  
  const html = `
    <h1>Verify your email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
    <p>If you didn't request this email, you can safely ignore it.</p>
  `;

  await sendMail({
    to: email,
    subject: 'Verify your email address',
    html,
  });
}

export async function sendOTP(email: string, otp: string): Promise<void> {
  const html = `
    <h1>Your OTP Code</h1>
    <p>Your OTP code is: <strong>${otp}</strong></p>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn't request this code, you can safely ignore this email.</p>
  `;

  await sendMail({
    to: email,
    subject: 'Your OTP Code',
    html,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  const html = `
    <h1>Reset your password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>If you didn't request this email, you can safely ignore it.</p>
    <p>This link will expire in 1 hour.</p>
  `;

  await sendMail({
    to: email,
    subject: 'Reset your password',
    html,
  });
}