// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { generateDummyExpenses } from '@/lib/dummyData';
import ExpenseSummary from '@/components/dashboard/ExpenseSummary';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import AddExpenseButton from '@/components/dashboard/AddExpenseButton';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(generateDummyExpenses());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
        <AddExpenseButton onExpenseAdded={(newExpense) => 
          setExpenses([newExpense, ...expenses])} 
        />
      </div>

      <ExpenseSummary expenses={expenses} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Breakdown</h3>
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <RecentExpenses expenses={expenses} />
        </div>
      </div>
    </div>
  );
}


// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import ExpenseList from "@/components/ExpenseList";
// import ExpenseChart from "@/components/ExpenseChart";
// import AddExpenseButton from "@/components/AddExpenseButton";
// import { prisma } from "@/lib/prisma";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/auth/signin");
//   }

//   // Fetch expenses for the current month
//   const currentDate = new Date();
//   const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//   const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

//   const expenses = await prisma.expense.findMany({
//     where: {
//       userId: session.user.id,
//       date: {
//         gte: startOfMonth,
//         lte: endOfMonth,
//       },
//     },
//     include: {
//       category: true,
//     },
//     orderBy: {
//       date: 'desc',
//     },
//   });

//   const categories = await prisma.category.findMany({
//     where: {
//       userId: session.user.id,
//     },
//   });

//   const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Expense Dashboard</h1>
//         <AddExpenseButton categories={categories} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
//           <ExpenseChart expenses={expenses} />
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
//           <ExpenseList expenses={expenses} />
//         </div>
//       </div>

//       <div className="mt-8 bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Monthly Summary</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Total Expenses</h3>
//             <p className="text-2xl font-bold text-blue-600">
//               ${totalExpenses.toFixed(2)}
//             </p>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Categories</h3>
//             <p className="text-2xl font-bold text-green-600">
//               {categories.length}
//             </p>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <h3 className="text-lg font-medium">Transactions</h3>
//             <p className="text-2xl font-bold text-purple-600">
//               {expenses.length}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }