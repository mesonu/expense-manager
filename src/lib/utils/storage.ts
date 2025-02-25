// src/lib/utils/storage.ts
export const storage = {
    saveExpenses: (expenses: any[]) => {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    },
  
    getExpenses: () => {
      return JSON.parse(localStorage.getItem('expenses') || '[]');
    },
  
    saveCategories: (categories: any[]) => {
      localStorage.setItem('categories', JSON.stringify(categories));
    },
  
    getCategories: () => {
      return JSON.parse(localStorage.getItem('categories') || '[]');
    },
  
    saveBudgets: (budgets: any) => {
      localStorage.setItem('budgets', JSON.stringify(budgets));
    },
  
    getBudgets: () => {
      return JSON.parse(localStorage.getItem('budgets') || '{}');
    },
  
    clearAll: () => {
      localStorage.clear();
    }
  };