// src/components/ui/Notification.tsx
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-x-4 rounded-lg bg-white p-4 shadow-lg">
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-400" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400" />
      )}
      <p className="text-sm font-medium text-gray-900">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}