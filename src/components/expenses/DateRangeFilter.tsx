// src/components/expenses/DateRangeFilter.tsx
'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { format, isValid } from 'date-fns';

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

export default function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);

    const parsedStartDate = start ? new Date(start) : null;
    const parsedEndDate = end ? new Date(end) : null;

    if (parsedStartDate && parsedEndDate && isValid(parsedStartDate) && isValid(parsedEndDate)) {
      onDateRangeChange(parsedStartDate, parsedEndDate);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="text-sm font-medium text-gray-700">Date Range:</div>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleDateChange(e.target.value, endDate)}
            className="block w-full sm:w-auto pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <span className="text-gray-500">to</span>
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => handleDateChange(startDate, e.target.value)}
            className="block w-full sm:w-auto pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

// // src/components/expenses/DateRangeFilter.tsx
// 'use client';

// import { useState } from 'react';
// import { Calendar } from 'lucide-react';
// import { format, isValid } from 'date-fns';

// interface DateRangeFilterProps {
//   onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
// }

// export default function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');

//   const handleDateChange = (start: string, end: string) => {
//     setStartDate(start);
//     setEndDate(end);

//     const parsedStartDate = start ? new Date(start) : null;
//     const parsedEndDate = end ? new Date(end) : null;

//     if (parsedStartDate && parsedEndDate && isValid(parsedStartDate) && isValid(parsedEndDate)) {
//       onDateRangeChange(parsedStartDate, parsedEndDate);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Calendar className="h-4 w-4 text-gray-400" />
//         </div>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => handleDateChange(e.target.value, endDate)}
//           className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       </div>
//       <span className="text-gray-500">to</span>
//       <div className="relative">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Calendar className="h-4 w-4 text-gray-400" />
//         </div>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => handleDateChange(startDate, e.target.value)}
//           className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       </div>
//     </div>
//   );
// }