// src/components/layouts/AuthLayout.tsx
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="px-4 py-6 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <h1 className="mt-4 text-center text-2xl font-bold text-white">
            Expense Manager
          </h1>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex min-h-screen">
        {/* Left side - Auth Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {children}
          </div>
        </div>

        {/* Right side - Image/Brand (Desktop only) */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-12">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="mx-auto"
                  priority
                />
                <h1 className="mt-6 text-4xl font-bold text-white">
                  Expense Manager
                </h1>
                <p className="mt-4 max-w-md mx-auto text-lg text-gray-200">
                  Track your expenses, manage your budget, and achieve your financial goals.
                </p>
                
                {/* Feature highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Easy Expense Tracking</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Budget Management</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Detailed Analytics</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white">Financial Reports</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}