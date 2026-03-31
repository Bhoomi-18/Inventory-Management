import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../schemas/authSchema';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import api from '../../lib/apiClient';
import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SignupForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');
  const passwordChecks = {
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const { confirmPassword, ...payload } = data;
      const response = await api.post('/auth/signup', payload);

      setSuccessMessage('Account created successfully! Redirecting...');
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        window.location.href = '/inventory';
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Signup failed. Please try again.';
      setServerError(errorMsg);
      console.error('Signup error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-semibold">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          className="h-10"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-sm text-red-500 flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-10"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500 flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 chars, lowercase, uppercase, digit, symbol"
          className="h-10"
          {...register('password')}
        />
        <div className="text-xs space-y-1 text-muted-foreground">
          <p className={passwordChecks.length ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>
            {passwordChecks.length ? '✔' : '✖'} At least 8 characters
          </p>
          <p className={passwordChecks.lower ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>
            {passwordChecks.lower ? '✔' : '✖'} At least one lowercase letter
          </p>
          <p className={passwordChecks.upper ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>
            {passwordChecks.upper ? '✔' : '✖'} At least one uppercase letter
          </p>
          <p className={passwordChecks.digit ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>
            {passwordChecks.digit ? '✔' : '✖'} At least one digit
          </p>
          <p className={passwordChecks.symbol ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>
            {passwordChecks.symbol ? '✔' : '✖'} At least one symbol
          </p>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-semibold">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          className="h-10"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full h-10 text-base font-semibold" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Sign Up'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <a href="/login" className="font-semibold text-primary hover:text-primary/80 underline">
          Log in here
        </a>
      </p>
    </form>
  );
};

export default SignupForm;