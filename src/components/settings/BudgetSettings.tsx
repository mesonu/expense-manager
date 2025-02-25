// src/components/settings/BudgetSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface Budget {
  categoryId: string;
  amount: number;
  period: 'monthly' | 'yearly';
}

interface BudgetSettingsProps {
  categories: Category[];
}

export default function BudgetSettings({ categories }: BudgetSettingsProps) {
  const [budgets, setBudgets] = useState<Record<string, Budget>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    // Load saved budgets from localStorage
    const savedBudgets = localStorage.getItem('budgets');
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }
  }, []);

  const handleBudgetChange = (categoryId: string, value: number) => {
    const newBudgets = {
      ...budgets,
      [categoryId]: {
        ...budgets[categoryId],
        categoryId,
        amount: value,
        period: 'monthly',
      },
    };
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Budget Limits</h3>
        <button
          onClick={() => {
            // Save all budgets
            localStorage.setItem('budgets', JSON.stringify(budgets));
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save All
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="number"
                  value={budgets[category.id]?.amount || 0}
                  onChange={(e) =>
                    handleBudgetChange(category.id, Number(e.target.value))
                  }
                  className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
              </div>
              <select
                value={budgets[category.id]?.period || 'monthly'}
                onChange={(e) => {
                  const newBudgets = {
                    ...budgets,
                    [category.id]: {
                      ...budgets[category.id],
                      period: e.target.value as 'monthly' | 'yearly',
                    },
                  };
                  setBudgets(newBudgets);
                  localStorage.setItem('budgets', JSON.stringify(newBudgets));
                }}
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}