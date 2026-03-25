import { useState, useEffect, useRef } from 'react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';

// ─── Tech icon SVGs (inline, matching reference style) ──────────────────────
const TechIcon = ({ name }) => {
  const icons = {
    Python: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9.2 2 7 3.1 7 5v3h5v1H5.5C3.6 9 2 10.8 2 13s1.6 4 3.5 4H5v-3c0-1.9 2.2-3 5-3s5 1.1 5 3v5c0 1.9-2.2 3-5 3s-5-1.1-5-3v-1H3c-1.1 0-1-1-1-1v-2" />
        <path d="M12 22c2.8 0 5-1.1 5-3v-3h-5v-1h6.5c1.9 0 3.5-1.8 3.5-4s-1.6-4-3.5-4H19v3c0 1.9-2.2 3-5 3" />
        <circle cx="9.5" cy="5.5" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="18.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" />
        <path d="M12 12v5M12 12L7.5 9.5M12 12l4.5-2.5" />
      </svg>
    ),
    'REST APIs': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h10M4 18h7" />
        <circle cx="18" cy="15" r="4" />
        <path d="M18 13v2l1.5 1.5" />
      </svg>
    ),
    Django: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 7h2v10H8zM12 7h4v2h-4zM12 11h3v2h-3zM12 15h2.5" />
      </svg>
    ),
    FastAPI: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H13L13 2z" />
      </svg>
    ),
    TensorFlow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M5 5.8l7-3.8 7 3.8M5 12l7-3.8M12 8.2L19 12M5 18.2l7-3.8 7 3.8" />
      </svg>
    ),
    Pandas: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="4" height="18" rx="1" />
        <rect x="10" y="3" width="4" height="18" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
    'Scikit-learn': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="7" r="2" />
        <circle cx="19" cy="7" r="2" />
        <circle cx="19" cy="17" r="2" />
        <circle cx="5" cy="17" r="2" />
        <path d="M7 7l3.5 3.5M14.5 10.5L17 7M17 17l-2.5-2.5M7 17l2.5-2.5" />
      </svg>
    ),
    NumPy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l9-4 9 4v8l-9 4-9-4V6z" />
        <path d="M3 6l9 4 9-4" />
        <path d="M12 10v8" />
      </svg>
    ),
    Matplotlib: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18M3 20V4" />
        <path d="M5 15l4-5 4 3 5-7" />
        <circle cx="9" cy="10" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="13" cy="13" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
    React: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    JavaScript: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 16.5c0 1 .7 1.5 1.5 1.5s1.5-.5 1.5-2v-5" />
        <path d="M15 11.5c-.5-.5-1-.5-1.5-.5-1 0-1.5.7-1.5 1.5s.5 1 1.5 1.5 1.5.8 1.5 1.7c0 1-.7 1.3-1.5 1.3s-1.2-.3-1.5-.8" />
      </svg>
    ),
    'HTML/CSS': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3l1.6 16L12 21l6.4-2L20 3H4z" />
        <path d="M16 8H8l.3 3h7.4l-.5 5L12 17l-3.2-.9-.2-2.5" />
      </svg>
    ),
    TypeScript: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 9h10M12 9v8" />
        <path d="M14.5 15c.3.8 1 1 1.5 1s1.5-.4 1.5-1.5-.8-1.3-1.5-1.5-1.5-.7-1.5-1.5.5-1.5 1.5-1.5 1.2.3 1.4.8" />
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9l7 7" />
        <path d="M9 16V9h2" />
        <path d="M15 9v4" />
      </svg>
    ),
    'Git & GitHub': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="7" r="2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="7" r="2" />
        <path d="M7 9v6M9 7h5a3 3 0 0 1 3 3v0" />
      </svg>
    ),
    PostgreSQL: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
        <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" />
      </svg>
    ),
    MongoDB: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2c0 0-6 6-6 12a6 6 0 0 0 12 0C18 8 12 2 12 2z" />
        <path d="M12 22V12" />
      </svg>
    ),
    Docker: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12.5c-.4-2.4-2.4-3.5-4-3.5H18v-2h-3v2h-3v-2H9v2H6v-2H3v4h.8C3 14 2.9 19 8 19h8c3 0 5-2 5.5-4.5" />
        <path d="M7 13h2M11 13h2M15 13h2" />
      </svg>
    ),
    Linux: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8 2 6 6 6 10v4l-2 4h16l-2-4v-4c0-4-2-8-6-8z" />
        <path d="M9 10h.01M15 10h.01" />
        <path d="M9 15c1 1 5 1 6 0" />
        <path d="M8 22l1-4M16 22l-1-4" />
      </svg>
    ),
  };
  return icons[name] || (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 3" />
    </svg>
  );
};

