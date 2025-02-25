// src/types/index.ts
export type Expense = {
    id: string;
    amount: number;
    description: string;
    category: string;
    date: Date;
  };
  
  export type Category = {
    id: string;
    name: string;
    color: string;
  };
  
  export type MonthlyReport = {
    month: string;
    total: number;
    categories: {
      name: string;
      amount: number;
    }[];
  };

  // src/types/index.ts
export interface Category {
    id: string;
    name: string;
    color: string;
  }