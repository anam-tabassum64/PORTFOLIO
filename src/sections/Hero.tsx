import { ArrowRight } from 'lucide-react';
import { profile } from '@/content/portfolio';

/* ─── Skill Pill ──────────────────────────────────────────────────── */
const SkillPill = ({ label, icon }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[#d4c4a8] bg-transparent px-5 py-2.5 text-[13px] font-medium text-[#3a2c1a] tracking-wide cursor-default transition-all duration-200 hover:border-[#a0844a] hover:bg-white/60">
    {icon && <span className="text-[13px]">{icon}</span>}
    {label}
  </span>
);

/* ─── Main Hero ───────────────────────────────────────────────────── */
const Hero = () => {
  const skills = [
    { label: 'Python', icon: '🐍' },
    { label: 'Machine Learning' },
    { label: 'Data Analysis' },
    { label: 'React' },
    { label: 'Django' },
    { label: 'SQL' },
  ];

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-20"
        style={{ background: 'transparent' }}
      >
        {/* ── Subtle radial glow top-center ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 50% at 50% -5%, rgba(210,184,147,0.40), transparent)',
          }}
        />

        {/* ── Dot grid texture ── */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: 0.045 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#6b5230" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* ── Corner accents ── */}
        <svg
          className="pointer-events-none absolute top-7 left-7"
          style={{ opacity: 0.22 }}
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <path d="M0 56 L0 0 L56 0" stroke="#8a6c3e" strokeWidth="1.5" />
        </svg>
        <svg
          className="pointer-events-none absolute bottom-7 right-7"
          style={{ opacity: 0.22 }}
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
        >
          <path d="M56 0 L56 56 L0 56" stroke="#8a6c3e" strokeWidth="1.5" />
        </svg>

        {/* ── Content ── */}
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-8">

          {/* ── Headline ── */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 5.5vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: '-0.01em',
              color: '#2a1f10',
              maxWidth: '820px',
            }}
          >
            {profile?.headline ??
              'Designing data-driven solutions with machine learning, analytics, and scalable web technologies.'}
          </h1>

          {/* ── Italic quote ── */}
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(15px, 1.8vw, 20px)',
              color: '#5c4020',
              opacity: 0.85,
              letterSpacing: '0.01em',
            }}
          >
            {profile?.tagline ?? '"Where curiosity meets code and data becomes innovation."'}
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Primary */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                background: '#3a2c1a',
                color: '#f5f0e8',
                boxShadow: '0 4px 18px rgba(58,44,26,0.25)',
              }}
            >
              View Projects <ArrowRight size={14} />
            </a>

            {/* Outline */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/50"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderColor: '#c5a876',
                color: '#3a2c1a',
                background: 'rgba(255,255,255,0.35)',
              }}
            >
              Contact Me
            </a>

            {/* Outline */}
            <a
              href={profile?.resumePath ?? '#'}
              download={profile?.resumeFileName ?? true}
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/50"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                borderColor: '#c5a876',
                color: '#3a2c1a',
                background: 'rgba(255,255,255,0.35)',
              }}
            >
              Download Resume
            </a>
          </div>

          {/* ── Skill Pills ── */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {skills.map((s) => (
              <SkillPill key={s.label} label={s.label} icon={s.icon} />
            ))}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 pointer-events-none">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#a0844a',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '28px',
              background: 'linear-gradient(to bottom, #c5a876, transparent)',
            }}
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