// ─── Data ────────────────────────────────────────────────────────────────────
const skillsData = [
  {
    category: 'Backend Development',
    label: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3M13 14h4" />
      </svg>
    ),
    skills: ['Python', 'Node.js', 'REST APIs', 'Django', 'FastAPI'],
    desc: 'Scalable, performant server-side systems',
  },
  {
    category: 'Data Science & ML',
    label: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M3 20h18M3 20V4M7 16l4-6 4 4 4-8" />
        <circle cx="7" cy="16" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="11" cy="10" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="15" cy="14" r="1.3" fill="currentColor" stroke="none" />
        <circle cx="19" cy="6" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
    skills: ['TensorFlow', 'Pandas', 'Scikit-learn', 'NumPy', 'Matplotlib'],
    desc: 'Predictive models & intelligent analytics',
  },
  {
    category: 'Frontend & Full-Stack',
    label: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Next.js'],
    desc: 'Responsive interfaces & SPA architecture',
  },
  {
    category: 'Tools & Databases',
    label: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v5c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 10v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" />
        <path d="M3 15v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" />
      </svg>
    ),
    skills: ['Git & GitHub', 'PostgreSQL', 'MongoDB', 'Docker', 'Linux'],
    desc: 'DevOps, version control & persistence',
  },
];

// ─── Hook: IntersectionObserver ───────────────────────────────────────────────
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────
const SkillPill = ({ name, index, visible }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px',
        borderRadius: '999px',
        background: hovered
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(255,255,255,0.6)',
        border: hovered
          ? '1px solid rgba(180,142,80,0.4)'
          : '1px solid rgba(200,175,130,0.25)',
        boxShadow: hovered
          ? '0 4px 16px rgba(160,118,40,0.12), inset 0 1px 0 rgba(255,255,255,0.9)'
          : '0 2px 8px rgba(160,118,40,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        cursor: 'default',
        transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: visible
          ? hovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)'
          : 'translateY(14px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${0.08 * index}s` : '0s',
      }}
    >
      <span style={{
        width: '22px',
        height: '22px',
        color: '#b08949',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s ease',
        ...(hovered ? { color: '#9a6f30' } : {}),
      }}>
        <TechIcon name={name} />
      </span>
      <span style={{
        fontSize: '13.5px',
        fontWeight: 600,
        color: hovered ? '#4a3010' : '#6b4d22',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '-0.01em',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s ease',
      }}>
        {name}
      </span>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
