import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Hash, Shield } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function Profile() {
  const { user } = useAuth();
  const [showPwChange, setShowPwChange] = useState(false);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const fields = [
    { icon: User, label: 'Full Name', value: user.full_name },
    { icon: Mail, label: 'Email Address', value: user.email },
    { icon: Hash, label: 'Age', value: `${user.age} years old` },
    { icon: Calendar, label: 'Member Since', value: formatDate(user.created_at) },
    { icon: Shield, label: 'Role', value: 'Student', badge: true },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <p className="text-gold-500 text-sm font-medium mb-1">Account</p>
        <h1 className="text-3xl font-display font-bold">Your Profile</h1>
      </div>

      {/* Avatar */}
      <div className="card p-8 mb-5 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gold-600/20 border border-gold-700/40 flex items-center justify-center mx-auto mb-4 text-3xl">
          ♔
        </div>
        <h2 className="text-xl font-bold">{user.full_name}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      {/* Info Fields */}
      <div className="card divide-y divide-gray-800 mb-5">
        {fields.map(({ icon: Icon, label, value, badge }) => (
          <div key={label} className="flex items-center gap-4 px-6 py-4">
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-gold-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{label}</p>
              {badge ? (
                <span className="text-xs bg-gold-600/20 border border-gold-700/40 text-gold-400 px-2 py-0.5 rounded-full">
                  {value}
                </span>
              ) : (
                <p className="text-sm font-medium text-white">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowPwChange(true)}
        className="btn-outline w-full"
      >
        Change Password
      </button>

      {showPwChange && <ChangePasswordModal onClose={() => setShowPwChange(false)} />}
    </div>
  );
}
