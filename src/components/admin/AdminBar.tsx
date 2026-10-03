import React from 'react';
import { ShieldCheck, PlusCircle, LogOut } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminBarProps {
  onOpenAddModal: () => void;
  onRefreshListings?: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onOpenAddModal }) => {
  const { isAdminLoggedIn, logout } = useAdminAuth();

  if (!isAdminLoggedIn) return null;

  return (
    <div className="bg-slate-950 text-white border-b border-rose-900/40 px-4 py-2 text-xs font-medium sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <ShieldCheck size={16} className="text-rose-400" />
          <span className="font-bold text-slate-100">
            ADMIN MODE ACTIVE: <code className="text-rose-400 font-mono">project-001</code>
          </span>
          <span className="text-slate-400 hidden sm:inline">• Full Edit & Manage Permissions Granted</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle size={14} />
            <span>Add New Profile</span>
          </button>

          <button
            onClick={logout}
            className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};
