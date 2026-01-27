const gold = "#D4AF37";

export function WalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path
        d="M8 20h48v32H8V20z"
        stroke={gold}
        strokeWidth="2"
        fill="rgba(212,175,55,0.1)"
      />
      <path d="M8 28h48" stroke={gold} strokeWidth="2" />
      <ellipse cx="32" cy="36" rx="8" ry="6" stroke={gold} strokeWidth="2" fill="none" />
      <path
        d="M12 20V14a4 4 0 014-4h32a4 4 0 014 4v6"
        stroke={gold}
        strokeWidth="2"
      />
      <circle cx="44" cy="36" r="3" fill={gold} />
    </svg>
  );
}

export function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M12 44V28h10v16H12z" fill={gold} opacity="0.8" />
      <path d="M27 44V20h10v24H27z" fill={gold} opacity="0.9" />
      <path d="M42 44V12h10v32H42z" fill={gold} />
      <path d="M12 28l10-12 10 8 10-16 10 12" stroke={gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 48h48" stroke={gold} strokeWidth="1.5" />
    </svg>
  );
}

export function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
      <ellipse cx="20" cy="32" rx="12" ry="8" stroke={gold} strokeWidth="2" fill="rgba(212,175,55,0.2)" />
      <ellipse cx="44" cy="28" rx="12" ry="8" stroke={gold} strokeWidth="2" fill="rgba(212,175,55,0.3)" />
      <rect x="26" y="20" width="16" height="10" rx="2" stroke={gold} strokeWidth="2" fill="rgba(212,175,55,0.15)" transform="rotate(-10 34 25)" />
      <circle cx="32" cy="40" r="6" stroke={gold} strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="40" r="3" fill={gold} />
    </svg>
  );
}
