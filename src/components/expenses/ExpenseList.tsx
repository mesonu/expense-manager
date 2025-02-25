// src/components/expenses/ExpenseList.tsx
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { 
  Edit2, 
  Trash2, 
  Download, 
  Image, 
  ChevronLeft, 
  ChevronRight,
  Eye
} from 'lucide-react';
import { Expense } from '@/types';
import ExpenseForm from './ExpenseForm';
import ExpenseDetail from './ExpenseDetail';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (ids: string[]) => void;
  onUpdate: (expense: Expense) => void;
}

const ITEMS_PER_PAGE = 10;

export default function ExpenseList({
  expenses,
  onDelete,
  onUpdate,
}: ExpenseListProps) {
  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set());
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [viewingExpense, setViewingExpense] = useState<Expense | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Bulk Selection
  const toggleSelectAll = () => {
    if (selectedExpenses.size === paginatedExpenses.length) {
      setSelectedExpenses(new Set());
    } else {
      setSelectedExpenses(new Set(paginatedExpenses.map(exp => exp.id)));
    }
  };

  const toggleSelectExpense = (id: string) => {
    const newSelected = new Set(selectedExpenses);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedExpenses(newSelected);
  };

  // Export selected expenses
  const exportSelected = () => {
    const selectedData = expenses.filter(exp => selectedExpenses.has(exp.id));
    const csv = [
      ['Date', 'Description', 'Category', 'Amount', 'Receipt'],
      ...selectedData.map(exp => [
        format(new Date(exp.date), 'yyyy-MM-dd'),
        exp.description,
        exp.category,
        exp.amount.toString(),
        exp.receiptUrl || 'No receipt'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses-export-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Bulk Actions */}
      {selectedExpenses.size > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-700">
            {selectedExpenses.size} items selected
          </span>
          <div className="space-x-2">
            <button
              onClick={exportSelected}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Selected
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete selected expenses?')) {
                  onDelete(Array.from(selectedExpenses));
                  setSelectedExpenses(new Set());
                }
              }}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Expenses Table */}
      {/* <div className="bg-white rounded-lg shadow overflow-hidden"> */}
        <div className="overflow-x-auto rounded-lg shadow">
            <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left">
                        <input
                        type="checkbox"
                        checked={selectedExpenses.size === paginatedExpenses.length}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receipt
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedExpenses.map((expense) => (
                    <tr key={expense.id}>
                        <td className="px-6 py-4">
                        <input
                            type="checkbox"
                            checked={selectedExpenses.has(expense.id)}
                            onChange={() => toggleSelectExpense(expense.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(expense.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${expense.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.receiptUrl && (
                            <Image className="h-4 w-4 text-gray-400" />
                        )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            onClick={() => setViewingExpense(expense)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setEditingExpense(expense)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => {
                            if (confirm('Are you sure you want to delete this expense?')) {
                                onDelete([expense.id]);
                            }
                            }}
                            className="text-red-600 hover:text-red-900"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{startIndex + 1}</span>
              {' '}to{' '}
              <span className="font-medium">
                {Math.min(startIndex + ITEMS_PER_PAGE, expenses.length)}
              </span>
              {' '}of{' '}
              <span className="font-medium">{expenses.length}</span>
              {' '}results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingExpense && (
        <ExpenseForm
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSubmit={(updatedExpense) => {
            onUpdate(updatedExpense);
            setEditingExpense(null);
          }}
        />
      )}

      {viewingExpense && (
        <ExpenseDetail
          expense={viewingExpense}
          onClose={() => setViewingExpense(null)}
        />
      )}
    </>
  );
}


// // src/components/expenses/ExpenseList.tsx
// 'use client';

// import { useState } from 'react';
// import { format } from 'date-fns';
// import { Edit2, Trash2 } from 'lucide-react';
// import { Expense } from '@/types';
// import ExpenseForm from './ExpenseForm';

// interface ExpenseListProps {
//   expenses: Expense[];
//   onDelete: (id: string) => void;
//   onUpdate: (expense: Expense) => void;
// }

// export default function ExpenseList({
//   expenses,
//   onDelete,
//   onUpdate,
// }: ExpenseListProps) {
//   const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {expenses.map((expense) => (
//               <tr key={expense.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {format(new Date(expense.date), 'MMM d, yyyy')}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {expense.description}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {expense.category}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   ${expense.amount.toFixed(2)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button
//                     onClick={() => setEditingExpense(expense)}
//                     className="text-indigo-600 hover:text-indigo-900 mr-4"
//                   >
//                     <Edit2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (confirm('Are you sure you want to delete this expense?')) {
//                         onDelete(expense.id);
//                       }
//                     }}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {editingExpense && (
//         <ExpenseForm
//           expense={editingExpense}
//           onClose={() => setEditingExpense(null)}
//           onSubmit={(updatedExpense) => {
//             onUpdate(updatedExpense);
//             setEditingExpense(null);
//           }}
//         />
//       )}
//     </>
//   );
// }