import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { PageTransition } from '../components/common/PageTransition';

export function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        <span className="text-xs font-mono tracking-[0.3em] text-[#10B981] uppercase">
          ERROR 404 // INDEX NOT FOUND
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-medium text-[#EDE8D0]">
          CURRICULUM UNMAPPED
        </h1>
        <p className="text-xs sm:text-sm text-[#9EA9A0] font-sans max-w-sm">
          The requested academic directory or examination phase does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-[#10B981] text-[#040706] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#059669] transition-colors shadow-lg"
        >
          <ArrowLeft size={14} />
          <span>RETURN TO DASHBOARD</span>
        </Link>
      </div>
    </PageTransition>
  );
}
