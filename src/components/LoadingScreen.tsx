import { useEffect, useRef, useState } from "react";

// ── Add to <head> in your layout ──────────────────────────────────────────
// <link rel="preconnect" href="https://fonts.googleapis.com" />
// <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
// ─────────────────────────────────────────────────────────────────────────

interface LoadingScreenProps {
  onComplete?: () => void;
}

const CIRCUMFERENCE = 502; // matches r=80 arc in SVG (2π×80≈502)

const CSS = `
@keyframes at2-spin  { to { transform: rotate(360deg) } }
@keyframes at2-rev   { to { transform: rotate(-360deg) } }
@keyframes at2-name  { from { opacity:0; transform:translateY(100%) } to { opacity:1; transform:translateY(0) } }
@keyframes at2-sep   { from { transform:scaleX(0) } to { transform:scaleX(1) } }
@keyframes at2-fade  { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
@keyframes at2-exit  { from{transform:scale(1);opacity:1} to{transform:scale(1.06);opacity:0} }
`;

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    const DURATION = 3600;
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const t = Math.min((now - startRef.current) / DURATION, 1);
      setProgress(ease(t) * 100);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => { setDone(true); onComplete?.(); }, 700);
        }, 280);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [onComplete]);

  if (done) return null;

  const arcOffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
  const displayProgress = Math.round(progress);

  return (
    <>
      <style>{CSS}</style>
      <div
        role="status"
        aria-label="Loading portfolio"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "#f0ece4",
          display: "grid", placeItems: "center",
          overflow: "hidden",
          animation: exiting ? "at2-exit .7s cubic-bezier(.4,0,.2,1) forwards" : undefined,
        }}
      >
        {/* Linen grid texture */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(180,168,148,.1) 39px,rgba(180,168,148,.1) 40px),
            repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(180,168,148,.08) 39px,rgba(180,168,148,.08) 40px)
          `,
        }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2 }}>

          {/* ── Rings ── */}
          <div style={{ position: "relative", width: 220, height: 220, marginBottom: 36 }}>

            {/* Outer dashed */}
            <svg style={{ position:"absolute", inset:0, animation:"at2-spin 12s linear infinite" }} viewBox="0 0 220 220" fill="none">
              <circle cx="110" cy="110" r="107" stroke="#1a1814" strokeWidth=".6" strokeDasharray="4 10" opacity=".25"/>
            </svg>

            {/* Inner dotted */}
            <svg style={{ position:"absolute", inset:20, animation:"at2-rev 8s linear infinite" }} viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="87" stroke="#c4522a" strokeWidth=".8" strokeDasharray="1.5 8" opacity=".35"/>
            </svg>

            {/* Progress arc track + fill */}
            <svg style={{ position:"absolute", inset:44 }} viewBox="0 0 132 132" fill="none">
              <circle cx="66" cy="66" r="63" stroke="#e8e2d9" strokeWidth="1.5"/>
              <circle cx="66" cy="66" r="63"
                stroke="#1a1814" strokeWidth="1.5"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={arcOffset}
                strokeLinecap="round"
                transform="rotate(-90 66 66)"
                style={{ transition: "stroke-dashoffset .14s cubic-bezier(.22,1,.36,1)" }}
              />
            </svg>

            {/* Cardinal ticks */}
            <svg style={{ position:"absolute", inset:0 }} viewBox="0 0 220 220" fill="none">
              <g opacity=".2">
                <line x1="110" y1="4"   x2="110" y2="14"  stroke="#1a1814" strokeWidth=".8"/>
                <line x1="110" y1="206" x2="110" y2="216" stroke="#1a1814" strokeWidth=".8"/>
                <line x1="4"   y1="110" x2="14"  y2="110" stroke="#1a1814" strokeWidth=".8"/>
                <line x1="206" y1="110" x2="216" y2="110" stroke="#1a1814" strokeWidth=".8"/>
              </g>
            </svg>

            {/* Centre dot + pct */}
            <div style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              display:"flex", flexDirection:"column", alignItems:"center", gap:6,
            }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#c4522a" }}/>
              <span style={{
                fontFamily:"'Space Mono',monospace",
                fontSize:16, fontWeight:700, color:"#1a1814", letterSpacing:".04em",
              }}>
                {displayProgress}%
              </span>
            </div>
          </div>

          {/* Name */}
          <div style={{ overflow:"hidden", width:"min(760px,calc(100vw - 32px))", textAlign:"center" }}>
            <span style={{
              display:"block",
              fontFamily:"'Playfair Display',serif",
              fontWeight:700,
              fontSize:"clamp(2rem,6.2vw,5.4rem)",
              lineHeight:1.02,
              letterSpacing:"-.01em",
              whiteSpace:"nowrap",
              color:"#1a1814",
              animation:"at2-name 1.1s cubic-bezier(.22,1,.36,1) .45s both",
            }}>
              Anam <em style={{ fontStyle:"italic", fontWeight:400, color:"#c4522a" }}>Tabassum</em>
            </span>
          </div>

          {/* Separator */}
          <div style={{
            width:"min(420px,calc(100vw - 48px))", height:1,
            background:"#1a1814", margin:"16px 0",
            transformOrigin:"left",
            animation:"at2-sep 1s cubic-bezier(.22,1,.36,1) .9s both",
          }}/>

          <p style={{
            fontFamily:"'Space Mono',monospace",
            fontSize:12, letterSpacing:".24em", textTransform:"uppercase",
            color:"#8c8272", animation:"at2-fade .85s 1.1s ease both",
          }}>
            Creative Portfolio · 2025
          </p>

        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
