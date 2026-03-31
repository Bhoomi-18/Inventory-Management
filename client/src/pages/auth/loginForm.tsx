import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { loginSchema } from '../../schemas/authSchema';
import api from '../../lib/apiClient';
import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const LoginForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const response = await api.post('/auth/login', data);

      setSuccessMessage('Login successful! Redirecting...');
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {
        window.location.href = '/inventory';
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setServerError(errorMsg);
      console.error('Login error:', err);
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
          placeholder="Enter your password"
          className="h-10"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500 flex items-start gap-2">
            <span className="text-red-500 font-bold">•</span>
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full h-10 text-base font-semibold" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Log In'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="/signup" className="font-semibold text-primary hover:text-primary/80 underline">
          Sign up here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;