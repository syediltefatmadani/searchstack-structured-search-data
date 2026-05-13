import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-semibold tracking-tight ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-primary-foreground shadow-soft">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4-4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-base">SearchStack</span>
    </Link>
  );
}
