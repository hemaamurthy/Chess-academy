import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="card max-w-sm w-full p-6 animate-slide-up text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-900/30 border border-red-700/30 flex items-center justify-center">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-colors"
          >
            Delete
          </button>
          <button onClick={onCancel} className="flex-1 btn-outline py-2.5">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
