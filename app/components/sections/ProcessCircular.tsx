"use client";

import { motion } from "framer-motion";

// Steps positioned on a clock face. angle: -90 = top (12 o'clock)
const silverSteps = [
  { id: "01", title: "Sign up /\nLog in", icon: "user", angle: -90 },
  { id: "02", title: "View live\nsilver price", icon: "chart", angle: -30 },
  { id: "03", title: "Choose silver\nquantity", icon: "weight", angle: 30 },
  { id: "04", title: "Make\npayment", icon: "card", angle: 90 },
  { id: "05", title: "Silver\npurchased", icon: "purchased", angle: 150 },
  { id: "06", title: "Securely delivered\nin your address", icon: "vault", angle: 210 },
];

const goldSteps = [
  { id: "01", title: "Sign up /\nLog in", icon: "user", angle: -90 },
  { id: "02", title: "View live\ngold price", icon: "chart", angle: -30 },
  { id: "03", title: "Choose gold\nquantity", icon: "weight", angle: 30 },
  { id: "04", title: "Make\npayment", icon: "card", angle: 90 },
  { id: "05", title: "Gold\npurchased", icon: "purchased", angle: 150 },
  { id: "06", title: "Securely delivered\nin your address", icon: "vault", angle: 210 },
];

const badges = [
  // { title: "100% Secure", subtitle: "Safe & insured storage", icon: "shield" },
  { title: "Transparent", subtitle: "Live market prices", icon: "eye" },
  { title: "Flexible", subtitle: "Buy any quantity", icon: "rupee" },
  { title: "24x7 Access", subtitle: "Anytime, anywhere", icon: "clock" },
  { title: "Pure & Certified", subtitle: "24K Gold | 999 Silver", icon: "sparkle" },
];

// ── Helper: degree → radian ──────────────────────────────────────────────────
function toRad(deg: number) { return (deg * Math.PI) / 180; }

// ── SVG icon map ─────────────────────────────────────────────────────────────
type IconFC = React.FC<{ color: string; size?: number }>;

const SvgIcons: Record<string, IconFC> = {
  user: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="13" r="7" />
      <path d="M5 34c0-7.18 5.82-13 13-13s13 5.82 13 13" />
    </svg>
  ),
  chart: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 27L13 17l7 5 11-14" />
      <path d="M5 31h26" />
    </svg>
  ),
  weight: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="18" width="24" height="14" rx="3" />
      <path d="M13 18v-5a5 5 0 0 1 10 0v5" />
      <line x1="18" y1="22" x2="18" y2="28" />
      <line x1="15" y1="25" x2="21" y2="25" />
    </svg>
  ),
  card: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="30" height="20" rx="3" />
      <line x1="3" y1="15" x2="33" y2="15" />
      <line x1="8" y1="22" x2="14" y2="22" />
    </svg>
  ),
  purchased: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 5L5 12l13 7 13-7L18 5Z" />
      <path d="M5 26l13 7 13-7" />
      <path d="M5 19l13 7 13-7" />
    </svg>
  ),
  vault: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="28" height="28" rx="4" />
      <circle cx="18" cy="18" r="6" />
      <line x1="18" y1="12" x2="18" y2="14" />
      <line x1="18" y1="22" x2="18" y2="24" />
      <line x1="12" y1="18" x2="14" y2="18" />
      <line x1="22" y1="18" x2="24" y2="18" />
    </svg>
  ),
  shield: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 4L5 9v10c0 7 5.5 12.5 13 14 7.5-1.5 13-7 13-14V9L18 4Z" />
      <polyline points="13,18 16,21 23,14" />
    </svg>
  ),
  eye: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="18" cy="18" rx="15" ry="9" />
      <circle cx="18" cy="18" r="4" />
    </svg>
  ),
  rupee: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="9" x2="26" y2="9" />
      <line x1="10" y1="15" x2="26" y2="15" />
      <line x1="10" y1="27" x2="23" y2="9" />
      <path d="M14 15c0 4 3 6 6 6" />
    </svg>
  ),
  clock: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="14" />
      <polyline points="18,10 18,18 24,24" />
    </svg>
  ),
  sparkle: ({ color, size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 5l3 10.5L32 18l-11 2.5L18 31l-3-10.5L4 18l11-2.5L18 5Z" />
    </svg>
  ),
};

// ── Metallic coin ─────────────────────────────────────────────────────────────
function Coin({ type }: { type: "gold" | "silver" }) {
  const isGold = type === "gold";
  return (
    <div
      className="relative flex items-center justify-center rounded-full overflow-hidden select-none"
      style={{
        width: 170,
        height: 170,
        background: isGold
          ? "radial-gradient(circle at 35% 32%, #FDE68A 0%, #D4AF37 48%, #92400E 100%)"
          : "radial-gradient(circle at 35% 32%, #F9FAFB 0%, #9CA3AF 48%, #374151 100%)",
        boxShadow: isGold
          ? "0 10px 40px rgba(212,175,55,0.45), 0 2px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.5)"
          : "0 10px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.5)",
      }}
    >
      {/* Outer engraved ring */}
      <div
        className="absolute rounded-full border border-white/20"
        style={{ inset: 10 }}
      />
      {/* Content */}
      <div className="flex flex-col items-center text-white z-10">
        <span className="text-[9px] font-bold tracking-[0.25em] opacity-85 mb-1">KAASMIC</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="mb-1 opacity-90">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
        </svg>
        <span className="text-[22px] font-black leading-none tracking-tight">
          {isGold ? "999.9" : "999"}
        </span>
        <span className="text-[14px] font-bold tracking-[0.18em] mt-0.5">
          {isGold ? "GOLD" : "SILVER"}
        </span>
      </div>
      {/* Highlight sheen */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 55%)" }}
      />
    </div>
  );
}

