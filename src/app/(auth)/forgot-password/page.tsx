// src/app/auth/forgot-password/page.tsx
'use client';

import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}