import React, { useState } from 'react';
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
  // Estado para controlar si el menú está abierto en móviles
  const [isOpen, setIsOpen] = useState(false);

  // Función para manejar el clic en un elemento del menú
  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsOpen(false); // Cierra el menú automáticamente en móviles al seleccionar una opción
  };

  return (
    <>
      {/* BOTÓN HAMBURGUESA (Solo visible en móviles/tablets) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-slate-800 transition-colors"
      >
        {isOpen ? (
          <span className="text-xl font-black">✕</span> // Icono de cerrar
        ) : (
          <span className="text-xl font-black">☰</span> // Icono de hamburguesa
        )}
      </button>

      {/* OVERLAY OSCURO (Solo visible en móviles cuando el menú está abierto) */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR PRINCIPAL */}
      {/* Usamos transform y translate-x para esconderlo en móvil y mostrarlo en desktop (lg) */}
      <aside 
        className={`w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 border-r border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        
        {/* LOGO SECCIÓN */}
        <div className="p-6 border-b border-slate-800/80 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tighter drop-shadow-sm">
              GymFlow
            </h2>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                Online
              </span>
            </div>
          </div>
        </div>
        
        {/* NAVEGACIÓN AGRUPADA */}
        <nav className="flex-1 px-4 space-y-6 overflow-y-auto custom-scrollbar pb-6">
          {MENU_GROUPS.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                {group.title}
              </p>
              {group.items.map((item) => (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  isActive={activeTab === item.id}
                  onClick={handleTabClick} // Usamos la nueva función
                />
              ))}
            </div>
          ))}
        </nav>

        {/* SECCIÓN INFERIOR */}
        <SidebarUser user={user} onLogout={logout} />
        
      </aside>
    </>
  );
};

export default Sidebar;