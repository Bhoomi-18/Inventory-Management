import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { loginSchema } from '../../schemas/authSchema';
import api from '../../lib/apiClient';
import { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Loader2, ServerCrash } from 'lucide-react';

const IS_PROD = Boolean(import.meta.env.VITE_API_URL);

const LoginForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [wakingUp, setWakingUp] = useState(false);
  const [wakeProgress, setWakeProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pre-warm backend on mount (production only)
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
      p += 100 / 85; // reach ~100% in 85 s
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
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const attemptLogin = async (data: z.infer<typeof loginSchema>) => {
    const response = await api.post('/auth/login', data);
    setSuccessMessage('Login successful! Redirecting...');
    localStorage.setItem('token', response.data.token);
    setTimeout(() => { window.location.href = '/inventory'; }, 1000);
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setServerError('');
    setSuccessMessage('');
    try {
      await attemptLogin(data);
    } catch (err: any) {
      // If it's a timeout (cold start), show wake-up UI and retry ONCE
      if (IS_PROD && isTimeout(err)) {
        startWakeProgress();
        try {
          await attemptLogin(getValues());
          stopWakeProgress();
        } catch (retryErr: any) {
          stopWakeProgress();
          const msg = retryErr.response?.data?.message;
          setServerError(msg || 'Server is still starting up. Please try again in a moment.');
        }
      } else {
        const msg = err.response?.data?.message || 'Login failed. Please try again.';
        setServerError(msg);
        console.error('Login error:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* Server waking up banner */}
      {wakingUp && (
        <div
          className="border rounded-lg p-3 space-y-2"
          style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}
        >
          <div className="flex items-center gap-2" style={{ color: '#92400e' }}>
            <ServerCrash className="w-4 h-4 flex-shrink-0" />
            <p className="text-sm font-medium">Server is waking up from sleep…</p>
          </div>
          <p className="text-xs" style={{ color: '#b45309' }}>
            The free server sleeps after inactivity. First login takes up to 60 seconds. Please wait — your request will retry automatically.
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#fde68a' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${wakeProgress}%`, background: 'linear-gradient(90deg,#f59e0b,#d97706)' }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {serverError && !wakingUp && (
        <div className="alert-error flex items-start gap-3 p-3 border rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{serverError}</p>
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="alert-success flex items-start gap-3 p-3 border rounded-lg">
          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{successMessage}</p>
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
            <span className="font-bold">•</span>
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
            <span className="font-bold">•</span>
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-10 text-base font-semibold"
        disabled={isSubmitting || wakingUp}
      >
        {isSubmitting || wakingUp ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            {wakingUp ? 'Waiting for server…' : 'Logging in…'}
          </span>
        ) : 'Log In'}
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