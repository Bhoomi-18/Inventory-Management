import { Link } from 'react-router-dom';
import { Package, BarChart3, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Real-Time Stock Tracking',
    description: 'Monitor product movement and stock thresholds with instant low-stock alerts.',
    icon: <Package className="w-5 h-5" />,
    color: '#2563eb',
    bg: 'rgba(37,99,235,0.1)',
  },
  {
    title: 'Smart Reports & Analytics',
    description: 'Visualize inventory trends, top-selling products, and customer activity.',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#059669',
    bg: 'rgba(5,150,105,0.1)',
  },
  {
    title: 'Sales Management',
    description: 'Record sales, track revenue, and manage transactions from one place.',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.1)',
  },
  {
    title: 'Secure & Reliable',
    description: 'JWT-based authentication keeps your data private and your team accountable.',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
  },
];

/* ─── Mesh / SVG blob background ──────────────────────────────── */
const BgMesh = () => (
  <div
    aria-hidden
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}
  >
    {/* Base gradient */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.12) 0%, transparent 60%),' +
          'radial-gradient(ellipse 60% 50% at 100% 80%, rgba(124,58,237,0.09) 0%, transparent 55%),' +
          'radial-gradient(ellipse 50% 40% at 0% 60%, rgba(5,150,105,0.07) 0%, transparent 55%),' +
          'linear-gradient(180deg, #f0f4ff 0%, #f8fafc 40%, #ffffff 100%)',
      }}
    />

    {/* Floating blob 1 – top right */}
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: '-12%',
        right: '-8%',
        width: '520px',
        opacity: 0.55,
        animation: 'floatBlob 14s ease-in-out infinite',
      }}
    >
      <path
        d="M420,298Q387,346,348,380Q309,414,252,421Q195,428,148,393Q101,358,85,302Q69,246,95,192Q121,138,173,107Q225,76,283,74Q341,72,384,115Q427,158,439,229Q451,300,420,298Z"
        fill="rgba(37,99,235,0.13)"
      />
    </svg>

    {/* Floating blob 2 – bottom left */}
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-10%',
        width: '480px',
        opacity: 0.45,
        animation: 'floatBlob 18s ease-in-out infinite reverse',
      }}
    >
      <path
        d="M430,295Q400,340,360,375Q320,410,265,420Q210,430,160,395Q110,360,92,300Q74,240,100,185Q126,130,178,100Q230,70,288,72Q346,74,388,118Q430,162,440,228Q450,295,430,295Z"
        fill="rgba(124,58,237,0.10)"
      />
    </svg>

    {/* Floating blob 3 – center right */}
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: '40%',
        right: '5%',
        width: '280px',
        opacity: 0.35,
        animation: 'floatBlob 22s ease-in-out infinite',
        animationDelay: '-6s',
      }}
    >
      <path
        d="M290,195Q280,240,250,265Q220,290,180,285Q140,280,118,248Q96,216,100,174Q104,132,132,107Q160,82,200,80Q240,78,265,108Q290,138,295,168Q300,198,290,195Z"
        fill="rgba(5,150,105,0.12)"
      />
    </svg>

    {/* Subtle grid dots */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }}
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(37,99,235,0.18)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>

    <style>{`
      @keyframes floatBlob {
        0%,100% { transform: translate(0,0) scale(1); }
        33%      { transform: translate(18px,-22px) scale(1.04); }
        66%      { transform: translate(-14px,12px) scale(0.97); }
      }
    `}</style>
  </div>
);

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', color: '#0f172a' }}>
      <BgMesh />

      {/* ── Nav ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          backgroundColor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(226,232,240,0.9)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
              flexShrink: 0,
            }}
          >
            <Package style={{ width: 16, height: 16, color: '#fff' }} />
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg,#2563eb,#3b82f6,#60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            WareSync
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/login"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: '7px 16px',
              borderRadius: 8,
              color: '#2563eb',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = '#eff6ff')}
            onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = 'transparent')}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            style={{
              fontSize: 14,
              fontWeight: 600,
              padding: '8px 20px',
              borderRadius: 10,
              color: '#fff',
              background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(37,99,235,0.30)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '0.9'; (e.target as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '90px 24px 80px',
        }}
      >
        {/* Pill badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 12,
            fontWeight: 600,
            padding: '6px 16px',
            borderRadius: 999,
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            border: '1px solid #bfdbfe',
            marginBottom: 24,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#3b82f6', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Inventory Management Made Simple
        </span>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            maxWidth: 680,
            margin: '0 0 20px',
            color: '#0f172a',
          }}
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

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: '#475569',
            maxWidth: 520,
            margin: '0 0 36px',
          }}
        >
          Smart inventory management for growing businesses. Stay on top of your
          stock, sales, and analytics — all in one beautiful dashboard.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 700,
              padding: '13px 28px',
              borderRadius: 12,
              color: '#fff',
              background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
              boxShadow: '0 6px 24px rgba(37,99,235,0.35)',
              textDecoration: 'none',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(37,99,235,0.42)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(37,99,235,0.35)'; }}
          >
            Start for Free
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
          <Link
            to="/login"
            style={{
              fontSize: 15,
              fontWeight: 600,
              padding: '12px 24px',
              borderRadius: 12,
              border: '1.5px solid #e2e8f0',
              color: '#0f172a',
              backgroundColor: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              backdropFilter: 'blur(6px)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#f1f5f9')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.8)')}
          >
            Log In
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 44, marginTop: 56, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { value: '500+', label: 'Products tracked' },
            { value: '99.9%', label: 'Uptime' },
            { value: '< 1s', label: 'Page load' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#2563eb', letterSpacing: '-0.5px' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 24px 80px',
          maxWidth: 920,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
            Everything you need, nothing you don't
          </h2>
          <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>
            A focused set of tools to run your inventory efficiently.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {features.map(f => (
            <div
              key={f.title}
              style={{
                display: 'flex',
                gap: 16,
                padding: '20px',
                borderRadius: 16,
                border: '1.5px solid rgba(226,232,240,0.9)',
                backgroundColor: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                transition: 'transform 0.18s, box-shadow 0.18s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.09)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: f.bg,
                  color: f.color,
                }}
              >
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 5px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55, margin: 0 }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 24px 80px',
          maxWidth: 720,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            borderRadius: 24,
            padding: '52px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg,#1e3a5f 0%,#2563eb 60%,#3b82f6 100%)',
            boxShadow: '0 16px 50px rgba(37,99,235,0.30)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative ring inside banner */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: 200, height: 200, borderRadius: '50%',
            border: '40px solid rgba(255,255,255,0.07)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-50px', left: '-50px',
            width: 160, height: 160, borderRadius: '50%',
            border: '30px solid rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }} />

          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>
            Ready to take control of your inventory?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(219,234,254,0.9)', margin: '0 0 28px' }}>
            Join WareSync today and manage smarter, not harder.
          </p>
          <Link
            to="/signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: 12,
              color: '#2563eb',
              backgroundColor: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'translateY(0)')}
          >
            Create Free Account
            <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid rgba(226,232,240,0.8)',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: 12,
          color: '#94a3b8',
          backgroundColor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(8px)',
        }}
      >
        © {new Date().getFullYear()} WareSync. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;