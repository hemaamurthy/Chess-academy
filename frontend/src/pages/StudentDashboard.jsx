import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSessions } from '../services/api';
import SessionCard from '../components/SessionCard';
import { CalendarX } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions()
      .then((res) => setSessions(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Filter upcoming (today or future)
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = sessions.filter((s) => s.date >= today);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <p className="text-gold-500 text-sm font-medium mb-1">Student Dashboard</p>
        <h1 className="text-3xl font-display font-bold">
          Welcome, <span className="gold-gradient">{user.full_name.split(' ')[0]}</span> ♟
        </h1>
        <p className="text-gray-400 mt-2">Your upcoming live chess sessions are below.</p>
      </div>

      {/* Sessions */}
      <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
        <span className="w-2 h-2 bg-gold-500 rounded-full" />
        Upcoming Live Sessions
      </h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      ) : upcoming.length === 0 ? (
        <div className="card p-12 text-center">
          <CalendarX className="mx-auto text-gray-600 mb-4" size={40} />
          <h3 className="text-lg font-semibold text-gray-400">No Upcoming Live Sessions</h3>
          <p className="text-sm text-gray-500 mt-2">Check back soon — your tutor will schedule sessions here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {upcoming.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  );
}
