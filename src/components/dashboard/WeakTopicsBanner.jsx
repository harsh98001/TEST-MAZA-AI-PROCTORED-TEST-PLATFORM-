import { AlertCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WeakTopicsBanner() {
  return (
    <div className="p-8 rounded-lg border border-[#D64545]/40 bg-[#D64545]/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase">
          <AlertCircle size={13} />
          <span>COMPETENCY ALERT // IDENTIFIED GAP</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-display font-medium text-main">
          Neural Networks & Backpropagation (CAP555 — Unit IV)
        </h4>
        <p className="text-xs font-body text-secondary leading-relaxed">
          Historical accuracy on gradient descent and multi-layer activation functions is below threshold (62%). Drill targeted evaluation questions to recalibrate your competency score.
        </p>
      </div>

      <Link
        to="/practice/machine-learning-python/phase-3"
        className="px-6 py-3.5 rounded bg-[#D64545] hover:bg-[#E05656] text-white font-mono text-xs tracking-mono-label uppercase font-medium inline-flex items-center space-x-2 transition-all shrink-0"
      >
        <span>DRILL TOPIC</span>
        <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}
