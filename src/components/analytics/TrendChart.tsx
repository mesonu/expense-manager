// src/components/analytics/TrendChart.tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Expense } from '@/types';
import {
  startOfWeek,
  startOfMonth,
  startOfYear,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  format,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

interface TrendChartProps {
  expenses: Expense[];
  timeframe: 'week' | 'month' | 'year';
}

export default function TrendChart({ expenses, timeframe }: TrendChartProps) {
  const getDateRange = () => {
    const now = new Date();
    switch (timeframe) {
      case 'week':
        return {
          start: subDays(now, 7),
          end: now,
          format: 'EEE',
          interval: eachDayOfInterval,
        };
      case 'month':
        return {
          start: subMonths(now, 1),
          end: now,
          format: 'MMM d',
          interval: eachWeekOfInterval,
        };
      case 'year':
        return {
          start: subYears(now, 1),
          end: now,
          format: 'MMM',
          interval: eachMonthOfInterval,
        };
    }
  };

  const { start, end, format: dateFormat, interval } = getDateRange();

  const data = interval({
    start,
    end,
  }).map((date) => {
    const periodExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfWeek(date) && expenseDate <= date;
    });

    const total = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
      date: format(date, dateFormat),
      amount: total,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Spending Trends</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}