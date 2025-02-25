// src/components/expenses/ExpenseForm.tsx
'use client';

import { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Expense } from '@/types';
import { categories } from '@/lib/dummyData';

interface ExpenseFormProps {
  expense?: Expense;
  onClose: () => void;
  onSubmit: (expense: Expense) => void;
}

export default function ExpenseForm({
  expense,
  onClose,
  onSubmit,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || categories[0].name,
    date: expense?.date
      ? new Date(expense.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    notes: expense?.notes || '',
  });

  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>(expense?.receiptUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceipt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let receiptUrl = expense?.receiptUrl || '';

    // In a real application, you would upload the receipt to a storage service
    // and get back a URL. For this example, we'll use the data URL
    if (receipt) {
      receiptUrl = receiptPreview;
    }

    onSubmit({
      id: expense?.id || `exp-${Date.now()}`,
      description: formData.description,
      amount: Number(formData.amount),
      category: formData.category,
      date: new Date(formData.date),
      notes: formData.notes,
      receiptUrl,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {expense ? 'Edit Expense' : 'Add Expense'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receipt
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Receipt
              </button>
            </div>
            {receiptPreview && (
              <div className="mt-2">
                <div className="relative">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="max-h-32 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setReceipt(null);
                      setReceiptPreview('');
                    }}
                    className="absolute top-0 right-0 -mt-2 -mr-2 p-1 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {expense ? 'Update' : 'Add'} Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// // src/components/expenses/ExpenseForm.tsx
// 'use client';

// import { useState } from 'react';
// import { X } from 'lucide-react';
// import { Expense } from '@/types';
// import { categories } from '@/lib/dummyData';

// interface ExpenseFormProps {
//   expense?: Expense;
//   onClose: () => void;
//   onSubmit: (expense: Expense) => void;
// }

// export default function ExpenseForm({
//   expense,
//   onClose,
//   onSubmit,
// }: ExpenseFormProps) {
//   const [formData, setFormData] = useState({
//     description: expense?.description || '',
//     amount: expense?.amount || '',
//     category: expense?.category || categories[0].name,
//     date: expense?.date
//       ? new Date(expense.date).toISOString().split('T')[0]
//       : new Date().toISOString().split('T')[0],
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       id: expense?.id || `exp-${Date.now()}`,
//       description: formData.description,
//       amount: Number(formData.amount),
//       category: formData.category,
//       date: new Date(formData.date),
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-medium text-gray-900">
//             {expense ? 'Edit Expense' : 'Add Expense'}
//           </h3>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Description
//             </label>
//             <input
//               type="text"
//               id="description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="amount"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Amount
//             </label>
//             <input
//               type="number"
//               id="amount"
//               step="0.01"
//               value={formData.amount}
//               onChange={(e) =>
//                 setFormData({ ...formData, amount: e.target.value })
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="category"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Category
//             </label>
//             <select
//               id="category"
//               value={formData.category}
//               onChange={(e) =>
//                 setFormData({ ...formData, category: e.target.value })
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             >
//               {categories.map((category) => (
//                 <option key={category.id} value={category.name}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="date"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Date
//             </label>
//             <input
//               type="date"
//               id="date"
//               value={formData.date}
//               onChange={(e) =>
//                 setFormData({ ...formData, date: e.target.value })
//               }
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
//             >
//               {expense ? 'Update' : 'Add'} Expense
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }