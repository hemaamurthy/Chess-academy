import { useState, useEffect } from 'react';
import { getStudents } from '../services/api';
import { Search, Users } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      getStudents(search)
        .then((res) => setStudents(res.data))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 animate-fade-in">
        <p className="text-gold-500 text-sm font-medium mb-1">Tutor</p>
        <h1 className="text-3xl font-display font-bold">Registered Students</h1>
        <p className="text-gray-400 mt-1">Search and manage all enrolled students.</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      ) : students.length === 0 ? (
        <div className="card p-12 text-center">
          <Users className="mx-auto text-gray-600 mb-4" size={40} />
          <p className="text-gray-400">No students found{search ? ' for this search' : ''}.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{students.length} student{students.length !== 1 ? 's' : ''} found</p>
          {/* Desktop table */}
          <div className="card overflow-hidden hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-left">
                  <th className="px-5 py-4 text-gray-400 font-medium">#</th>
                  <th className="px-5 py-4 text-gray-400 font-medium">Name</th>
                  <th className="px-5 py-4 text-gray-400 font-medium">Email</th>
                  <th className="px-5 py-4 text-gray-400 font-medium">Age</th>
                  <th className="px-5 py-4 text-gray-400 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-600/20 border border-gold-700/30 flex items-center justify-center text-xs font-bold text-gold-400">
                          {s.full_name[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{s.full_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400">{s.email}</td>
                    <td className="px-5 py-4 text-gray-400">{s.age}</td>
                    <td className="px-5 py-4 text-gray-400">{formatDate(s.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {students.map((s, i) => (
              <div key={s.id} className="card p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-700/30 flex items-center justify-center font-bold text-gold-400">
                  {s.full_name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{s.full_name}</p>
                  <p className="text-sm text-gray-400 truncate">{s.email}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>Age {s.age}</span>
                    <span>Joined {formatDate(s.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
