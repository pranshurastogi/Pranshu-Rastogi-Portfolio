// src/app/projects/[slug]/not-found.jsx
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 bg-base-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#AEEA00] mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">The requested blockchain project could not be found.</p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#AEEA00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#39FF14] transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
