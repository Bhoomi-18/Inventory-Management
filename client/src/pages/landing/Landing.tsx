import { Link } from 'react-router-dom';
import { Package, BarChart3, TrendingUp, ShieldCheck, ArrowRight, Box } from 'lucide-react';

const features = [
  {
    title: 'Real-Time Stock Tracking',
    description: 'Monitor product movement and stock thresholds with instant low-stock alerts.',
    icon: <Box className="w-6 h-6" />,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.12)',
  },
  {
    title: 'Smart Reports & Analytics',
    description: 'Visualize inventory trends, top-selling products, and customer activity at a glance.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: '#059669',
    bg: 'rgba(5,150,105,0.12)',
  },
  {
    title: 'Sales Management',
    description: 'Record sales, track revenue, and manage all transactions from one central place.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
  },
  {
    title: 'Secure & Reliable',
    description: 'JWT-based authentication keeps your data private and your team accountable.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.12)',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8fafc', color: '#0f172a' }}>

      {/* ── Nav ── */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-30"
        style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}
          >
            <Package className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            WareSync
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ color: '#2563eb' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eff6ff')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)' }}
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-28">
        {/* Pill badge */}
        <span
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          style={{ backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Inventory Management Made Simple
        </span>

        <h1
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-5 max-w-3xl"
          style={{ color: '#0f172a' }}
        >
          Track.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Manage.
          </span>{' '}
          Optimize.
        </h1>

        <p className="text-base md:text-lg max-w-xl mb-8" style={{ color: '#64748b' }}>
          Smart inventory management for growing businesses. Stay on top of your stock,
          sales, and analytics — all in one beautiful dashboard.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            to="/signup"
            className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-blue-300/40"
            style={{ background: 'linear-gradient(135deg,#2563eb,#3b82f6)', boxShadow: '0 4px 20px rgba(37,99,235,0.3)' }}
          >
            Start for Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border transition-colors"
            style={{ color: '#0f172a', borderColor: '#e2e8f0', backgroundColor: '#ffffff' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            Log In
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-14 flex-wrap justify-center">
          {[
            { value: '500+', label: 'Products tracked' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 1s', label: 'Page load' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>
            Everything you need, nothing you don't
          </h2>
          <p className="text-sm" style={{ color: '#64748b' }}>
            A focused set of tools to run your inventory efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0' }}
            >
              {/* Icon bubble */}
              <div
                className="w-11 h-11 flex-shrink-0 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: '#0f172a' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 pb-20 max-w-3xl mx-auto w-full text-center">
        <div
          className="rounded-2xl p-10"
          style={{ background: 'linear-gradient(135deg,#1e3a5f,#2563eb)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to take control of your inventory?
          </h2>
          <p className="text-blue-200 text-sm mb-7">
            Join WareSync today and manage smarter, not harder.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3 rounded-xl bg-white transition-colors hover:bg-blue-50"
            style={{ color: '#2563eb' }}
          >
            Create Free Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="border-t px-6 py-6 text-center text-xs"
        style={{ borderColor: '#e2e8f0', color: '#94a3b8', backgroundColor: '#ffffff' }}
      >
        © {new Date().getFullYear()} WareSync. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;