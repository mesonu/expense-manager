// src/app/dashboard/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { generateDummyExpenses } from '@/lib/dummyData';
import TrendChart from '@/components/analytics/TrendChart';
import CategoryDistribution from '@/components/analytics/CategoryDistribution';
import SpendingInsights from '@/components/analytics/SpendingInsights';
import BudgetTracker from '@/components/analytics/BudgetTracker';
import ExpensePredictions from '@/components/analytics/ExpensePredictions';

export default function AnalyticsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExpenses(generateDummyExpenses());
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analytics & Insights</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetTracker expenses={expenses} />
        <SpendingInsights expenses={expenses} timeframe={timeframe} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TrendChart expenses={expenses} timeframe={timeframe} />
        <CategoryDistribution expenses={expenses} timeframe={timeframe} />
        <ExpensePredictions expenses={expenses} />
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