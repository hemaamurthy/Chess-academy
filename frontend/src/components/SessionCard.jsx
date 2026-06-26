import { ExternalLink, Clock, Calendar } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';

export default function SessionCard({ session, isTutor, onEdit, onDelete }) {
  const countdown = useCountdown(session.date, session.time);

  const formatDate = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

  return (
    <div className="card p-6 animate-slide-up hover:border-gold-700/50 transition-colors group">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
            {session.title}
          </h3>
          {session.description && (
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">{session.description}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-gold-600/10 border border-gold-700/30 flex items-center justify-center shrink-0">
          <span className="text-lg">♟</span>
        </div>
      </div>

      {/* Date/Time */}
      <div className="flex flex-wrap gap-3 mb-5 text-sm text-gray-400">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} className="text-gold-500" />
          {formatDate(session.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-gold-500" />
          {session.time}
        </span>
      </div>

      {/* Countdown */}
      {countdown && !countdown.started && (
        <div className="mb-5 bg-gray-800/60 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Starts In</p>
          <div className="flex gap-3">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Min' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-gold-400 tabular-nums">{val}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {countdown?.started && (
        <div className="mb-5 bg-green-900/20 border border-green-700/30 rounded-xl px-4 py-3">
          <span className="text-green-400 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Session is Live!
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        {!isTutor && (
          <a
            href={session.google_meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex items-center gap-2 py-2 text-sm"
          >
            <ExternalLink size={15} />
            Join Live Session
          </a>
        )}

        {isTutor && (
          <>
            <button
              onClick={() => onEdit(session)}
              className="btn-outline py-2 px-4 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(session)}
              className="py-2 px-4 text-sm border border-red-700/50 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors"
            >
              Delete
            </button>
            <a
              href={session.google_meet_link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={14} />
              Meet Link
            </a>
          </>
        )}
      </div>
    </div>
  );
}