const SkillCard = ({ data, cardIndex }) => {
  const [ref, visible] = useReveal(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 0',
        minWidth: '240px',
        maxWidth: '340px',
        borderRadius: '28px',
        padding: '32px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        // Neumorphic base
        background: 'linear-gradient(145deg, #f5ede0, #ede3d4)',
        boxShadow: hovered
          ? '10px 10px 32px rgba(160,118,60,0.18), -6px -6px 20px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.6)'
          : '8px 8px 24px rgba(160,118,60,0.14), -5px -5px 16px rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.55)',
        transform: visible
          ? hovered ? 'translateY(-8px)' : 'translateY(0)'
          : `translateY(40px)`,
        opacity: visible ? 1 : 0,
        transition: visible
          ? `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${cardIndex * 0.12}s, opacity 0.65s ease ${cardIndex * 0.12}s, box-shadow 0.3s ease`
          : 'none',
      }}
    >
      {/* Number label */}
      <span style={{
        position: 'absolute',
        top: '22px',
        right: '26px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: 'rgba(160,118,60,0.35)',
        fontFamily: "'DM Mono', monospace",
      }}>
        {data.label}
      </span>

      {/* Icon */}
      <div style={{
        width: '54px',
        height: '54px',
        borderRadius: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#b08949',
        background: 'linear-gradient(145deg, #f0e6d2, #e8dcca)',
        boxShadow: '4px 4px 12px rgba(160,118,60,0.16), -3px -3px 10px rgba(255,255,255,0.85)',
        border: '1px solid rgba(255,255,255,0.5)',
        flexShrink: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ...(hovered ? {
          boxShadow: '5px 5px 16px rgba(160,118,60,0.2), -3px -3px 10px rgba(255,255,255,0.9)',
        } : {}),
      }}>
        {data.icon}
      </div>

      {/* Title + desc */}
      <div>
        <h3 style={{
          margin: '0 0 6px',
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px',
          fontWeight: 700,
          color: '#3a2810',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}>
          {data.category}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '12.5px',
          color: '#9a7642',
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.5,
          fontStyle: 'italic',
        }}>
          {data.desc}
        </p>

        {/* Divider */}
        <div style={{
          marginTop: '14px',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(180,142,80,0.4), rgba(180,142,80,0.08))',
          borderRadius: '999px',
          width: hovered ? '80%' : '50%',
          transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }} />
      </div>

      {/* Pills */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {data.skills.map((skill, i) => (
          <SkillPill key={skill} name={skill} index={i} visible={visible} />
        ))}
      </div>
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
const SectionHeader = () => {
  const [ref, visible] = useReveal(0.3);
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease',
      }}
    >
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 16px',
        borderRadius: '999px',
        background: 'linear-gradient(145deg, #f0e6d2, #e8dcca)',
        boxShadow: '3px 3px 10px rgba(160,118,60,0.14), -2px -2px 8px rgba(255,255,255,0.8)',
        border: '1px solid rgba(255,255,255,0.5)',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#d4aa70',
          display: 'inline-block',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#b08949',
          fontFamily: "'DM Mono', monospace",
        }}>
          Technical Expertise
        </span>
      </div>

      <h2 style={{
        margin: 0,
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(38px, 6vw, 68px)',
        fontWeight: 700,
        color: '#2a1e0e',
        lineHeight: 1.06,
        letterSpacing: '-0.03em',
      }}>
        Skills &amp; Technologies
      </h2>

      <p style={{
        margin: 0,
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(15px, 1.4vw, 19px)',
        fontStyle: 'italic',
        color: '#9a7040',
        lineHeight: 1.65,
        maxWidth: '100%',
      }}>
        Curated tools for intelligent, data-driven solutions.
      </p>

      <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(180,142,80,0.45), transparent)',
        marginTop: '6px',
      }} />
    </div>
  );
};

// ─── Footer note ──────────────────────────────────────────────────────────────
const FooterNote = () => {
  const [ref, visible] = useReveal(0.5);
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.6s ease 0.3s',
      }}
    >
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#5fe26f',
        display: 'inline-block',
        boxShadow: '0 0 0 4px rgba(95,226,111,0.2)',
        flexShrink: 0,
      }} />
      <span style={{
        fontSize: '12.5px',
        color: '#9a7642',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: '0.01em',
      }}>
        Continuously learning &amp; expanding my toolkit — always open to new technologies.
      </span>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '96px 24px 88px',
        position: 'relative',
        overflow: 'hidden',
        // Warm parchment base matching reference
        background: 'linear-gradient(160deg, #f2e9d8 0%, #ede3d2 40%, #e8dcc8 100%)',
      }}
    >
      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b08949' fill-opacity='0.025'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />

      {/* Decorative corner lines — top-right */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        width: '100px',
        height: '100px',
        borderTop: '1px solid rgba(180,142,80,0.22)',
        borderRight: '1px solid rgba(180,142,80,0.22)',
        borderRadius: '0 20px 0 0',
        pointerEvents: 'none',
      }} />
      {/* bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        width: '70px',
        height: '70px',
        borderBottom: '1px solid rgba(180,142,80,0.18)',
        borderLeft: '1px solid rgba(180,142,80,0.18)',
        borderRadius: '0 0 0 14px',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '52px',
        position: 'relative',
        zIndex: 1,
      }}>
        <EditorialSectionHeader
          number="01"
          eyebrow="Technical Expertise"
          title="Skills"
          accent="toolkit"
          description="Curated tools for intelligent, data-driven solutions."
          className="mx-auto max-w-[700px] -mt-6"
        />

        {/* Cards */}
        <div
          className="skills-grid"
          style={{
            display: 'flex',
            gap: '22px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {skillsData.map((data, i) => (
            <SkillCard key={data.category} data={data} cardIndex={i} />
          ))}
        </div>

        <FooterNote />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@500&display=swap');
        
        @media (max-width: 900px) {
          .skills-grid > * {
            min-width: calc(50% - 11px) !important;
            max-width: none !important;
          }
        }
        @media (max-width: 560px) {
          .skills-grid > * {
            min-width: 100% !important;
          }
        }

        * { box-sizing: border-box; }
      `}</style>
    </section>
  );
};

export default Skills;
