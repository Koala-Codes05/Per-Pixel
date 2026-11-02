import type { SorsoFlavourId } from "@/lib/sorso-flavours";

const FLAVOUR_ART: Record<
  SorsoFlavourId,
  { gradient: string; glass: string; accent: string; cap: string; label: string }
> = {
  rosso: { gradient: "liq-rosso", glass: "#B3121A", accent: "#D42C0C", cap: "#2B0B10", label: "ROSSO 0.0%" },
  rosa: { gradient: "liq-rosa", glass: "#FF5F6D", accent: "#FF5F6D", cap: "#D42C0C", label: "ROSA 0.0%" },
  chinotto: { gradient: "liq-chinotto", glass: "#3A140C", accent: "#3A140C", cap: "#2B0B10", label: "CHINOTTO 0.0%" },
};

export function BottleDefs() {
  return (
    <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="sorso-clip">
          <path d="M46,508 Q31,508 32,494 L72,186 Q74,170 85,160 L85,92 Q85,86 91,86 L109,86 Q115,86 115,92 L115,160 Q126,170 128,186 L168,494 Q169,508 154,508 Z" />
        </clipPath>
        <linearGradient id="liq-rosso" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C0E14" />
          <stop offset="35%" stopColor="#E52614" />
          <stop offset="70%" stopColor="#F2381C" />
          <stop offset="100%" stopColor="#8A0C10" />
        </linearGradient>
        <linearGradient id="liq-rosa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D94858" />
          <stop offset="35%" stopColor="#FF6B7D" />
          <stop offset="70%" stopColor="#FF8A98" />
          <stop offset="100%" stopColor="#C2384A" />
        </linearGradient>
        <linearGradient id="liq-chinotto" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#240B06" />
          <stop offset="35%" stopColor="#4E1A0C" />
          <stop offset="70%" stopColor="#6E2814" />
          <stop offset="100%" stopColor="#1E0804" />
        </linearGradient>
        <linearGradient id="sorso-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity=".32" />
          <stop offset="18%" stopColor="#fff" stopOpacity=".04" />
          <stop offset="72%" stopColor="#000" stopOpacity="0" />
          <stop offset="88%" stopColor="#000" stopOpacity=".18" />
          <stop offset="100%" stopColor="#fff" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id="sorso-shadow">
          <stop offset="0%" stopColor="#2B0B10" stopOpacity=".36" />
          <stop offset="100%" stopColor="#2B0B10" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function SorsoBottle({ flavour, className }: { flavour: SorsoFlavourId; className?: string }) {
  const a = FLAVOUR_ART[flavour];
  return (
    <svg className={className} viewBox="0 0 200 540" aria-hidden="true">
      <ellipse cx="100" cy="514" rx="88" ry="12" fill="url(#sorso-shadow)" />
      <g clipPath="url(#sorso-clip)">
        <rect width="200" height="540" fill={a.glass} opacity=".14" />
        <path d="M0,178 L200,178 L200,540 L0,540 Z" fill={`url(#${a.gradient})`} />
        <path d="M0,178 L200,178" stroke="#fff" strokeWidth="2.5" strokeOpacity=".5" fill="none" />
        <rect width="200" height="540" fill="url(#sorso-sheen)" />
      </g>
      <path
        d="M46,508 Q31,508 32,494 L72,186 Q74,170 85,160 L85,92 Q85,86 91,86 L109,86 Q115,86 115,92 L115,160 Q126,170 128,186 L168,494 Q169,508 154,508 Z"
        fill="none"
        stroke="#2B0B10"
        strokeOpacity=".25"
        strokeWidth="1.5"
      />
      <path d="M50,476 L82,196 L89,192 L60,476 Z" fill="#fff" opacity=".35" />
      <path d="M150,470 L124,214 L127,212 L155,470 Z" fill="#fff" opacity=".18" />
      <rect x="85" y="112" width="30" height="20" fill="#FFF3EA" />
      <g>
        <path d="M57,300 L143,300 L157,414 L43,414 Z" fill="#FFF3EA" />
        <path d="M59,303 L141,303 L154,411 L46,411 Z" fill="none" stroke={a.accent} strokeWidth="0.75" strokeOpacity=".4" />
        <text className="sorso-b-brand" x="100" y="344" textAnchor="middle" fill={a.accent}>
          Sorso
        </text>
        <text className="sorso-b-flavour" x="100" y="375" textAnchor="middle" fill={a.accent}>
          {a.label}
        </text>
        <text className="sorso-b-sub" x="100" y="391" textAnchor="middle" fill={a.accent}>
          BITTER APERITIVO SODA
        </text>
        <text className="sorso-b-meta" x="100" y="405" textAnchor="middle" fill={a.accent}>
          250 ML · TORINO
        </text>
      </g>
      <g>
        <rect x="80" y="60" width="40" height="26" rx="3" fill={a.cap} />
        <rect x="83" y="63" width="34" height="3" rx="1.5" fill="#fff" opacity=".35" />
        <path d="M80,84 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 l4,6 l4,-6 Z" fill={a.cap} />
      </g>
    </svg>
  );
}
