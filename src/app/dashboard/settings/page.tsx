// src/app/dashboard/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { Category } from '@/types';
import { categories as initialCategories } from '@/lib/dummyData';
// import CategorySettings from '@/components/settings/CategorySettings';
import BudgetSettings from '@/components/settings/BudgetSettings';
import DataManagement from '@/components/settings/DataManagement';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  
  const tabs = [
    // { name: 'Categories', component: CategorySettings },
    { name: 'Budgets', component: BudgetSettings },
    { name: 'Data Management', component: DataManagement },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

      <div className="bg-white rounded-lg shadow">
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'px-6 py-3 text-sm font-medium',
                    selected
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="p-6">
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx}>
                <tab.component categories={categories} setCategories={setCategories} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

// // src/app/dashboard/settings/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Plus, Edit2, Trash2 } from 'lucide-react';
// import { Category } from '@/types';
// import { categories as initialCategories } from '@/lib/dummyData';

// export default function SettingsPage() {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
//         <button
//           onClick={() => {
//             setEditingCategory(null);
//             setIsModalOpen(true);
//           }}
//           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Category
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">
//             Expense Categories
//           </h3>
//           <div className="grid grid-cols-1 gap-4">
//             {categories.map((category) => (
//               <div
//                 key={category.id}
//                 className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//               >
//                 <div className="flex items-center space-x-3">
//                   <div
//                     className="w-4 h-4 rounded-full"
//                     style={{ backgroundColor: category.color }}
//                   />
//                   <span className="text-gray-900">{category.name}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => {
//                       setEditingCategory(category);
//                       setIsModalOpen(true);
//                     }}
//                     className="p-2 text-gray-400 hover:text-gray-500"
//                   >
//                     <Edit2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       if (confirm('Are you sure you want to delete this category?')) {
//                         setCategories(categories.filter(c => c.id !== category.id));
//                       }
//                     }}
//                     className="p-2 text-gray-400 hover:text-red-500"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <CategoryModal
//           category={editingCategory}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingCategory(null);
//           }}
//           onSave={(category) => {
//             if (editingCategory) {
//               setCategories(categories.map(c => 
//                 c.id === category.id ? category : c
//               ));
//             } else {
//               setCategories([...categories, {
//                 ...category,
//                 id: `cat-${Date.now()}`
//               }]);
//             }
//             setIsModalOpen(false);
//             setEditingCategory(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// function CategoryModal({ 
//   category, 
//   onClose, 
//   onSave 
// }: { 
//   category: Category | null;
//   onClose: () => void;
//   onSave: (category: Category) => void;
// }) {
//   const [formData, setFormData] = useState({
//     name: category?.name || '',
//     color: category?.color || '#000000'
//   });

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
//       <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">
//           {category ? 'Edit Category' : 'Add Category'}
//         </h3>
//         <form onSubmit={(e) => {
//           e.preventDefault();
//           onSave({
//             id: category?.id || '',
//             ...formData
//           });
//         }}>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Color
//               </label>
//               <input
//                 type="color"
//                 value={formData.color}
//                 onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end space-x-3">
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
//               {category ? 'Update' : 'Add'} Category
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }