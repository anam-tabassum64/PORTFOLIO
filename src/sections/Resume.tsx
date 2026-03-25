import {
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  ArrowUpRight,
  Zap,
  Compass,
  Clock,
} from 'lucide-react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { profile } from '@/content/portfolio';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const highlights = [
  {
    label: 'Core Focus',
    value: profile.role,
    desc: 'High-impact digital experiences',
    Icon: Zap,
  },
  {
    label: 'Location',
    value: profile.location,
    desc: 'Global remote · Available worldwide',
    Icon: Compass,
  },
  {
    label: 'Direct Line',
    value: profile.email,
    desc: 'Open for collaborations',
    Icon: Mail,
  },
];

const MARQUEE_ITEMS = [
  'Senior Frontend Engineer',
  'Award-Winning Portfolio',
  'Available for Collaborations',
  'React · Node · TypeScript',
  'Senior Frontend Engineer',
  'Award-Winning Portfolio',
  'Available for Collaborations',
  'React · Node · TypeScript',
];

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
const Resume = () => {
  return (
    <section
      id="resume"
      className="relative overflow-hidden bg-[#f7f3ed] px-6 py-16 lg:px-24 lg:py-20"
    >
      {/* ── Geometric decoration ── */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] opacity-[0.055]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="350" cy="50" r="200" stroke="#6c522d" strokeWidth="1" />
        <circle cx="350" cy="50" r="150" stroke="#6c522d" strokeWidth="0.5" />
        <circle cx="350" cy="50" r="100" stroke="#6c522d" strokeWidth="0.5" />
        <line x1="150" y1="50" x2="350" y2="250" stroke="#6c522d" strokeWidth="0.5" />
        <line x1="350" y1="50" x2="150" y2="250" stroke="#6c522d" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-6xl">

        {/* ══ HEADER ══ */}
        <div className="mb-12 border-b border-olive-200 pb-8 text-center">
          <EditorialSectionHeader
            number="05"
            eyebrow="Experience Archive · 2025"
            title="Resume"
            accent="record"
            description="A curated dossier of professional evolution where technical precision meets creative direction."
            className="mx-auto max-w-3xl -mt-8"
          />

          {/* Live status pill */}
          <div className="mx-auto mt-8 flex w-max max-w-full items-center justify-center gap-3 rounded-full border border-olive-200 bg-white/50 px-5 py-2.5 shadow-sm backdrop-blur-md transition-colors hover:border-olive-300 md:gap-4 md:px-6 md:py-3">
            <div className="flex items-center gap-1.5 border-r border-olive-200 pr-3 md:gap-2 md:pr-4">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive-500 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-olive-500 md:h-2 md:w-2" />
              </span>
              <span className="font-syne text-[8px] font-bold uppercase tracking-[.15em] text-olive-600 md:text-[9px] md:tracking-[.2em]">
                Status
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="whitespace-nowrap font-playfair text-[13px] font-medium italic tracking-wide text-olive-800 md:text-[15px]">
                Open to work
              </span>
              <span className="h-[3px] w-[3px] rounded-full bg-olive-300 md:h-1 md:w-1" />
              <span className="whitespace-nowrap font-syne text-[7px] font-bold uppercase tracking-[.1em] text-olive-500 md:text-[8px] md:tracking-[.15em]">
                Remote · Global
              </span>
            </div>
          </div>
        </div>

        {/* ══ MAIN GRID ══ */}
        <div className="mb-14 grid items-start gap-5 lg:grid-cols-[1.15fr_.85fr]">

          {/* ── Document card ── */}
          <div className="group relative overflow-hidden border border-olive-200 bg-white transition-[border-color] duration-400 hover:border-olive-500">

            {/* Dark wipe reveal */}
            <div className="absolute inset-0 origin-bottom scale-y-0 bg-olive-700 transition-transform duration-[650ms] ease-[cubic-bezier(.77,0,.175,1)] group-hover:scale-y-100" />

            <div className="relative z-10 p-10">
              {/* Top row */}
              <div className="mb-10 flex items-center justify-between">
                <span className="font-syne text-[9px] font-bold uppercase tracking-[.28em] text-olive-500 transition-colors duration-400 group-hover:text-olive-300">
                  Master Document
                </span>

                {/* Animated page icon */}
                <div className="relative flex h-[68px] w-[52px] items-center justify-center border border-olive-200 bg-[#f7f3ed] transition-[border-color,background,transform] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:rotate-6 group-hover:scale-110 group-hover:border-olive-500 group-hover:bg-olive-500">
                  <span className="absolute right-0 top-0 block h-[14px] w-[14px] border-b border-l border-olive-200 bg-[#f7f3ed] transition-[background,border-color] duration-400 group-hover:border-olive-600 group-hover:bg-olive-700" />
                  <FileText
                    size={20}
                    className="text-olive-600 transition-colors duration-400 group-hover:text-white"
                    strokeWidth={1.2}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-3 font-cormorant text-[clamp(1.6rem,4vw,2.5rem)] font-light leading-[1.1] tracking-[-0.015em] text-olive-700 transition-colors duration-400 group-hover:text-[#f7f3ed]">
                Full Professional
                <br />Dossier, 2025
              </h3>

              <p className="mb-8 max-w-[46ch] font-mono text-[11px] leading-[1.9] tracking-[.03em] text-olive-600 transition-colors duration-400 group-hover:text-olive-200">
                Complete professional narrative spanning strategic leadership,
                technical architecture, and award-winning digital experiences.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-olive-700 bg-olive-700 px-5 py-3 font-syne text-[9px] font-bold uppercase tracking-[.2em] text-[#f7f3ed] transition-[background,border-color] duration-300 hover:border-olive-500 hover:bg-olive-500 group-hover:border-olive-500 group-hover:bg-olive-500"
                >
                  <Eye size={12} />
                  Preview
                  <ArrowUpRight size={10} />
                </a>
                <a
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  className="inline-flex items-center gap-2 border border-olive-200 bg-transparent px-5 py-3 font-syne text-[9px] font-bold uppercase tracking-[.2em] text-olive-600 transition-[border-color,color,background] duration-300 hover:border-olive-500 hover:text-olive-500 group-hover:border-white/20 group-hover:bg-white/5 group-hover:text-white/70"
                >
                  <Download size={12} />
                  Download PDF
                </a>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 border-t border-olive-200 transition-[border-color] duration-400 group-hover:border-white/15">
                {[
                  { val: '4', label: 'Pages' },
                  { val: '12+', label: 'Projects' },
                  { val: "'25", label: 'Edition' },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={[
                      'py-4 text-center',
                      i < 2 ? 'border-r border-olive-200 transition-[border-color] duration-400 group-hover:border-white/10' : '',
                    ].join(' ')}
                  >
                    <div className="font-cormorant text-2xl font-normal text-olive-500 transition-colors duration-400 group-hover:text-olive-300">
                      {s.val}
                    </div>
                    <div className="mt-0.5 font-syne text-[9px] uppercase tracking-[.18em] text-olive-400 transition-colors duration-400 group-hover:text-white/40">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-3">
            {/* Info rows */}
            {highlights.map(({ label, value, desc, Icon }) => (
              <div
                key={label}
                className="group/item relative overflow-hidden border border-olive-200 bg-white p-5 transition-[border-color,transform] duration-350 hover:translate-x-1 hover:border-olive-500"
              >
                {/* Left accent bar */}
                <div className="absolute bottom-0 left-0 top-0 w-0 bg-olive-500 transition-[width] duration-[450ms] ease-[cubic-bezier(.77,0,.175,1)] group-hover/item:w-[3px]" />

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-1.5 flex items-center gap-2">
                      <Icon size={10} className="text-olive-500" strokeWidth={1.5} />
                      <span className="font-syne text-[8.5px] font-bold uppercase tracking-[.28em] text-olive-400">
                        {label}
                      </span>
                    </div>
                    <div className="font-cormorant text-lg text-olive-700 leading-tight">
                      {value}
                    </div>
                    <div className="mt-1 font-mono text-[9.5px] tracking-[.04em] text-olive-500 leading-relaxed">
                      {desc}
                    </div>
                  </div>
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-olive-200 transition-[background,border-color,transform] duration-300 group-hover/item:rotate-[-45deg] group-hover/item:border-olive-500 group-hover/item:bg-olive-500">
                    <ArrowUpRight
                      size={10}
                      className="text-olive-500 transition-colors duration-300 group-hover/item:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Available card — dark */}
            <div className="border border-olive-200 bg-olive-700 p-6">
              <div className="mb-3 font-syne text-[9px] font-bold uppercase tracking-[.28em] text-olive-300">
                Current Status
              </div>
              <div className="mb-2 font-cormorant text-[1.4rem] font-light leading-snug text-[#f7f3ed]">
                Open for strategic<br />opportunities.
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[.06em] text-olive-400">
                <Clock size={9} strokeWidth={1.5} />
                Mar 2025 · Resume verified &amp; current
              </div>
            </div>
          </div>
        </div>

        {/* ══ MARQUEE ══ */}
        <div className="mb-14 overflow-hidden border-b border-t border-olive-200 py-3.5">
          <div
            className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]"
          >
            {MARQUEE_ITEMS.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap font-syne text-[9px] font-bold uppercase tracking-[.28em] text-olive-500"
              >
                {i % 4 === 0 && <span className="text-olive-300">✦</span>}
                {item}
                <span className="text-olive-300">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ FOOTER NOTE ══ */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-cormorant text-lg italic text-olive-500">
            "Designed for rapid evaluation — built for lasting impression."
          </p>
          <span className="font-syne text-[9px] font-bold uppercase tracking-[.2em] text-olive-400">
            Download for full context &amp; archives
          </span>
        </div>

      </div>
    </section>
  );
};

export default Resume;
