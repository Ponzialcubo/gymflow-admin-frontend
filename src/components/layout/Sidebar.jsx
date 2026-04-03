// src/components/layout/Sidebar.jsx
import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarUser from './SidebarUser';

const MENU_GROUPS = [
  {
    title: 'Panel Principal',
    items: [
      { id: 'dashboard', label: 'Inicio', icon: '🏠' },
      { id: 'clients', label: 'Socios', icon: '👥' },
    ]
  },
  {
    title: 'Gestión Deportiva',
    items: [
      { id: 'training', label: 'Entrenamientos', icon: '🏋️‍♂️' },
      { id: 'nutrition', label: 'Nutrición', icon: '🍎' },
      { id: 'exercises', label: 'Catálogo Ejercicios', icon: '📖' },
    ]
  },
  {
    title: 'Administración',
    items: [
      { id: 'payments', label: 'Suscripciones', icon: '💳' },
      { id: 'finances', label: 'Caja y Finanzas', icon: '📊' },
      { id: 'settings', label: 'Configuración', icon: '⚙️' },
    ]
  }
];

const Sidebar = ({ activeTab, setActiveTab, logout, user }) => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800 shadow-2xl z-50">
      
      {/* LOGO SECCIÓN */}
      <div className="p-6 border-b border-slate-800/80 mb-6">
        <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tighter drop-shadow-sm">
          GymFlow Pro
        </h2>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
            Servidor Online
          </span>
        </div>
      </div>
      
      {/* NAVEGACIÓN AGRUPADA */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar">
        {MENU_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              {group.title}
            </p>
            {group.items.map((item) => (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                isActive={activeTab === item.id}
                onClick={setActiveTab}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* SECCIÓN INFERIOR */}
      <SidebarUser user={user} onLogout={logout} />
      
    </aside>
  );
};

export default Sidebar;