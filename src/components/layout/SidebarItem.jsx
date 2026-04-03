// src/components/layout/SidebarItem.jsx
import React from 'react';

const SidebarItem = ({ id, label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-900/30 font-semibold'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white font-medium'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`text-xl transition-transform duration-300 ${
            isActive ? 'scale-110 drop-shadow-md' : 'group-hover:scale-110'
          }`}
        >
          {icon}
        </span>
        <span className="text-sm tracking-wide">{label}</span>
      </div>
    </button>
  );
};

export default SidebarItem;