// ── Circular diagram ──────────────────────────────────────────────────────────
function CircularProcess({
  color,
  type,
  steps,
}: {
  color: string;
  type: "gold" | "silver";
  steps: typeof silverSteps;
}) {
  const SIZE = 560;   // total container size
  const CX = 280;   // center X
  const CY = 280;   // center Y
  const RING_R = 192;   // arc ring radius
  const BADGE_R = 192;   // number badge radius (on the ring)
  const ICON_R = 126;   // icon box radius (inside the ring)
  const LABEL_R = 252;   // text label radius (outside the ring)

  function pt(angleDeg: number, r: number) {
    return {
      x: CX + r * Math.cos(toRad(angleDeg)),
      y: CY + r * Math.sin(toRad(angleDeg)),
    };
  }

  return (
    <div style={{ width: SIZE, height: SIZE }} className="relative ">

      {/* SVG: arcs + arrowheads + number badges */}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0">
        <defs>
          <marker id={`arrow-${type}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <polygon points="0 1, 8 4, 0 7" fill={color} opacity="0.6" />
          </marker>
        </defs>

        {/* Arc segments */}
        {steps.map((_, i) => {
          const s = pt(i * 60 - 90 + 7, RING_R);
          const e = pt(i * 60 - 90 + 53, RING_R);
          return (
            <path
              key={i}
              d={`M ${s.x} ${s.y} A ${RING_R} ${RING_R} 0 0 1 ${e.x} ${e.y}`}
              fill="none" stroke={color} strokeWidth="3.5"
              strokeLinecap="round" opacity="0.5"
              markerEnd={`url(#arrow-${type})`}
            />
          );
        })}

        {/* Number badges on ring */}
        {steps.map((step, i) => {
          const { x, y } = pt(step.angle, BADGE_R);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="white" />
              <circle cx={x} cy={y} r="12" fill={color} />
              <text x={x} y={y + 0.5} textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="8.5" fontWeight="700" fontFamily="inherit">
                {step.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Icon boxes — inside the ring */}
      {steps.map((step, i) => {
        const { x, y } = pt(step.angle, ICON_R);
        const Icon = SvgIcons[step.icon];
        return (
          <div
            key={`icon-${i}`}
            className="absolute flex items-center justify-center bg-white rounded-2xl shadow-md border border-gray-100"
            style={{ width: 52, height: 52, left: x, top: y, transform: "translate(-50%,-50%)", zIndex: 5 }}
          >
            {Icon && <Icon color="#4B5563" size={26} />}
          </div>
        );
      })}

      {/* Text labels — outside the ring */}
      {steps.map((step, i) => {
        const { x, y } = pt(step.angle, LABEL_R);
        return (
          <div
            key={`label-${i}`}
            className="absolute text-center"
            style={{
              left: x, top: y,
              transform: "translate(-50%,-50%)",
              width: 90,
            }}
          >
            <p className="font-semibold text-gray-700 leading-snug" style={{ fontSize: 11, whiteSpace: "pre-line" }}>
              {step.title}
            </p>
          </div>
        );
      })}

      {/* Coin */}
      <div className="absolute z-10" style={{ left: CX, top: CY, transform: "translate(-50%,-50%)" }}>
        <Coin type={type} />
      </div>
    </div>
  );
}

// ── Wrapper to make it responsive ─────────────────────────────────────────────
function ResponsiveCircularProcess(props: {
  color: string;
  type: "gold" | "silver";
  steps: typeof silverSteps;
}) {
  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden py-10 sm:py-0 h-[400px] sm:h-[600px]">
      <div className="scale-[0.55] sm:scale-[0.8] lg:scale-100 origin-center transition-transform duration-500">
        <CircularProcess {...props} />
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ProcessCircular() {
  return (
    <section className="py-12 sm:py-20 bg-white overflow-hidden hidden  lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            How it <span className="text-[#D4AF37]">works</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 bg-gray-200" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <div className="h-px w-20 bg-gray-200" />
          </div>
          <p className="text-gray-500">
            Buy 24K Gold &amp; 999 Silver. Safe. Transparent. Convenient.
          </p>
        </motion.div>

        {/* Diagrams */}
        <div className="relative flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-0">

          {/* Silver */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-3 px-8 py-2.5 bg-[#3D2D6E] rounded-full flex items-center gap-2 shadow">
              <span className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[9px]">🪙</span>
              <span className="text-white font-bold text-lg">Buy Silver</span>
            </div>
            <p className="text-[#3D2D6E] text-[11px] font-bold tracking-widest mb-4 uppercase">
              999 Pure Silver
            </p>
            <ResponsiveCircularProcess color="#6B5DD3" type="silver" steps={silverSteps} />
          </div>

          {/* Vertical separator */}
          <div className="hidden lg:block self-stretch w-px bg-gray-100 mx-4 mt-20" />

          {/* Gold */}
          <div className="flex-1 flex flex-col items-center">
            <div className="mb-3 px-8 py-2.5 bg-[#D4AF37] rounded-full flex items-center gap-2 shadow">
              <span className="w-5 h-5 rounded-full bg-yellow-200 flex items-center justify-center text-[9px]">🪙</span>
              <span className="text-white font-bold text-lg">Buy Gold</span>
            </div>
            <p className="text-[#D4AF37] text-[11px] font-bold tracking-widest mb-4 uppercase">
              24K Pure Gold
            </p>
            <ResponsiveCircularProcess color="#D4AF37" type="gold" steps={goldSteps} />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {badges.map((b, i) => {
            const Icon = SvgIcons[b.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="shrink-0">
                  {Icon && <Icon color="#6B7280" size={30} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 leading-tight">{b.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{b.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
