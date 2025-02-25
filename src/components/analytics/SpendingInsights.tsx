// src/components/analytics/SpendingInsights.tsx
'use client';

import { Expense } from '@/types';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface SpendingInsightsProps {
  expenses: Expense[];
  timeframe: 'week' | 'month' | 'year';
}

export default function SpendingInsights({ expenses, timeframe }: SpendingInsightsProps) {
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageSpending = expenses.length > 0 ? totalSpending / expenses.length : 0;
  
  // Find highest spending category with safe handling of empty data
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals).length > 0 
    ? Object.entries(categoryTotals).reduce((a, b) => b[1] > a[1] ? b : a)
    : ['No expenses', 0];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending Insights</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Total Spending</p>
            <p className="text-xl font-semibold">${totalSpending.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Average per Transaction</p>
            <p className="text-xl font-semibold">${averageSpending.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingDown className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Highest Spending Category</p>
            <p className="text-xl font-semibold">{highestCategory[0]}</p>
            <p className="text-sm text-gray-500">
              {highestCategory[1] > 0 ? `$${highestCategory[1].toFixed(2)}` : 'No expenses'}
            </p>
          </div>
          <div className="p-3 bg-yellow-100 rounded-full">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

// // src/components/analytics/SpendingInsights.tsx
// 'use client';

// import { Expense } from '@/types';
// import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

// interface SpendingInsightsProps {
//   expenses: Expense[];
//   timeframe: 'week' | 'month' | 'year';
// }

// export default function SpendingInsights({ expenses, timeframe }: SpendingInsightsProps) {
//   const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   const averageSpending = totalSpending / expenses.length;
  
//   // Find highest spending category
//   const categoryTotals = expenses.reduce((acc, expense) => {
//     acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//     return acc;
//   }, {} as Record<string, number>);

//   const highestCategory = Object.entries(categoryTotals).reduce((a, b) => 
//     b[1] > a[1] ? b : a
//   );

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h3 className="text-lg font-semibold mb-4">Spending Insights</h3>
//       <div className="space-y-4">
//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//           <div>
//             <p className="text-sm text-gray-500">Total Spending</p>
//             <p className="text-xl font-semibold">${totalSpending.toFixed(2)}</p>
//           </div>
//           <div className="p-3 bg-blue-100 rounded-full">
//             <TrendingUp className="h-6 w-6 text-blue-600" />
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//           <div>
//             <p className="text-sm text-gray-500">Average per Transaction</p>
//             <p className="text-xl font-semibold">${averageSpending.toFixed(2)}</p>
//           </div>
//           <div className="p-3 bg-green-100 rounded-full">
//             <TrendingDown className="h-6 w-6 text-green-600" />
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//           <div>
//             <p className="text-sm text-gray-500">Highest Spending Category</p>
//             <p className="text-xl font-semibold">{highestCategory[0]}</p>
//             <p className="text-sm text-gray-500">${highestCategory[1].toFixed(2)}</p>
//           </div>
//           <div className="p-3 bg-yellow-100 rounded-full">
//             <AlertTriangle className="h-6 w-6 text-yellow-600" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }