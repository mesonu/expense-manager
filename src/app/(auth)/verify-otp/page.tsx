// src/app/auth/verify-otp/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { OTPVerificationForm } from '@/components/auth/OTPVerificationForm';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function VerifyOTPPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <AuthLayout>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the OTP sent to {email}
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <OTPVerificationForm email={email || ''} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}