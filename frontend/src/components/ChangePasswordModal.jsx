import { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { changePassword } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ChangePasswordModal({ forced = false, onClose }) {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await changePassword(form);
      toast.success('Password changed successfully!');
      setUser((u) => ({ ...u, must_change_password: 0 }));
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error changing password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="card max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-5">
          <ShieldAlert className="text-gold-500" size={22} />
          <h2 className="text-xl font-semibold">
            {forced ? 'Change Default Password' : 'Change Password'}
          </h2>
          {!forced && (
            <button onClick={onClose} className="ml-auto text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        {forced && (
          <div className="bg-gold-900/20 border border-gold-700/40 rounded-xl px-4 py-3 text-sm text-gold-300 mb-5">
            For security, please change the default tutor password before continuing.
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Current Password</label>
            <input
              type="password"
              name="current_password"
              value={form.current_password}
              onChange={handle}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              name="new_password"
              value={form.new_password}
              onChange={handle}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirm_password"
              value={form.confirm_password}
              onChange={handle}
              required
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full mt-2">
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
