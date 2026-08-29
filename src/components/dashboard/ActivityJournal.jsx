import { ArrowUpRight, Shield, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatTimeAgo } from '../../utils/formatters';

export function ActivityJournal() {
  const { recentActivity } = useApp();

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-end hairline-b pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-mono-label text-[#D64545] uppercase block mb-1">
            02 / TELEMETRY LOG
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-main uppercase">
            RECENT EVALUATIONS
          </h3>
        </div>
        <Link
          to="/performance"
          className="text-xs font-mono text-secondary hover:text-main flex items-center space-x-1 uppercase"
        >
          <span>FULL AUDIT</span>
          <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="space-y-3 font-mono">
        {recentActivity.length === 0 ? (
          <div className="py-12 text-center text-xs text-muted">
            NO RECORDED SESSIONS. COMPLETE AN EVALUATION PHASE TO LOG TELEMETRY.
          </div>
        ) : (
          recentActivity.slice(0, 4).map((activity) => (
            <div
              key={activity.id}
              className="p-5 rounded-lg border border-app bg-surface flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#D64545]/40 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-9 h-9 rounded flex items-center justify-center text-xs ${
                    activity.type === 'EXAM'
                      ? 'bg-[#D64545]/15 text-[#D64545] border border-[#D64545]/30'
                      : 'bg-surface-raised text-main border border-app'
                  }`}
                >
                  {activity.type === 'EXAM' ? <Shield size={16} /> : <BookOpen size={16} />}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <strong className="text-sm font-display text-main font-medium">
                      {activity.courseTitle}
                    </strong>
                    <span className="text-[10px] text-muted">
                      // {activity.phaseTitle}
                    </span>
                  </div>
                  <span className="text-xs text-secondary">
                    {activity.score}/{activity.total} Accurate • {activity.accuracy}% Score
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6 self-end sm:self-auto text-xs">
                <span className="text-[10px] text-muted">
                  {formatTimeAgo(activity.timestamp)}
                </span>
                <Link
                  to={`/practice/${activity.courseId}/phase-1`}
                  className="text-xs text-[#D64545] hover:underline uppercase"
                >
                  RETAKE →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
