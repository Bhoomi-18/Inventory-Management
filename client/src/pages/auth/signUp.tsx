import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import SignupForm from './signupForm';
import { Separator } from '../../components/ui/separator';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Signup = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted px-4 py-8">
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-sm flex items-center gap-2 hover:bg-card/50"
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
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            Join us to start managing your inventory effectively
          </p>
        </div>

        <Card className="shadow-xl border border-border bg-card">
          <CardHeader className="space-y-2 pb-2">
            <CardTitle className="text-lg font-bold text-card-foreground">Sign Up</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By signing up, you agree to our{' '}
          <a href="#" className="text-primary font-semibold hover:underline">
            Terms of Service
          </a>
        </p>
      </div>
    </section>
  );
};

export default Signup;