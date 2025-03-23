// src/components/auth/SignUpForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import { useToast } from '@/components/ui/use-toast';
import { useCsrf } from '@/hooks/useCsrf';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional(),
  mobile: z.string().min(10, 'Invalid mobile number').optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
}).refine((data) => data.email || data.mobile, {
  message: "Either email or mobile is required",
  path: ["email"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const { csrfToken, loading: csrfLoading, error: csrfError } = useCsrf();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  // Show loading state while CSRF token is being fetched
  if (csrfLoading) {
    return (
      <div className="flex justify-center items-center">
        <Icons.spinner className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Show error if CSRF token fetch failed
  if (csrfError) {
    return (
      <div className="text-center text-red-500">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const onSubmit = async (data: SignUpValues) => {
    if (!csrfToken) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please try again in a moment',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      const result = await response.json();
      toast({
        title: 'Success',
        description: 'Account created successfully, Verification link sent to your email/mobile',
      });

      router.push('/verify');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          type="text"
          placeholder="Full name"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('mobile')}
          type="tel"
          placeholder="Mobile number"
          disabled={isLoading}
        />
        {errors.mobile && (
          <p className="text-sm text-red-500">{errors.mobile.message}</p>
        )}
      </div>

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

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !csrfToken}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign up
      </Button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <a
          href="/signin"
          className="text-blue-600 hover:text-blue-500"
        >
          Sign in
        </a>
      </div>
    </form>
  );
}

// // src/components/auth/SignUpForm.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Icons } from '@/components/ui/icons';
// import { useToast } from '@/components/ui/use-toast';

// const signUpSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   email: z.string().email('Invalid email').optional(),
//   mobile: z.string().min(10, 'Invalid mobile number').optional(),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
// }).refine((data) => data.email || data.mobile, {
//   message: "Either email or mobile is required",
//   path: ["email"],
// });

// type SignUpValues = z.infer<typeof signUpSchema>;

// export default function SignUpForm() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpValues>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = async (data: SignUpValues) => {
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message);
//       }

//       toast({
//         title: 'Success',
//         description: 'Verification link sent to your email/mobile',
//       });

//       router.push('/verify');
//     } catch (error: any) {
//       toast({
//         variant: 'destructive',
//         title: 'Error',
//         description: error.message || 'Something went wrong',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <Input
//           {...register('name')}
//           type="text"
//           placeholder="Full name"
//           disabled={isLoading}
//         />
//         {errors.name && (
//           <p className="text-sm text-red-500">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         <Input
//           {...register('email')}
//           type="email"
//           placeholder="Email"
//           disabled={isLoading}
//         />
//         {errors.email && (
//           <p className="text-sm text-red-500">{errors.email.message}</p>
//         )}
//       </div>

//       <div>
//         <Input
//           {...register('mobile')}
//           type="tel"
//           placeholder="Mobile number"
//           disabled={isLoading}
//         />
//         {errors.mobile && (
//           <p className="text-sm text-red-500">{errors.mobile.message}</p>
//         )}
//       </div>

//       <div>
//         <Input
//           {...register('password')}
//           type="password"
//           placeholder="Password"
//           disabled={isLoading}
//         />
//         {errors.password && (
//           <p className="text-sm text-red-500">{errors.password.message}</p>
//         )}
//       </div>

//       <Button
//         type="submit"
//         className="w-full"
//         disabled={isLoading}
//       >
//         {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
//         Sign up
//       </Button>

//       <div className="text-center text-sm">
//         Already have an account?{' '}
//         <a
//           href="/signin"
//           className="text-blue-600 hover:text-blue-500"
//         >
//           Sign in
//         </a>
//       </div>
//     </form>
//   );
// }