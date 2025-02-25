// src/components/dashboard/RecentExpenses.tsx
import { Expense } from '@/types';
import { format } from 'date-fns';
import { categories } from '@/lib/dummyData';

interface RecentExpensesProps {
  expenses: Expense[];
}

export default function RecentExpenses({ expenses }: RecentExpensesProps) {
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="space-y-4">
      {recentExpenses.map((expense) => {
        const category = categories.find(c => c.name === expense.category);
        
        return (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category?.color }}
              />
              <div>
                <p className="font-medium text-gray-900">{expense.description}</p>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">
                ${expense.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {format(expense.date, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}