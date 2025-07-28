import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import LoginForm from './loginForm';
import { Separator } from '../../components/ui/separator';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-muted/40 px-4 bg-gradient-to-br from-[#2e3440] via-[#4c566a] to-[#d8dee9]">
      <Button variant="outline"
        className="absolute top-6 left-6 text-sm flex items-center gap-2"
        asChild
      >
        <a href="/"> <ArrowLeft className="w-4 h-4" /> Back </a>
      </Button>
      <Card className="bg-white w-full max-w-md border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
          <Separator />
          <p className="text-sm text-muted-foreground mt-2">
            Log in to manage your products, suppliers, and more.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;