// src/app/dashboard/expenses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Filter, Search, ChevronDown } from 'lucide-react';
import { Expense } from '@/types';
import { generateDummyExpenses } from '@/lib/dummyData';
import ExpenseList from '@/components/expenses/ExpenseList';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import ExpenseFilters from '@/components/expenses/ExpenseFilters';
import DateRangeFilter from '@/components/expenses/DateRangeFilter';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({ startDate: null, endDate: null });

  useEffect(() => {
    // Load expenses from localStorage or use dummy data
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      const dummyExpenses = generateDummyExpenses();
      setExpenses(dummyExpenses);
      localStorage.setItem('expenses', JSON.stringify(dummyExpenses));
    }
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesDateRange =
      (!dateRange.startDate ||
        new Date(expense.date) >= dateRange.startDate) &&
      (!dateRange.endDate ||
        new Date(expense.date) <= dateRange.endDate);

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const handleDeleteExpenses = (ids: string[]) => {
    const updatedExpenses = expenses.filter((exp) => !ids.includes(exp.id));
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const filteredAndSortedExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || expense.category === selectedCategory;
      const matchesDateRange =
        (!dateRange.startDate ||
          new Date(expense.date) >= dateRange.startDate) &&
        (!dateRange.endDate ||
          new Date(expense.date) <= dateRange.endDate);

      return matchesSearch && matchesCategory && matchesDateRange;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

    return (
        <div className="space-y-6 max-w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </button>
          </div>
    
          {/* Filters and Search Section */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="grid gap-4">
              {/* Search and Category Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                
                <ExpenseFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
    
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
                    className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transform transition-transform ${
                        sortOrder === 'asc' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
    
              {/* Date Range Filter */}
              <div className="mt-2">
                <DateRangeFilter
                  onDateRangeChange={(startDate, endDate) =>
                    setDateRange({ startDate, endDate })
                  }
                />
              </div>
            </div>
          </div>
    
          {/* Expenses List */}
          <ExpenseList
            expenses={filteredAndSortedExpenses}
            onDelete={handleDeleteExpenses}
            onUpdate={handleUpdateExpense}
          />
    
          {/* Add/Edit Expense Modal */}
          {isModalOpen && (
            <ExpenseForm
              onClose={() => setIsModalOpen(false)}
              onSubmit={(newExpense) => {
                setExpenses([newExpense, ...expenses]);
                localStorage.setItem(
                  'expenses',
                  JSON.stringify([newExpense, ...expenses])
                );
                setIsModalOpen(false);
              }}
            />
          )}
        </div>
      );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Expense
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="Search expenses..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
        
//         <ExpenseFilters
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//         />

//         <DateRangeFilter
//           onDateRangeChange={(startDate, endDate) =>
//             setDateRange({ startDate, endDate })
//           }
//         />
//       </div>

//       {/* Expenses List */}
//       <ExpenseList
//         expenses={filteredExpenses}
//         onDelete={handleDeleteExpenses}
//         onUpdate={handleUpdateExpense}
//       />

//       {/* Add/Edit Expense Modal */}
//       {isModalOpen && (
//         <ExpenseForm
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={(newExpense) => {
//             setExpenses([newExpense, ...expenses]);
//             localStorage.setItem(
//               'expenses',
//               JSON.stringify([newExpense, ...expenses])
//             );
//             setIsModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   ); 
}


// // src/app/dashboard/expenses/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Plus, Filter, Search, ChevronDown } from 'lucide-react';
// import { Expense } from '@/types';
// import { generateDummyExpenses } from '@/lib/dummyData';
// import ExpenseList from '@/components/expenses/ExpenseList';
// import ExpenseForm from '@/components/expenses/ExpenseForm';
// import ExpenseFilters from '@/components/expenses/ExpenseFilters';

// export default function ExpensesPage() {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

//   useEffect(() => {
//     // Load expenses from localStorage or use dummy data
//     const savedExpenses = localStorage.getItem('expenses');
//     if (savedExpenses) {
//       setExpenses(JSON.parse(savedExpenses));
//     } else {
//       const dummyExpenses = generateDummyExpenses();
//       setExpenses(dummyExpenses);
//       localStorage.setItem('expenses', JSON.stringify(dummyExpenses));
//     }
//   }, []);

//   const filteredExpenses = expenses
//     .filter((expense) => {
//       const matchesSearch = expense.description
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory === 'all' || expense.category === selectedCategory;
//       return matchesSearch && matchesCategory;
//     })
//     .sort((a, b) => {
//       if (sortBy === 'date') {
//         return sortOrder === 'desc'
//           ? new Date(b.date).getTime() - new Date(a.date).getTime()
//           : new Date(a.date).getTime() - new Date(b.date).getTime();
//       } else {
//         return sortOrder === 'desc'
//           ? b.amount - a.amount
//           : a.amount - b.amount;
//       }
//     });

//   const handleAddExpense = (newExpense: Expense) => {
//     const updatedExpenses = [newExpense, ...expenses];
//     setExpenses(updatedExpenses);
//     localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
//     setIsModalOpen(false);
//   };

//   const handleDeleteExpense = (expenseId: string) => {
//     const updatedExpenses = expenses.filter((exp) => exp.id !== expenseId);
//     setExpenses(updatedExpenses);
//     localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
//   };

//   const handleUpdateExpense = (updatedExpense: Expense) => {
//     const updatedExpenses = expenses.map((exp) =>
//       exp.id === updatedExpense.id ? updatedExpense : exp
//     );
//     setExpenses(updatedExpenses);
//     localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Expense
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search expenses..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>

//         <ExpenseFilters
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//         />

//         <div className="flex items-center space-x-4">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
//             className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           >
//             <option value="date">Date</option>
//             <option value="amount">Amount</option>
//           </select>
//           <button
//             onClick={() =>
//               setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
//             }
//             className="p-2 rounded-md hover:bg-gray-100"
//           >
//             <ChevronDown
//               className={`h-4 w-4 transform transition-transform ${
//                 sortOrder === 'asc' ? 'rotate-180' : ''
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Expenses List */}
//       <ExpenseList
//         expenses={filteredExpenses}
//         onDelete={handleDeleteExpense}
//         onUpdate={handleUpdateExpense}
//       />

//       {/* Add/Edit Expense Modal */}
//       {isModalOpen && (
//         <ExpenseForm
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleAddExpense}
//         />
//       )}
//     </div>
//   );
// }