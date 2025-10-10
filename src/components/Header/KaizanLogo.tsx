export default function KaizanLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kaizan logo"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect rx="14" width="64" height="64" fill="url(#g)" />
      <g transform="translate(12,12)">
        <path d="M12 0 L0 12 L6 12 L0 24 L6 24 L18 12 L12 12 L24 0 Z" fill="white" opacity="0.9" />
        <circle cx="32" cy="20" r="5" fill="white" opacity="0.9" />
      </g>
    </svg>
  );
}