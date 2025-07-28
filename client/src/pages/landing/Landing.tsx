import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Real-Time Stock Tracking',
    description: 'Monitor product movement and thresholds with instant alerts.',
    icon: '📦',
  },
  {
    title: 'Supplier Management',
    description: 'Maintain contact details, order history, and performance notes.',
    icon: '🏭',
  },
  {
    title: 'Smart Reports & Analytics',
    description: 'Visualize inventory trends and download report exports.',
    icon: '📊',
  },
];

const Landing = () => {
  return (
    <section className="relative min-h-screen bg-[url('/hero.avif')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 flex flex-col min-h-screen text-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/20">
          <h1 className="text-xl font-bold tracking-wide text-white">Inventory</h1>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link to="/signup">
              <Button variant="secondary" className="border-white text-white hover:bg-white/10">
                Sign Up
              </Button>
            </Link>
          </div>
        </header>

        <section className="text-center px-4 py-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 leading-tight text-white">Track. Manage. Optimize.</h2>
          <p className="text-white/80 text-sm mb-6">
            Smart inventory management for growing businesses. Stay on top of your stock, suppliers,
            orders and analytics—all in one dashboard.
          </p>
          <Link to="/signup">
            <Button variant="secondary" className="px-6 py-3 text-lg font-semibold border-white text-white hover:bg-white/10">
              Get Started
            </Button>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-12 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card key={idx} className="bg-white/10 border border-white/20 backdrop-blur-sm text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-2xl">{feature.icon}</span> {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/80">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="text-center py-6 text-xs text-white/60">
          © {new Date().getFullYear()} Inventory. All rights reserved.
        </footer>
      </div>
    </section>
  );
};

export default Landing;