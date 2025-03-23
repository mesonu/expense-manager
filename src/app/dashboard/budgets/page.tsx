'use client';

import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

const budgets = [
  {
    id: 1,
    category: 'Food & Dining',
    amount: 500,
    spent: 350,
    period: 'Monthly',
    status: 'warning',
  },
  {
    id: 2,
    category: 'Transportation',
    amount: 200,
    spent: 150,
    period: 'Monthly',
    status: 'success',
  },
  {
    id: 3,
    category: 'Entertainment',
    amount: 300,
    spent: 280,
    period: 'Monthly',
    status: 'danger',
  },
  {
    id: 4,
    category: 'Shopping',
    amount: 400,
    spent: 200,
    period: 'Monthly',
    status: 'success',
  },
];

const categories = [
  'Food & Dining',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Healthcare',
  'Other',
];

const periods = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

export default function BudgetsPage() {
  const [showAddBudget, setShowAddBudget] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Budgets</h1>
        <button
          onClick={() => setShowAddBudget(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Budget
        </button>
      </div>

      {/* Budget Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.amount) * 100;
          return (
            <div
              key={budget.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <AlertCircle className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{budget.category}</p>
                <p className="ml-16 flex items-baseline text-sm font-semibold text-gray-900">
                  ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                </p>
              </dt>
              <dd className="ml-16 flex flex-col pb-6 sm:pb-7">
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(budget.status)}`}>
                        {budget.status === 'success' && 'On Track'}
                        {budget.status === 'warning' && 'Warning'}
                        {budget.status === 'danger' && 'Over Budget'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{budget.period}</div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        progress > 90
                          ? 'bg-red-600'
                          : progress > 75
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Add Budget Modal */}
      {showAddBudget && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={() => setShowAddBudget(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Add New Budget</h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                          Amount
                        </label>
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          step="0.01"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                          Period
                        </label>
                        <select
                          id="period"
                          name="period"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          {periods.map((period) => (
                            <option key={period} value={period}>
                              {period}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Add Budget
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowAddBudget(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 