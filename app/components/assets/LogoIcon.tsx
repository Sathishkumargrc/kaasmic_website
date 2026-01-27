export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2L38 12V28L20 38L2 28V12L20 2Z"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z"
        fill="url(#logoGold)"
      />
      <path
        d="M20 12V20L26 24"
        stroke="#0C173D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logoGold" x1="8" y1="8" x2="32" y2="32">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#F5D78E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
