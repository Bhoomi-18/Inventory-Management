import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../schemas/authSchema';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import api from '../../lib/apiClient';
import { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Loader2, ServerCrash } from 'lucide-react';

const IS_PROD = Boolean(import.meta.env.VITE_API_URL);

const SignupForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [wakingUp, setWakingUp] = useState(false);
  const [wakeProgress, setWakeProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!IS_PROD) return;
    const ctrl = new AbortController();
    const base = import.meta.env.VITE_API_URL as string;
    fetch(`${base}/health`, { signal: ctrl.signal }).catch(() => {});
    return () => ctrl.abort();
  }, []);

  const startWakeProgress = () => {
    setWakeProgress(0);
    setWakingUp(true);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / 85;
      setWakeProgress(Math.min(p, 98));
    }, 1000);
  };

  const stopWakeProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = null;
    setWakingUp(false);
    setWakeProgress(100);
  };

  const isTimeout = (err: any) =>
    err?.code === 'ECONNABORTED' ||
    err?.message?.includes('timeout') ||
    err?.message?.includes('Network Error');

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
    const { confirmPassword: _cp, ...payload } = data;
    const attemptSignup = async () => {
      const response = await api.post('/auth/signup', payload);
      setSuccessMessage('Account created successfully! Redirecting...');
      localStorage.setItem('token', response.data.token);
      setTimeout(() => { window.location.href = '/inventory'; }, 1000);
    };
    try {
      await attemptSignup();
    } catch (err: any) {
      if (IS_PROD && isTimeout(err)) {
        startWakeProgress();
        try {
          await attemptSignup();
          stopWakeProgress();
        } catch (retryErr: any) {
          stopWakeProgress();
          setServerError(retryErr.response?.data?.message || 'Server is still starting up. Please try again in a moment.');
        }
      } else {
        setServerError(err.response?.data?.message || 'Signup failed. Please try again.');
        console.error('Signup error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Server waking up banner */}
      {wakingUp && (
        <div className="border rounded-lg p-3 space-y-2" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
          <div className="flex items-center gap-2" style={{ color: '#92400e' }}>
            <ServerCrash className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm font-medium">Server is waking up from sleep…</p>
          </div>
          <p className="text-xs" style={{ color: '#b45309' }}>
            First signup may take up to 60 seconds. Please wait — retrying automatically.
          </p>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#fde68a' }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${wakeProgress}%`, background: 'linear-gradient(90deg,#f59e0b,#d97706)' }} />
          </div>
        </div>
      )}

      {serverError && !wakingUp && (
        <div className="alert-error flex items-start gap-3 p-3 border rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{serverError}</p>
        </div>
      )}

      {successMessage && (
        <div className="alert-success flex items-start gap-3 p-3 border rounded-lg">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{successMessage}</p>
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

      <Button type="submit" className="w-full h-10 text-base font-semibold" disabled={isSubmitting || wakingUp}>
        {isSubmitting || wakingUp ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {wakingUp ? 'Waiting for server…' : 'Creating account...'}
          </span>
        ) : 'Sign Up'}
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