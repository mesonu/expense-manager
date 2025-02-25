// src/components/dashboard/ExpenseSummary.tsx
import { Expense } from '@/types';
import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate this month's expenses
  const currentMonth = new Date().getMonth();
  const thisMonthExpenses = expenses
    .filter(expense => expense.date.getMonth() === currentMonth)
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate last month's expenses for comparison
  const lastMonthExpenses = expenses
    .filter(expense => expense.date.getMonth() === currentMonth - 1)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthlyChange = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <h3 className="text-xl font-semibold text-gray-900">
              ${totalExpenses.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">This Month</p>
            <h3 className="text-xl font-semibold text-gray-900">
              ${thisMonthExpenses.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${monthlyChange >= 0 ? 'bg-red-100' : 'bg-green-100'}`}>
            {monthlyChange >= 0 ? (
              <TrendingUp className="h-6 w-6 text-red-600" />
            ) : (
              <TrendingDown className="h-6 w-6 text-green-600" />
            )}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Monthly Change</p>
            <h3 className="text-xl font-semibold text-gray-900">
              {monthlyChange.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}