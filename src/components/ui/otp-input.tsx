// src/components/ui/otp-input.tsx
'use client';

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  numInputs?: number;
  renderInput?: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
  className?: string;
}

export function OTPInput({
  value,
  onChange,
  numInputs = 6,
  renderInput,
  className,
}: OTPInputProps) {
  const valueArray = useMemo(() => value.split(''), [value]);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    if (targetInput) {
      targetInput.focus();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = event.target.value;
    if (!/^\d*$/.test(newValue)) return;

    const newValueArray = [...valueArray];
    newValueArray[index] = newValue.slice(-1);
    onChange(newValueArray.join(''));

    if (newValue && index < numInputs - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && !valueArray[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text/plain').slice(0, numInputs);
    if (!/^\d*$/.test(pastedData)) return;
    onChange(pastedData);
  };

  const inputs = Array(numInputs)
    .fill(null)
    .map((_, index) => {
      const defaultInputProps = {
        type: 'text',
        maxLength: 1,
        value: valueArray[index] || '',
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event, index),
        onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(event, index),
        onPaste: handlePaste,
        ref: (ref: HTMLInputElement | null) => (inputRefs.current[index] = ref),
        className: cn(
          'w-10 h-12 text-center border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          className
        ),
      };

      return (
        <div key={index} className="w-10">
          {renderInput
            ? renderInput(defaultInputProps)
            : <input {...defaultInputProps} />}
        </div>
      );
    });

  return (
    <div className="flex gap-2 justify-center">
      {inputs}
    </div>
  );
}