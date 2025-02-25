// src/components/dashboard/AddExpenseButton.tsx
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import ExpenseForm from './ExpenseForm';
import { Expense } from '@/types';

interface AddExpenseButtonProps {
  onExpenseAdded: (expense: Expense) => void;
}

export default function AddExpenseButton({ onExpenseAdded }: AddExpenseButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="-ml-1 mr-2 h-5 w-5" />
        Add Expense
      </button>

      {isModalOpen && (
        <ExpenseForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(expense) => {
            onExpenseAdded(expense);
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}