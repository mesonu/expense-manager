// src/components/expenses/ExpenseFilters.tsx
'use client';

import { categories } from '@/lib/dummyData';

interface ExpenseFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ExpenseFilters({
  selectedCategory,
  onCategoryChange,
}: ExpenseFiltersProps) {
  return (
    <div className="relative">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}