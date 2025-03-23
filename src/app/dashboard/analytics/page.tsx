// src/app/dashboard/analytics/page.tsx
'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const spendingTrends = [
  { month: 'Jan', amount: 2500 },
  { month: 'Feb', amount: 2800 },
  { month: 'Mar', amount: 3200 },
  { month: 'Apr', amount: 2900 },
  { month: 'May', amount: 3500 },
  { month: 'Jun', amount: 3100 },
];

const categoryBreakdown = [
  { category: 'Food & Dining', amount: 1200, percentage: 35 },
  { category: 'Transportation', amount: 800, percentage: 25 },
  { category: 'Entertainment', amount: 600, percentage: 20 },
  { category: 'Shopping', amount: 400, percentage: 10 },
  { category: 'Utilities', amount: 300, percentage: 10 },
];

const insights = [
  {
    title: 'Monthly Spending Trend',
    value: '+12.5%',
    change: 'increase',
    description: 'Compared to last month',
    icon: TrendingUp,
  },
  {
    title: 'Average Daily Spending',
    value: '$85.50',
    change: 'neutral',
    description: 'Last 30 days',
    icon: Calendar,
  },
  {
    title: 'Total Savings',
    value: '$1,500',
    change: 'increase',
    description: 'This month',
    icon: DollarSign,
  },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.title}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <insight.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{insight.title}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{insight.value}</p>
              {insight.change !== 'neutral' && (
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    insight.change === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {insight.change === 'increase' ? (
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                  )}
                  <span className="sr-only">
                    {insight.change === 'increase' ? 'Increased by' : 'Decreased by'}
                  </span>
                  {insight.description}
                </p>
              )}
            </dd>
          </div>
        ))}
      </div>

      {/* Spending Trends Chart */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Spending Trends</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="h-64 flex items-end justify-between">
            {spendingTrends.map((trend) => (
              <div key={trend.month} className="flex flex-col items-center">
                <div
                  className="w-8 bg-indigo-600 rounded-t"
                  style={{ height: `${(trend.amount / 3500) * 100}%` }}
                />
                <span className="mt-2 text-sm text-gray-500">{trend.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Category Breakdown</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            {categoryBreakdown.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{category.category}</span>
                  <span className="text-gray-500">${category.amount.toFixed(2)}</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">{category.percentage}% of total spending</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// // src/app/dashboard/analytics/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Expense } from '@/types';
// import { generateDummyExpenses } from '@/lib/dummyData';
// import TrendChart from '@/components/analytics/TrendChart';
// import CategoryDistribution from '@/components/analytics/CategoryDistribution';
// import SpendingInsights from '@/components/analytics/SpendingInsights';
// import BudgetTracker from '@/components/analytics/BudgetTracker';

// export default function AnalyticsPage() {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

//   useEffect(() => {
//     setExpenses(generateDummyExpenses());
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Analytics & Insights</h2>
//         <select
//           value={timeframe}
//           onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
//           className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         >
//           <option value="week">Last Week</option>
//           <option value="month">Last Month</option>
//           <option value="year">Last Year</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <BudgetTracker expenses={expenses} />
//         <SpendingInsights expenses={expenses} timeframe={timeframe} />
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <TrendChart expenses={expenses} timeframe={timeframe} />
//         <CategoryDistribution expenses={expenses} timeframe={timeframe} />
//       </div>
//     </div>
//   );
// }