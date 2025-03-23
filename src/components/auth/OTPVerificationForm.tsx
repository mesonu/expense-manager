// src/components/auth/OTPVerificationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { OTPInput } from '@/components/ui/otp-input';

interface OTPVerificationFormProps {
  email: string;
}

export function OTPVerificationForm({ email }: OTPVerificationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid OTP',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: 'Success',
        description: 'OTP verified successfully',
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid OTP',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      toast({
        title: 'Success',
        description: 'OTP sent successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send OTP',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />

      <Button
        onClick={handleVerify}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Verify OTP
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isLoading}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}