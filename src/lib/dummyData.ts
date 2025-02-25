// src/lib/dummyData.ts
import { Expense, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Food', color: '#FF6B6B' },
  { id: '2', name: 'Transportation', color: '#4ECDC4' },
  { id: '3', name: 'Entertainment', color: '#45B7D1' },
  { id: '4', name: 'Shopping', color: '#96CEB4' },
  { id: '5', name: 'Bills', color: '#FFEEAD' },
];

export const generateDummyExpenses = (): Expense[] => {
  const expenses: Expense[] = [];
  const currentDate = new Date();
  
  // Generate at least 20 expenses
  for (let i = 0; i < 20; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    expenses.push({
      id: `exp-${i + 1}`,
      amount: Math.floor(Math.random() * 200) + 10,
      description: `Expense ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)].name,
      date: date,
    });
  }
  
  // Ensure the array is not empty and sort by date
  return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
};


// // src/lib/dummyData.ts
// import { Expense, Category } from '@/types';

// export const categories: Category[] = [
//   { id: '1', name: 'Food', color: '#FF6B6B' },
//   { id: '2', name: 'Transportation', color: '#4ECDC4' },
//   { id: '3', name: 'Entertainment', color: '#45B7D1' },
//   { id: '4', name: 'Shopping', color: '#96CEB4' },
//   { id: '5', name: 'Bills', color: '#FFEEAD' },
// ];

// export const generateDummyExpenses = (): Expense[] => {
//   const expenses: Expense[] = [];
//   const currentDate = new Date();
  
//   for (let i = 0; i < 20; i++) {
//     const date = new Date(currentDate);
//     date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
//     expenses.push({
//       id: `exp-${i + 1}`,
//       amount: Math.floor(Math.random() * 200) + 10,
//       description: `Expense ${i + 1}`,
//       category: categories[Math.floor(Math.random() * categories.length)].name,
//       date: date,
//     });
//   }
  
//   return expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
// };