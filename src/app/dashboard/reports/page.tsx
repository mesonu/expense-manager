// src/app/dashboard/reports/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { generateDummyExpenses } from '@/lib/dummyData';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachMonthOfInterval, 
  subMonths 
} from 'date-fns';
import { Download, Search, Filter } from 'lucide-react';

export default function ReportsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setExpenses(generateDummyExpenses());
  }, []);

  // Filter expenses based on search term and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const expenseDate = new Date(expense.date);
    const matchesMonth = expenseDate >= startOfMonth(selectedMonth) &&
                        expenseDate <= endOfMonth(selectedMonth);
    
    return matchesSearch && matchesCategory && matchesMonth;
  });

  const monthlyTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const csvData = filteredExpenses.map(expense => [
      format(new Date(expense.date), 'yyyy-MM-dd'),
      expense.description,
      expense.category,
      expense.amount
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses-${format(selectedMonth, 'yyyy-MM')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Report</h2>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <select
            value={selectedMonth.toISOString()}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {eachMonthOfInterval({
              start: subMonths(new Date(), 11),
              end: new Date(),
            }).map((month) => (
              <option key={month.toISOString()} value={month.toISOString()}>
                {format(month, 'MMMM yyyy')}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(expenses.map(e => e.category))).map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Summary for {format(selectedMonth, 'MMMM yyyy')}
        </h3>
        <p className="text-3xl font-bold text-indigo-600">
          ${monthlyTotal.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {filteredExpenses.length} transactions
        </p>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... (previous table code remains the same) ... */}
        </table>
      </div>
    </div>
  );
}