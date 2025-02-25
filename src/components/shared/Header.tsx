// src/components/shared/Header.tsx
'use client';

import { useAuth } from '@/lib/auth/authContext';
import { Bell } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between h-16 px-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.[0]}
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700">{user?.name}</div>
          </div>
        </div>
      </div>
    </header>
  );
}