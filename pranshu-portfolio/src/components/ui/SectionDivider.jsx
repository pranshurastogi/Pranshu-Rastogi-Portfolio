export default function SectionDivider({ className = "" }) {
  return (
    <div className={`w-full flex justify-center items-center py-2 ${className}`}>
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
