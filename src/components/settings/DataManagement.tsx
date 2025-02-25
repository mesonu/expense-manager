// src/components/settings/DataManagement.tsx
'use client';

import { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';

export default function DataManagement() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    try {
      const data = {
        expenses: localStorage.getItem('expenses'),
        categories: localStorage.getItem('categories'),
        budgets: localStorage.getItem('budgets'),
        settings: localStorage.getItem('settings'),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `expense-manager-backup-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Import data into localStorage
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          localStorage.setItem(key, value as string);
        }
      });

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Data Management</h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Export Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Download all your expense data as a JSON file
          </p>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Import Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Import previously exported data
          </p>
          <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            {isImporting ? 'Importing...' : 'Import Data'}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Reset Data</h4>
          <p className="text-sm text-gray-500 mb-4">
            Clear all data and start fresh (cannot be undone)
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}