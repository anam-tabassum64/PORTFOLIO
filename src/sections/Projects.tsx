import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import EditorialSectionHeader from '@/components/EditorialSectionHeader';
import { projects } from '@/content/portfolio';

/* ─── Text Scramble Hook ───────────────────────────────────────────────────── */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function useTextScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const scramble = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
    let frame = 0;
    const total = 20;

    const run = () => {
      const progress = frame / total;
      setDisplay(
        original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i / original.length < progress) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      frame++;
      if (frame <= total) {
        frameRef.current = requestAnimationFrame(run);
      } else {
        setDisplay(original);
        isRunningRef.current = false;
      }
    };
    run();
  }, [original]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    isRunningRef.current = false;
    setDisplay(original);
  }, [original]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return { display, scramble, reset };
}

/* ─── Global Spotlight ─────────────────────────────────────────────────────── */

const Spotlight = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spot = spotRef.current;
    if (!container || !spot) return;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
      spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      spot.style.opacity = '1';
    };
    const onLeave = () => { spot.style.opacity = '0'; };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={spotRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
      style={{
        background:
          'radial-gradient(circle 350px at var(--mx, 50%) var(--my, 50%), rgba(108,82,45,0.055) 0%, transparent 70%)',
      }}
    />
  );
};

/* ─── Custom Cursor Dot ────────────────────────────────────────────────────── */

const CursorDot = ({ cardRef }: { cardRef: React.RefObject<HTMLElement> }) => {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const dot = dotRef.current;
    if (!card || !dot) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      dot.style.left = `${e.clientX - r.left}px`;
      dot.style.top = `${e.clientY - r.top}px`;
    };

    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, [cardRef]);

  return (
    <span
      ref={dotRef}
      aria-hidden
      className="pointer-events-none absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-olive-500 opacity-0 transition-opacity duration-200 group-hover:opacity-70"
    />
  );
};

/* ─── 3D Tilt Card ─────────────────────────────────────────────────────────── */

const TILT_DEG = 9;

const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sy = useSpring(ry, { stiffness: 220, damping: 22 });

  const innerX = useMotionValue(0);
  const innerY = useMotionValue(0);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * TILT_DEG * 2);
    rx.set(-y * TILT_DEG);
    innerX.set((e.clientX - r.left));
    innerY.set((e.clientY - r.top));
  }, [rx, ry, innerX, innerY]);

  const handleLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${className}`}
      style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d', transformPerspective: 700 }}
      whileHover={{ zIndex: 2, scale: 1.012 }}
      transition={{ scale: { duration: 0.25 } }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Inner spotlight per card */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 200px at ${innerX}px ${innerY}px, rgba(108,82,45,0.07), transparent 70%)`,
        }}
      />
      <CursorDot cardRef={cardRef as React.RefObject<HTMLElement>} />
      {children}
    </motion.div>
  );
};

/* ─── Project Card ─────────────────────────────────────────────────────────── */

const ProjectCard = ({
  project,
  index,
  isHovered,
  anyHovered,
  onEnter,
  onLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { display, scramble, reset } = useTextScramble(project.title);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ opacity: anyHovered && !isHovered ? 0.38 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <TiltCard className="border border-olive-200 bg-white p-7">
          <div
            onMouseEnter={() => { onEnter(); scramble(); }}
            onMouseLeave={() => { onLeave(); reset(); }}
            className="flex h-full flex-col"
          >
            {/* Top row */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-olive-400">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-olive-400">{project.period}</p>
              </div>

              {/* GitHub — spins on hover */}
              <motion.a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source`}
                whileHover={{ rotate: 15, scale: 1.15 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 380, damping: 14 }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-olive-200 text-olive-500 transition-colors duration-300 hover:border-olive-800 hover:bg-olive-900 hover:text-white"
              >
                <Github size={15} />
              </motion.a>
            </div>

            {/* Scrambling title */}
            <h3 className="mb-4 font-mono text-xl font-medium leading-snug text-olive-800 tracking-tight">
              {display}
            </h3>

            <p className="mb-3 text-sm font-medium leading-relaxed text-olive-700">{project.summary}</p>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-olive-500">{project.details}</p>

            {/* Outcome */}
            <div className="mb-5 flex items-start gap-2 rounded-xl bg-olive-50 px-4 py-3 text-sm text-olive-700">
              <span className="relative mt-1.5 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-olive-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-olive-400" />
              </span>
              <span><span className="font-semibold">Outcome:</span> {project.outcome}</span>
            </div>

            {/* Stack tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.stack.map((item, ti) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.35 + ti * 0.055, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08 }}
                  className="rounded-full border border-olive-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-olive-500 transition-colors duration-200 group-hover:border-olive-300 group-hover:text-olive-700"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* View repo — bottom reveal line + sliding text */}
            <SlideLink href={project.github} />
          </div>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};

/* ─── Slide Link ───────────────────────────────────────────────────────────── */

const SlideLink = ({ href }: { href: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/lnk relative inline-flex items-center gap-1.5 pt-4 text-[11px] font-semibold uppercase tracking-widest text-olive-500 hover:text-olive-800"
    >
      {/* Sliding underline */}
      <span
        className="absolute bottom-3 left-0 h-px bg-olive-800 transition-all duration-500"
        style={{ width: hovered ? '100%' : '0%' }}
      />
      <span className="relative overflow-hidden">
        <motion.span
          className="block"
          animate={{ y: hovered ? '-110%' : '0%' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          View repo
        </motion.span>
        <motion.span
          className="absolute inset-0"
          animate={{ y: hovered ? '0%' : '110%' }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          View repo
        </motion.span>
      </span>
      <motion.span
        animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 18 }}
      >
        <ArrowUpRight size={13} />
      </motion.span>
    </a>
  );
};

/* ─── Section ──────────────────────────────────────────────────────────────── */

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="overflow-hidden px-6 py-16 lg:px-24 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <EditorialSectionHeader
          number="02"
          eyebrow="Selected Work"
          title="Projects with clearer"
          accent="outcomes"
          description="Each project below has a stronger structure: what it does, how it was built, and what kind of problem it solved."
          className="mx-auto mb-10 max-w-xl"
        />

        <div ref={containerRef} className="relative mt-8">
          <Spotlight containerRef={containerRef as React.RefObject<HTMLDivElement>} />

          <div className="relative z-10 grid gap-px bg-olive-100 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                anyHovered={hoveredIndex !== null}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
