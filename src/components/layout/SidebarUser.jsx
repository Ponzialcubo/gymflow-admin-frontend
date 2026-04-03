// src/components/layout/SidebarUser.jsx
import React from 'react';

const SidebarUser = ({ user, onLogout }) => {
  return (
    <div className="p-4 bg-slate-950/50 border-t border-slate-800/80 space-y-2">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 hover:bg-slate-800 transition-colors rounded-xl border border-slate-700/50 cursor-default">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-black text-sm text-white shadow-inner uppercase">
          {user?.nombre?.substring(0, 2) || 'AD'}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold text-white truncate">
            {user?.nombre || 'Instructor Admin'}
          </p>
          <p className="text-xs font-semibold text-slate-400 truncate uppercase tracking-wider mt-0.5">
            {user?.rol || 'Staff'}
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all font-bold text-xs uppercase tracking-widest group cursor-pointer border border-transparent hover:border-red-500/20"
      >
        <span className="group-hover:-translate-x-1 transition-transform text-base">🚪</span>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default SidebarUser;