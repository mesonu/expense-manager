// src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  PiggyBank,
  Calendar,
} from 'lucide-react';

const stats = [
  {
    name: 'Total Expenses',
    value: '$2,500',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
  },
  {
    name: 'Monthly Budget',
    value: '$4,000',
    change: 'On Track',
    changeType: 'neutral',
    icon: CreditCard,
  },
  {
    name: 'Savings',
    value: '$1,500',
    change: '+8.2%',
    changeType: 'increase',
    icon: PiggyBank,
  },
  {
    name: 'Recurring Expenses',
    value: '$800',
    change: 'Next: Rent',
    changeType: 'neutral',
    icon: Calendar,
  },
];

const recentExpenses = [
  {
    id: 1,
    description: 'Grocery Shopping',
    amount: 120.50,
    date: '2024-03-15',
    category: 'Food',
  },
  {
    id: 2,
    description: 'Netflix Subscription',
    amount: 15.99,
    date: '2024-03-14',
    category: 'Entertainment',
  },
  {
    id: 3,
    description: 'Gas',
    amount: 45.00,
    date: '2024-03-13',
    category: 'Transportation',
  },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : stat.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                ) : stat.changeType === 'decrease' ? (
                  <ArrowDownRight className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                ) : null}
                <span className="sr-only">
                  {stat.changeType === 'increase' ? 'Increased by' : stat.changeType === 'decrease' ? 'Decreased by' : ''}
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Expenses */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Expenses</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentExpenses.map((expense) => (
              <li key={expense.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">{expense.description}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {expense.category}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900">${expense.amount.toFixed(2)}</p>
                    <p className="ml-2 text-sm text-gray-500">{expense.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import ExpenseList from "@/components/ExpenseList";
// import ExpenseChart from "@/components/ExpenseChart";
// import AddExpenseButton from "@/components/AddExpenseButton";
// import { prisma } from "@/lib/prisma";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/auth/signin");
//   }

//   // Fetch expenses for the current month
//   const currentDate = new Date();
//   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//   const expenses = await prisma.expense.findMany({
//     where: {
//       userId: session.user.id,
//       date: {
//         gte: startOfMonth,
//         lte: endOfMonth,
//       },
//     },
//     include: {
//       category: true,
//     },
//     orderBy: {
//       date: 'desc',
//     },
//   });

//   const categories = await prisma.category.findMany({
//     where: {
//       userId: session.user.id,
//     },
//   });

//   const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Expense Dashboard</h1>
//         <AddExpenseButton categories={categories} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
//           <ExpenseChart expenses={expenses} />
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
//           <ExpenseList expenses={expenses} />
//         </div>
//       </div>

//       <div className="mt-8 bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Total Expenses</h3>
//             <p className="text-2xl font-bold text-blue-600">
//               ${totalExpenses.toFixed(2)}
//             </p>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Categories</h3>
//             <p className="text-2xl font-bold text-green-600">
//               {categories.length}
//             </p>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Transactions</h3>
//             <p className="text-2xl font-bold text-purple-600">
//               {expenses.length}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }