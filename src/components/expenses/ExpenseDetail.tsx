// src/components/expenses/ExpenseDetail.tsx
'use client';

import { format } from 'date-fns';
import { X, Download, ExternalLink } from 'lucide-react';
import { Expense } from '@/types';

interface ExpenseDetailProps {
  expense: Expense;
  onClose: () => void;
}

export default function ExpenseDetail({ expense, onClose }: ExpenseDetailProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Expense Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Date</h4>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(expense.date), 'MMMM d, yyyy')}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Amount</h4>
              <p className="mt-1 text-sm text-gray-900">
                ${expense.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Category</h4>
              <p className="mt-1 text-sm text-gray-900">
                {expense.category}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <p className="mt-1 text-sm text-gray-900">
                {expense.status || 'Completed'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1 text-sm text-gray-900">
              {expense.description}
            </p>
          </div>

          {expense.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Notes</h4>
              <p className="mt-1 text-sm text-gray-900">
                {expense.notes}
              </p>
            </div>
          )}

          {expense.receiptUrl && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Receipt</h4>
              <div className="mt-2">
                <img
                  src={expense.receiptUrl}
                  alt="Receipt"
                  className="max-w-full h-auto rounded-lg shadow"
                />
                <div className="mt-2 flex space-x-2">
                  <a
                    href={expense.receiptUrl}
                    download
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                  <a
                    href={expense.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}