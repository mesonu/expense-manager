// src/components/analytics/BudgetTracker.tsx
'use client';

import { Expense } from '@/types';
import { categories } from '@/lib/dummyData';

interface BudgetTrackerProps {
  expenses: Expense[];
}

// Dummy budget limits
const CATEGORY_BUDGETS = {
  Food: 500,
  Transportation: 300,
  Entertainment: 200,
  Shopping: 400,
  Bills: 1000,
};

export default function BudgetTracker({ expenses }: BudgetTrackerProps) {
  const categoryTotals = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0);

    const budget = CATEGORY_BUDGETS[category.name as keyof typeof CATEGORY_BUDGETS] || 0;
    const percentage = (total / budget) * 100;

    return {
      name: category.name,
      total,
      budget,
      percentage,
      color: category.color,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Budget Tracker</h3>
      <div className="space-y-4">
        {categoryTotals.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{category.name}</span>
              <span className="text-gray-500">
                ${category.total.toFixed(2)} / ${category.budget}
              </span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded">
              <div
                className="absolute h-full rounded"
                style={{
                  width: `${Math.min(category.percentage, 100)}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
            {category.percentage > 90 && (
              <p className="text-xs text-red-500">
                Warning: Near or exceeding budget limit
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}