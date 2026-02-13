export default function SectionDivider({ className = "" }) {
  return (
    <div className={`w-full flex justify-center items-center py-2 ${className}`}>
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        className="animate-pulse"
      >
        <rect x="0" y="8" width="40" height="8" rx="4" fill="#39FF14" opacity="0.18" />
        <rect x="40" y="10" width="8" height="4" rx="2" fill="#AEEA00" />
        <rect x="56" y="10" width="8" height="4" rx="2" fill="#00e0ff" />
        <rect x="72" y="10" width="8" height="4" rx="2" fill="#a259ff" />
        <rect x="88" y="8" width="32" height="8" rx="4" fill="#39FF14" opacity="0.18" />
      </svg>
    </div>
  );
}
