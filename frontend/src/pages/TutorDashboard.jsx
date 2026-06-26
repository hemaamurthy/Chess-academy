import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudents, getSessions } from '../services/api';
import { Users, CalendarDays, Clock } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function TutorDashboard() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStudents(), getSessions()])
      .then(([s, sess]) => {
        setStudents(s.data);
        setSessions(sess.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = sessions.filter((s) => s.date >= today).length;

  const stats = [
    { icon: Users, label: 'Registered Students', value: students.length, color: 'text-blue-400' },
    { icon: CalendarDays, label: 'Total Sessions', value: sessions.length, color: 'text-gold-400' },
    { icon: Clock, label: 'Upcoming Sessions', value: upcoming, color: 'text-green-400' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Force password change */}
      {user.must_change_password === 1 && <ChangePasswordModal forced onClose={() => {}} />}

      <div className="mb-8 animate-fade-in">
        <p className="text-gold-500 text-sm font-medium mb-1">Tutor Dashboard</p>
        <h1 className="text-3xl font-display font-bold">
          Welcome, <span className="gold-gradient">{user.full_name.split(' ')[0]}</span> ♛
        </h1>
        <p className="text-gray-400 mt-2">Here's an overview of your Chess Academy.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-5">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-6 animate-slide-up">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center">
                  <Icon size={20} className={color} />
                </div>
                <span className={`text-3xl font-bold ${color}`}>{value}</span>
              </div>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <div className="card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-gold-500">♟</span> Quick Actions
          </h3>
          <div className="space-y-3">
            <a href="/tutor/sessions" className="block btn-gold text-center">
              + Create New Session
            </a>
            <a href="/tutor/students" className="block btn-outline text-center">
              View All Students
            </a>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-gold-500">♛</span> Recent Sessions
          </h3>
          {sessions.slice(0, 3).map((s) => (
            <div key={s.id} className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0">
              <div className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
              <div>
                <p className="text-sm font-medium">{s.title}</p>
                <p className="text-xs text-gray-500">{s.date} at {s.time}</p>
              </div>
            </div>
          ))}
          {sessions.length === 0 && <p className="text-sm text-gray-500">No sessions yet.</p>}
        </div>
      </div>
    </div>
  );
}
