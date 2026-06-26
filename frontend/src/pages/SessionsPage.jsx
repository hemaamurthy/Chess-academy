import { useState, useEffect } from 'react';
import { getSessions, deleteSession } from '../services/api';
import SessionCard from '../components/SessionCard';
import SessionModal from '../components/SessionModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Plus, CalendarX } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalSession, setModalSession] = useState(undefined); // undefined=closed, null=create, obj=edit
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    getSessions()
      .then((res) => setSessions(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async () => {
    try {
      await deleteSession(deleteTarget.id);
      toast.success('Session deleted');
      setSessions((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    } catch {
      toast.error('Failed to delete session');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div>
          <p className="text-gold-500 text-sm font-medium mb-1">Tutor</p>
          <h1 className="text-3xl font-display font-bold">Manage Sessions</h1>
        </div>
        <button
          onClick={() => setModalSession(null)}
          className="btn-gold flex items-center gap-2"
        >
          <Plus size={18} />
          New Session
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="card p-12 text-center">
          <CalendarX className="mx-auto text-gray-600 mb-4" size={40} />
          <h3 className="text-lg font-semibold text-gray-400">No Sessions Yet</h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">Create your first session so students can join live.</p>
          <button onClick={() => setModalSession(null)} className="btn-gold">
            + Create Session
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {sessions.map((s) => (
            <SessionCard
              key={s.id}
              session={s}
              isTutor
              onEdit={setModalSession}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Session create/edit modal */}
      {modalSession !== undefined && (
        <SessionModal
          session={modalSession}
          onClose={() => setModalSession(undefined)}
          onSaved={() => { setModalSession(undefined); load(); }}
        />
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
