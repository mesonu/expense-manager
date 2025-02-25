// src/components/analytics/ExpensePredictions.tsx
'use client';

import { Expense } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { addMonths, format } from 'date-fns';

interface ExpensePredictionsProps {
  expenses: Expense[];
}

export default function ExpensePredictions({ expenses }: ExpensePredictionsProps) {
  // Calculate average monthly spending
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = format(new Date(expense.date), 'yyyy-MM');
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const averageMonthly = Object.values(monthlyTotals).reduce((a, b) => a + b, 0) / 
    Object.keys(monthlyTotals).length;

  // Generate prediction data
  const currentDate = new Date();
  const predictionData = Array.from({ length: 6 }).map((_, index) => {
    const date = addMonths(currentDate, index);
    return {
      date: format(date, 'MMM yyyy'),
      predicted: averageMonthly * (1 + index * 0.02), // Assume 2% monthly increase
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Expense Predictions</h3>
      <p className="text-sm text-gray-500 mb-4">
        Based on your spending patterns, here's a 6-month prediction
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Predicted average monthly expense: ${averageMonthly.toFixed(2)}
        </p>
      </div>
    </div>
  );
}