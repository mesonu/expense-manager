// src/components/auth/SignInForm.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';

const signInSchema = z.object({
  identifier: z.string().min(1, 'Email or mobile is required'),
  password: z.string().min(1, 'Password is required'),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPOption, setShowOTPOption] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInValues) => {
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid credentials',
        });
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to sign in with ${provider}`,
      });
    }
  };

  const handleOTPLogin = async (identifier: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier }),
      });

      if (!response.ok) throw new Error();

      router.push(`/verify-otp?email=${identifier}`);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register('identifier')}
            type="text"
            placeholder="Email or mobile"
            disabled={isLoading}
          />
          {errors.identifier && (
            <p className="text-sm text-red-500">{errors.identifier.message}</p>
          )}
        </div>

        {!showOTPOption && (
          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
        >
          <Icons.facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setShowOTPOption(!showOTPOption)}
          disabled={isLoading}
        >
          <Icons.mail className="mr-2 h-4 w-4" />
          {showOTPOption ? 'Use Password' : 'Login with OTP'}
        </Button>
      </div>

      <div className="text-center text-sm">
        <a
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
}