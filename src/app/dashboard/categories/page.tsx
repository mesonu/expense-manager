'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Food & Dining',
    color: '#EF4444',
    icon: '🍽️',
    type: 'default',
  },
  {
    id: 2,
    name: 'Transportation',
    color: '#3B82F6',
    icon: '🚗',
    type: 'default',
  },
  {
    id: 3,
    name: 'Entertainment',
    color: '#10B981',
    icon: '🎮',
    type: 'default',
  },
  {
    id: 4,
    name: 'Shopping',
    color: '#F59E0B',
    icon: '🛍️',
    type: 'custom',
  },
  {
    id: 5,
    name: 'Utilities',
    color: '#8B5CF6',
    icon: '💡',
    type: 'default',
  },
  {
    id: 6,
    name: 'Healthcare',
    color: '#EC4899',
    icon: '🏥',
    type: 'default',
  },
];

export default function CategoriesPage() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<typeof categories[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowAddCategory(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <div className="flex items-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: category.color }}
              >
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">
                  {category.type === 'default' ? 'Default Category' : 'Custom Category'}
                </p>
              </div>
            </div>
            {category.type === 'custom' && (
              <div className="absolute right-2 top-2 flex space-x-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="rounded-md p-1 text-gray-400 hover:text-gray-500"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  className="rounded-md p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {(showAddCategory || editingCategory) && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={() => {
                      setShowAddCategory(false);
                      setEditingCategory(null);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={editingCategory?.name}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                          Color
                        </label>
                        <input
                          type="color"
                          name="color"
                          id="color"
                          defaultValue={editingCategory?.color}
                          className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                          Icon
                        </label>
                        <input
                          type="text"
                          name="icon"
                          id="icon"
                          defaultValue={editingCategory?.icon}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    {editingCategory ? 'Save Changes' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setShowAddCategory(false);
                      setEditingCategory(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 