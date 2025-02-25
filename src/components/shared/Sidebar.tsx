// src/components/shared/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PieChart, Calendar, Settings, LogOut, BarChart } from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: Home },
//     { name: 'Expenses', href: '/dashboard/expenses', icon: PieChart },
//     { name: 'Reports', href: '/dashboard/reports', icon: Calendar },
//     { name: 'Settings', href: '/dashboard/settings', icon: Settings },
//   ];

  // Update the navigation array in src/components/shared/Sidebar.tsx

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
    { name: 'Expenses', href: '/dashboard/expenses', icon: PieChart },
    { name: 'Reports', href: '/dashboard/reports', icon: Calendar },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Expense Manager</h1>
          </div>
          <nav className="mt-6">
            <div className="px-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm font-medium rounded-md
                      ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-indigo-600' : 'text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}