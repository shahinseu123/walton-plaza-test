'use client';
 
import { useEffect } from 'react';
 
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
 
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error reporting service (e.g. Sentry)
    console.error('[App Error]', error);
  }, [error]);
 
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-900/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-900/10 blur-[100px]" />
      </div>
 
      <div className="relative z-10 max-w-lg w-full">
        {/* Error code badge */}
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-800/60 bg-red-950/40 px-3 py-1 text-xs font-mono text-red-400 tracking-widest uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Error
            {error.digest && (
              <span className="text-red-600 ml-1">· {error.digest}</span>
            )}
          </span>
        </div>
 
        {/* Heading */}
        <h1
          className="text-5xl font-bold tracking-tight text-white mb-4 leading-none"
          style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
        >
          Something went{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            wrong
          </span>
        </h1>
 
        {/* Description */}
        <p className="text-[#888] text-base leading-relaxed mb-2">
          An unexpected error occurred while loading this page. This has been
          logged and we&apos;re looking into it.
        </p>
 
        {/* Error message (dev-friendly) */}
        {error.message && (
          <div className="mt-5 mb-8 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="text-xs font-mono text-[#666] break-words">
              <span className="text-red-500/80 mr-2">▸</span>
              {error.message}
            </p>
          </div>
        )}
 
        {/* Actions */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black text-sm font-semibold px-5 py-2.5 transition-all duration-150 hover:bg-white/90 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Try again
          </button>
 
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm font-medium px-5 py-2.5 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}