import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import LoginForm from './loginForm';
import { Separator } from '../../components/ui/separator';
import { Button } from '../../components/ui/button';
import { ArrowLeft, LogIn } from 'lucide-react';

const Login = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 px-4 py-8">
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-sm flex items-center gap-2 hover:bg-white/50"
        asChild
      >
        <a href="/">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Home</span>
        </a>
      </Button>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <LogIn className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Log in to manage your products and inventory
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-lg font-bold">Log In</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          Need help?{' '}
          <a href="#" className="text-primary font-semibold hover:underline">
            Contact support
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;