"use client"
import Link from 'next/link';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorProps) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-5 bg-[#F8F6F0]">
      <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48]">
        Unexpected Disruption
      </span>
      <h1 className="text-3xl font-light text-[#121212]">An oversight has occurred</h1>
      <p className="text-xs text-[#736E65] max-w-md font-mono bg-white/70 p-3 rounded-xl border border-[#E8E3D9]">
        {error?.message || "Something went wrong while composing this page."}
      </p>
      
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.15em] hover:bg-[#8C6F48] transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full border border-[#C2A379] text-[#121212] text-xs uppercase tracking-[0.15em] hover:bg-white transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;