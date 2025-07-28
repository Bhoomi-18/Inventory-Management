import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import SignupForm from './signupForm';
import { Separator } from '../../components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const Signup = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-muted/40 px-4 bg-gradient-to-br from-[#2e3440] via-[#4c566a] to-[#d8dee9]">
      <Button variant="outline"
        className="absolute top-6 left-6 text-sm flex items-center gap-2"
        asChild
      >
        <a href="/"> <ArrowLeft className="w-4 h-4" /> Back </a>
      </Button>
      <Card className="w-full max-w-md shadow-lg border bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create an Account</CardTitle>
          <Separator />
          <p className="text-sm text-muted-foreground mt-2">
            Sign up to start managing your inventory seamlessly.
          </p>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default Signup;