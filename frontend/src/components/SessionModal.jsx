import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createSession, updateSession } from '../services/api';

const EMPTY = { title: '', description: '', date: '', time: '', google_meet_link: '' };

export default function SessionModal({ session, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const isEdit = !!session;

  useEffect(() => {
    if (session) {
      setForm({
        title: session.title,
        description: session.description || '',
        date: session.date,
        time: session.time,
        google_meet_link: session.google_meet_link,
      });
    }
  }, [session]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateSession(session.id, form);
        toast.success('Session updated!');
      } else {
        await createSession(form);
        toast.success('New Live Session Added');
      }
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error saving session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="card w-full max-w-lg p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{isEdit ? 'Edit Session' : 'Create New Session'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Session Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handle}
              required
              placeholder="e.g. Opening Principles – Beginner"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handle}
              rows={3}
              placeholder="What will students learn in this session?"
              className="input-field resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handle}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Time *</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handle}
                required
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Google Meet Link *</label>
            <input
              name="google_meet_link"
              value={form.google_meet_link}
              onChange={handle}
              required
              placeholder="https://meet.google.com/..."
              className="input-field"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-gold flex-1">
              {loading ? 'Saving...' : isEdit ? 'Update Session' : 'Publish Session'}
            </button>
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
