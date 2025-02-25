// src/components/settings/DataManager.tsx
'use client';

import { useState } from 'react';
import { Download, Upload, Save, Trash2 } from 'lucide-react';

export default function DataManager() {
  const [exportStatus, setExportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Export all data
  const handleExport = () => {
    try {
      setExportStatus('loading');
      
      // Collect all data from localStorage
      const dataToExport = {
        expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
        categories: JSON.parse(localStorage.getItem('categories') || '[]'),
        budgets: JSON.parse(localStorage.getItem('budgets') || '{}'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}'),
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expense-manager-export-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 2000);
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('error');
    }
  };

  // Import data
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImportStatus('loading');
      
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validate imported data
      if (!importedData.expenses || !importedData.categories) {
        throw new Error('Invalid data format');
      }

      // Store imported data
      localStorage.setItem('expenses', JSON.stringify(importedData.expenses));
      localStorage.setItem('categories', JSON.stringify(importedData.categories));
      localStorage.setItem('budgets', JSON.stringify(importedData.budgets || {}));
      localStorage.setItem('settings', JSON.stringify(importedData.settings || {}));

      setImportStatus('success');
      setTimeout(() => {
        setImportStatus('idle');
        window.location.reload(); // Reload to reflect changes
      }, 2000);
    } catch (error) {
      console.error('Import failed:', error);
      setImportStatus('error');
    }
  };

  // Clear all data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
        <p className="text-sm text-gray-500">
          Export your data for backup or import previously exported data.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Export Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-2">Export Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Download all your expense data as a JSON file
          </p>
          <button
            onClick={handleExport}
            disabled={exportStatus === 'loading'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            {exportStatus === 'loading' ? 'Exporting...' : 'Export Data'}
          </button>
          {exportStatus === 'success' && (
            <p className="mt-2 text-sm text-green-600">Export successful!</p>
          )}
          {exportStatus === 'error' && (
            <p className="mt-2 text-sm text-red-600">Export failed. Please try again.</p>
          )}
        </div>

        {/* Import Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-2">Import Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Import previously exported data file
          </p>
          <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            {importStatus === 'loading' ? 'Importing...' : 'Import Data'}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              disabled={importStatus === 'loading'}
            />
          </label>
          {importStatus === 'success' && (
            <p className="mt-2 text-sm text-green-600">Import successful!</p>
          )}
          {importStatus === 'error' && (
            <p className="mt-2 text-sm text-red-600">Import failed. Please try again.</p>
          )}
        </div>

        {/* Clear Data Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium mb-2">Clear All Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Remove all stored data and start fresh. This action cannot be undone.
          </p>
          <button
            onClick={handleClearData}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}


// // src/components/settings/DataManagement.tsx
// 'use client';

// import { useState } from 'react';
// import { Download, Upload, Trash2 } from 'lucide-react';

// export default function DataManagement() {
//   const [isExporting, setIsExporting] = useState(false);
//   const [isImporting, setIsImporting] = useState(false);

//   const handleExport = () => {
//     setIsExporting(true);
//     try {
//       const data = {
//         expenses: localStorage.getItem('expenses'),
//         categories: localStorage.getItem('categories'),
//         budgets: localStorage.getItem('budgets'),
//         settings: localStorage.getItem('settings'),
//       };

//       const blob = new Blob([JSON.stringify(data, null, 2)], {
//         type: 'application/json',
//       });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `expense-manager-backup-${new Date().toISOString()}.json`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Export failed:', error);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setIsImporting(true);
//     try {
//       const text = await file.text();
//       const data = JSON.parse(text);

//       // Import data into localStorage
//       Object.entries(data).forEach(([key, value]) => {
//         if (value) {
//           localStorage.setItem(key, value as string);
//         }
//       });

//       // Reload the page to reflect changes
//       window.location.reload();
//     } catch (error) {
//       console.error('Import failed:', error);
//     } finally {
//       setIsImporting(false);
//     }
//   };

//   const handleReset = () => {
//     if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-900">Data Management</h3>

//       <div className="grid grid-cols-1 gap-4">
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-medium mb-2">Export Data</h4>
//           <p className="text-sm text-gray-500 mb-4">
//             Download all your expense data as a JSON file
//           </p>
//           <button
//             onClick={handleExport}
//             disabled={isExporting}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             <Download className="h-4 w-4 mr-2" />
//             {isExporting ? 'Exporting...' : 'Export Data'}
//           </button>
//         </div>

//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-medium mb-2">Import Data</h4>
//           <p className="text-sm text-gray-500 mb-4">
//             Import previously exported data
//           </p>
//           <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 cursor-pointer">
//             <Upload className="h-4 w-4 mr-2" />
//             {isImporting ? 'Importing...' : 'Import Data'}
//             <input
//               type="file"
//               accept=".json"
//               onChange={handleImport}
//               className="hidden"
//             />
//           </label>
//         </div>

//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h4 className="font-medium mb-2">Reset Data</h4>
//           <p className="text-sm text-gray-500 mb-4">
//             Clear all data and start fresh (cannot be undone)
//           </p>
//           <button
//             onClick={handleReset}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
//           >
//             <Trash2 className="h-4 w-4 mr-2" />
//             Reset All Data
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }